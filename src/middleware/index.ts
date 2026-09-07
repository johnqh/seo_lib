/**
 * Shared SEO injection middleware for Cloudflare Pages (worker-safe, no React).
 *
 * Every Sudobility web app ships a `functions/_middleware.js` that used to be a
 * forked copy of the same template. Each app now does:
 *
 *   import { createSeoMiddleware } from '@sudobility/seo_lib/middleware';
 *   export const onRequest = createSeoMiddleware();
 *
 * For document navigations the middleware looks up a committed, pre-rendered
 * content snapshot at `/html/<route>/index.html` (produced by the app's
 * prerender script) and injects it into the LIVE `index.html` shell — so the
 * served page combines:
 *   - the current, hashed JS/CSS bundle (from the freshly-built shell), and
 *   - the React-rendered head + body (from the committed snapshot).
 *
 * This decouples the committed snapshots from build-specific asset hashes: the
 * snapshots never reference the bundle, so they never go stale.
 *
 * Snapshot file format (see each app's scripts/prerender.mjs):
 *   <!--PRERENDER-HEAD-->\n <route head tags> \n<!--PRERENDER-BODY-->\n <#root inner html>
 *
 * App-specific URL normalization (legacy-path 301s, language aliasing, route
 * allowlists) plugs in through the `rewrite` option instead of forking the file.
 */

// Cloudflare Workers runtime globals (not in DOM lib types).
interface RewriterElement {
  remove(): void;
  setAttribute(name: string, value: string): void;
  append(content: string, options?: { html?: boolean }): void;
  setInnerContent(content: string, options?: { html?: boolean }): void;
}
interface HTMLRewriterInstance {
  on(
    selector: string,
    handlers: { element(element: RewriterElement): void }
  ): HTMLRewriterInstance;
  transform(response: Response): Response;
}
declare const HTMLRewriter: new () => HTMLRewriterInstance;

export interface PagesEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export interface PagesContext {
  request: Request;
  env: PagesEnv;
  next(): Promise<Response>;
}

export interface RewriteContext {
  /** Parsed request URL (pathname is already trailing-slash canonicalized). */
  url: URL;
  request: Request;
  env: PagesEnv;
  /** Fall through to normal static serving (e.g. to let a `_redirects` rule answer). */
  next(): Promise<Response>;
  /** Permanent redirect to another pathname on the same origin. */
  redirect(pathname: string, status?: number): Response;
  /** True when a committed prerender snapshot exists for the given pathname. */
  snapshotExists(pathname: string): Promise<boolean>;
}

export interface SeoMiddlewareOptions {
  /**
   * App-specific URL normalization, run after trailing-slash canonicalization
   * and before snapshot lookup. Return a Response (usually via `redirect` or
   * `next`) to short-circuit, or null/undefined to continue with the shared
   * snapshot/fallback handling.
   */
  rewrite?(
    context: RewriteContext
  ): Response | null | undefined | Promise<Response | null | undefined>;
}

export const HEAD_MARKER = '<!--PRERENDER-HEAD-->';
export const BODY_MARKER = '<!--PRERENDER-BODY-->';

export function snapshotPathFor(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return `/html${clean}/index.html`;
}

/**
 * Body returned for a dotted path that does not resolve to a real asset. Kept
 * deliberately tiny — it exists to carry the 404 status, not to be read.
 */
const NOT_FOUND_BODY =
  '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="robots" content="noindex"><title>404 Not Found</title></head>' +
  '<body><h1>404 Not Found</h1></body></html>';

export function createSeoMiddleware(options: SeoMiddlewareOptions = {}) {
  const handle = async function (context: PagesContext): Promise<Response> {
    const { request, next, env } = context;
    const url = new URL(request.url);

    // Only transform GET/HEAD document navigations. HEAD must take the same
    // path as GET: letting it fall through to static serving made HEAD /en 308
    // to /en/ while GET /en/ 301s to /en — opposite canonicalization signals
    // for crawlers.
    if (request.method !== 'GET' && request.method !== 'HEAD') return next();

    // Anything with a file extension is a real asset (js/css/png/json/xml/...)
    // — let Cloudflare serve it directly. But a MISSING asset does not 404: it
    // falls through the SPA `/* /index.html 200` rule and comes back as the
    // HTML shell, so every made-up dotted path answered 200 with the generic
    // shell title and no noindex. That turned an unbounded URL space into
    // indexable near-duplicates — spam-linked paths (/wap/html/list-*.html,
    // /html/list-*.html) got crawled and piled into "Crawled - currently not
    // indexed", alongside every stale asset URL. No route in these apps is
    // served at a dotted path, so an HTML answer here always means the SPA
    // fallback fired for something that does not exist: send a real 404.
    const lastSegment = url.pathname.split('/').pop() ?? '';
    if (lastSegment.includes('.')) {
      const assetResp = await next();
      const assetType = assetResp.headers.get('content-type') ?? '';
      if (assetResp.status === 200 && assetType.includes('text/html')) {
        return new Response(NOT_FOUND_BODY, {
          status: 404,
          headers: {
            'content-type': 'text/html; charset=utf-8',
            'x-robots-tag': 'noindex',
          },
        });
      }
      return assetResp;
    }

    // Canonicalize every document route to have NO trailing slash (source of
    // truth), matching the canonical link, hreflang alternates, and sitemap.
    // Both forms otherwise return 200, so Googlebot saw two URLs per page whose
    // declared canonical disagreed with the crawled URL. Strip a trailing slash
    // and 301 to the slash-free form; the root "/" is left alone (handled by
    // _redirects). Assets and non-GET were already excluded above.
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = url.pathname.replace(/\/+$/, '');
      return Response.redirect(redirectUrl.toString(), 301);
    }

    const redirect = (pathname: string, status = 301): Response => {
      const target = new URL(request.url);
      target.pathname = pathname;
      return Response.redirect(target.toString(), status);
    };

    const snapshotExists = async (pathname: string): Promise<boolean> => {
      const probeUrl = new URL(request.url);
      probeUrl.pathname = snapshotPathFor(pathname);
      const probe = await env.ASSETS.fetch(
        new Request(probeUrl, { method: 'GET' })
      );
      if (!probe.ok) return false;
      return (await probe.text()).includes(HEAD_MARKER);
    };

    // App-specific URL normalization (legacy paths, language aliases, route
    // allowlists) — server-side 301s so crawlers get real redirects instead of
    // the 200 shell the SPA would clean up client-side.
    if (options.rewrite) {
      const rewritten = await options.rewrite({
        url,
        request,
        env,
        next,
        redirect,
        snapshotExists,
      });
      if (rewritten) return rewritten;
    }

    // Language for the <html lang> attribute (e.g. /de/techniques/x-wing -> "de").
    const langMatch = url.pathname.match(/^\/([a-z]{2}(?:-[a-z]+)?)(?:\/|$)/);
    const lang = langMatch ? langMatch[1] : 'en';

    // On a full miss (no snapshot, no genuine thin fallback), pass through to
    // normal static serving so `_redirects` rules (e.g. /ar/* 308) get to
    // answer the original request. When that still yields a 200 HTML document
    // it is the bare SPA shell (empty #root) for an app-only route — every
    // sitemap route has a snapshot — so mark it noindex to keep it out of
    // crawl reports.
    const passthrough = async (): Promise<Response> => {
      const resp = await next();
      const type = resp.headers.get('content-type') ?? '';
      if (resp.status !== 200 || !type.includes('text/html')) return resp;
      const tagged = new Response(resp.body, resp);
      tagged.headers.set('X-Robots-Tag', 'noindex');
      return tagged;
    };

    // Serve a document response for this route without falling through to
    // static directory handling: routes that have a thin fallback directory
    // (dist/<route>/index.html) but NO snapshot used to loop forever — the
    // asset layer 308s /en/login -> /en/login/ and the canonicalization above
    // 301s it right back.
    //
    // ASSETS.fetch resolves `_redirects` rules and the SPA not-found fallback
    // internally, so it can hand back a silently-followed redirect target
    // (e.g. /ar/* used to serve the English page as a 200) or the bare shell
    // for a missing file. Only a GENUINE per-route fallback may be served
    // here, and every generated thin fallback declares its own route as the
    // canonical URL — the shell declares none — so require the canonical to
    // match this route.
    const serveFallback = async (): Promise<Response> => {
      const fileUrl = new URL(request.url);
      fileUrl.pathname = `${url.pathname}/index.html`.replace(/\/+/g, '/');
      const fileResp = await env.ASSETS.fetch(
        new Request(fileUrl, { method: 'GET' })
      );
      if (!fileResp.ok) return passthrough();
      const fileText = await fileResp.text();
      const canonicalMatch =
        fileText.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) ||
        fileText.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
      let canonicalPath: string | null = null;
      if (canonicalMatch) {
        try {
          canonicalPath = new URL(canonicalMatch[1], url).pathname.replace(
            /\/+$/,
            ''
          );
        } catch {
          canonicalPath = null;
        }
      }
      if (canonicalPath !== url.pathname.replace(/\/+$/, ''))
        return passthrough();
      if (request.method === 'HEAD') {
        return new Response(null, {
          status: fileResp.status,
          headers: fileResp.headers,
        });
      }
      return new Response(fileText, {
        status: fileResp.status,
        headers: fileResp.headers,
      });
    };

    // Look up the committed snapshot for this route.
    const snapshotUrl = new URL(request.url);
    snapshotUrl.pathname = snapshotPathFor(url.pathname);
    const snapshotResp = await env.ASSETS.fetch(
      new Request(snapshotUrl, { method: 'GET' })
    );
    if (!snapshotResp.ok) return serveFallback();

    const snapshot = await snapshotResp.text();
    // ASSETS.fetch returns the SPA fallback (200) for missing files; the marker
    // check ensures we only inject genuine snapshots.
    const bodyIdx = snapshot.indexOf(BODY_MARKER);
    if (snapshot.indexOf(HEAD_MARKER) === -1 || bodyIdx === -1)
      return serveFallback();

    const head = snapshot.slice(HEAD_MARKER.length, bodyIdx).trim();
    const body = snapshot.slice(bodyIdx + BODY_MARKER.length).trim();

    // Fetch the live shell (built index.html, current hashed bundle).
    const shellUrl = new URL(request.url);
    shellUrl.pathname = '/index.html';
    const shellResp = await env.ASSETS.fetch(
      new Request(shellUrl, { method: 'GET' })
    );
    if (!shellResp.ok) return next();

    // HEAD gets the same status/headers as GET, without building the body.
    if (request.method === 'HEAD') {
      return new Response(null, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }

    // Strip the shell's static/default SEO tags, then inject the route-specific
    // head and rendered body. (The shell's Organization JSON-LD is left intact.)
    const remove = { element: (e: RewriterElement) => e.remove() };
    const rewritten = new HTMLRewriter()
      .on('html', {
        element: (e: RewriterElement) => e.setAttribute('lang', lang),
      })
      .on('title', remove)
      .on('meta[name="title"]', remove)
      .on('meta[name="description"]', remove)
      .on('meta[name="keywords"]', remove)
      .on('meta[name="robots"]', remove)
      .on('link[rel="canonical"]', remove)
      .on('link[rel="alternate"][hreflang]', remove)
      .on('meta[property^="og:"]', remove)
      .on('meta[name^="twitter:"]', remove)
      .on('head', {
        element: (e: RewriterElement) =>
          e.append(`\n${head}\n`, { html: true }),
      })
      .on('#root', {
        element: (e: RewriterElement) =>
          e.setInnerContent(body, { html: true }),
      })
      .transform(shellResp);

    return new Response(rewritten.body, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  };

  return async function onRequest(context: PagesContext): Promise<Response> {
    const response = await handle(context);

    // Cloudflare serves every project on <project>.pages.dev — plus a
    // subdomain per preview deploy — alongside the custom domain, so the whole
    // site was reachable and crawlable twice over. The only thing pointing at
    // the real host was the canonical tag, which Google treats as a hint, not
    // a directive. Tag these hosts noindex so the custom domain is the single
    // indexable copy; redirects and assets are left untouched.
    if (!new URL(context.request.url).hostname.endsWith('.pages.dev'))
      return response;
    const type = response.headers.get('content-type') ?? '';
    if (response.status !== 200 || !type.includes('text/html')) return response;
    const tagged = new Response(response.body, response);
    tagged.headers.set('x-robots-tag', 'noindex');
    return tagged;
  };
}
