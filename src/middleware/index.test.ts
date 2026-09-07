import { describe, it, expect, beforeAll } from 'vitest';
import { createSeoMiddleware, HEAD_MARKER, BODY_MARKER } from './index';
import type { PagesContext } from './index';

const ORIGIN = 'https://example.com';

const SHELL = `<!doctype html><html lang="en"><head><title>Shell</title></head><body><div id="root"></div></body></html>`;

const THIN_FALLBACK = (route: string) =>
  `<!doctype html><html lang="en"><head><title>Thin</title><link rel="canonical" href="${ORIGIN}${route}" /></head><body><div id="root"></div></body></html>`;

const SNAPSHOT = `${HEAD_MARKER}\n<title>Snap</title>\n${BODY_MARKER}\n<main>rendered</main>`;

// Minimal HTMLRewriter stub: the real one only exists in the workers runtime.
// transform() just passes the response through — injection correctness is
// covered by wrangler-based end-to-end testing in the consuming apps.
beforeAll(() => {
  class FakeRewriter {
    on() {
      return this;
    }
    transform(response: Response) {
      return response;
    }
  }
  (globalThis as Record<string, unknown>).HTMLRewriter = FakeRewriter;
});

/**
 * files: exact pathname -> body. Missing files return the SPA shell as a 200
 * (Cloudflare Pages not-found fallback). `redirects`: pathname prefix -> target
 * prefix, silently followed (as ASSETS.fetch does with `_redirects` rules).
 */
function makeContext(
  path: string,
  {
    files = {},
    redirects = {},
    method = 'GET',
    nextContentType = 'text/html',
    origin = ORIGIN,
  }: {
    files?: Record<string, string>;
    redirects?: Record<string, string>;
    method?: string;
    /** content-type `next()` answers with — a real asset is not text/html. */
    nextContentType?: string;
    /** Host the request arrives on (Pages also serves *.pages.dev). */
    origin?: string;
  } = {}
): PagesContext & { nextCalls: string[] } {
  const resolve = (pathname: string): string => {
    for (const [from, to] of Object.entries(redirects)) {
      if (pathname.startsWith(from)) return to + pathname.slice(from.length);
    }
    return pathname;
  };
  const assetsFetch = async (req: Request): Promise<Response> => {
    const pathname = resolve(new URL(req.url).pathname);
    const body = files[pathname] ?? SHELL;
    return new Response(body, {
      status: 200,
      headers: { 'content-type': 'text/html' },
    });
  };
  const nextCalls: string[] = [];
  return {
    request: new Request(`${origin}${path}`, { method }),
    env: { ASSETS: { fetch: assetsFetch } },
    next: async () => {
      nextCalls.push(path);
      return new Response(SHELL, {
        status: 200,
        headers: { 'content-type': nextContentType },
      });
    },
    nextCalls,
  };
}

describe('createSeoMiddleware', () => {
  it('301-strips trailing slashes on document routes', async () => {
    const onRequest = createSeoMiddleware();
    const res = await onRequest(makeContext('/en/techniques/x-wing/'));
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe(`${ORIGIN}/en/techniques/x-wing`);
  });

  it('injects a snapshot when one exists', async () => {
    const onRequest = createSeoMiddleware();
    const ctx = makeContext('/en/play', {
      files: { '/html/en/play/index.html': SNAPSHOT, '/index.html': SHELL },
    });
    const res = await onRequest(ctx);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    expect(ctx.nextCalls).toHaveLength(0);
  });

  it('serves a genuine thin fallback whose canonical matches the route', async () => {
    const onRequest = createSeoMiddleware();
    const ctx = makeContext('/en/login', {
      files: { '/en/login/index.html': THIN_FALLBACK('/en/login') },
    });
    const res = await onRequest(ctx);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('canonical');
    expect(ctx.nextCalls).toHaveLength(0);
  });

  it('rejects a followed-redirect fallback (canonical mismatch) and passes through', async () => {
    // /ar/* is 308-mapped to /en/* by _redirects; ASSETS.fetch follows it
    // silently, handing back the English page. The middleware must NOT serve
    // that as /ar content — pass through so the static layer emits the 308.
    const onRequest = createSeoMiddleware();
    const ctx = makeContext('/ar/login', {
      files: { '/en/login/index.html': THIN_FALLBACK('/en/login') },
      redirects: { '/ar/': '/en/' },
    });
    const res = await onRequest(ctx);
    expect(ctx.nextCalls).toHaveLength(1);
    expect(res.headers.get('x-robots-tag')).toBe('noindex');
  });

  it('noindexes the bare shell served for app-only routes', async () => {
    const onRequest = createSeoMiddleware();
    const ctx = makeContext('/en/play/8');
    const res = await onRequest(ctx);
    expect(res.status).toBe(200);
    expect(res.headers.get('x-robots-tag')).toBe('noindex');
    expect(ctx.nextCalls).toHaveLength(1);
  });

  it('does not noindex genuine fallbacks or snapshots', async () => {
    const onRequest = createSeoMiddleware();
    const withFallback = await onRequest(
      makeContext('/en/login', {
        files: { '/en/login/index.html': THIN_FALLBACK('/en/login') },
      })
    );
    expect(withFallback.headers.get('x-robots-tag')).toBeNull();
    const withSnapshot = await onRequest(
      makeContext('/en', {
        files: { '/html/en/index.html': SNAPSHOT, '/index.html': SHELL },
      })
    );
    expect(withSnapshot.headers.get('x-robots-tag')).toBeNull();
  });

  it('lets the rewrite hook 301 legacy paths', async () => {
    const onRequest = createSeoMiddleware({
      rewrite: ({ url, redirect }) => {
        const m = url.pathname.match(/^\/([a-z]{2}(?:-[a-z]+)?)\/daily$/);
        if (m) return redirect(`/${m[1]}/play/daily`);
        return null;
      },
    });
    const res = await onRequest(makeContext('/ja/daily'));
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe(`${ORIGIN}/ja/play/daily`);
  });

  it('exposes snapshotExists to the rewrite hook', async () => {
    const seen: boolean[] = [];
    const onRequest = createSeoMiddleware({
      rewrite: async ({ snapshotExists }) => {
        seen.push(await snapshotExists('/en/tutorials'));
        seen.push(await snapshotExists('/en/nope'));
        return null;
      },
    });
    await onRequest(
      makeContext('/tutorials', {
        files: { '/html/en/tutorials/index.html': SNAPSHOT },
      })
    );
    expect(seen).toEqual([true, false]);
  });

  it('answers HEAD like GET for snapshot routes', async () => {
    const onRequest = createSeoMiddleware();
    const res = await onRequest(
      makeContext('/en/play', {
        files: { '/html/en/play/index.html': SNAPSHOT, '/index.html': SHELL },
        method: 'HEAD',
      })
    );
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });

  it('404s a missing asset instead of serving the shell as a soft 404', async () => {
    // A nonexistent dotted path falls through the SPA `_redirects` rule and
    // Cloudflare answers with the 200 HTML shell. Serving that made every
    // made-up path an indexable near-duplicate over an unbounded URL space.
    const onRequest = createSeoMiddleware();
    const res = await onRequest(makeContext('/nope.png'));
    expect(res.status).toBe(404);
    expect(res.headers.get('x-robots-tag')).toBe('noindex');
  });

  it('404s spam-linked .html paths rather than returning the shell', async () => {
    const onRequest = createSeoMiddleware();
    const res = await onRequest(makeContext('/wap/html/list-recruitment.html'));
    expect(res.status).toBe(404);
  });

  it('serves a dotted path an app claims as a real document route', async () => {
    // Some routes legitimately carry a dot in a path param — mail_box renders
    // /:lang/points/:emailAccount, where the account is an ENS name
    // (vitalik.eth) or an email address. Those must not be swept up by the
    // missing-asset 404, so an app can claim them via `allowDottedPath`.
    const onRequest = createSeoMiddleware({
      allowDottedPath: url => /^\/[a-z-]+\/points\//.test(url.pathname),
    });
    const res = await onRequest(
      makeContext('/en/points/vitalik.eth', {
        files: { '/index.html': SHELL },
      })
    );
    expect(res.status).toBe(200);
  });

  it('still 404s a dotted path the app does not claim', async () => {
    const onRequest = createSeoMiddleware({
      allowDottedPath: url => /^\/[a-z-]+\/points\//.test(url.pathname),
    });
    const res = await onRequest(makeContext('/en/mailto:info@sudobility.com'));
    expect(res.status).toBe(404);
    expect(res.headers.get('x-robots-tag')).toBe('noindex');
  });

  it('noindexes pages served from the *.pages.dev host', async () => {
    // Cloudflare serves every Pages project on <project>.pages.dev (and a
    // subdomain per preview deploy) alongside the custom domain. Those hosts
    // answered 200 with the full site and only a canonical tag — a hint, not a
    // directive — so the whole site was crawlable twice over.
    const onRequest = createSeoMiddleware();
    const ctx = makeContext('/en', {
      files: { '/html/en/index.html': SNAPSHOT, '/index.html': SHELL },
      origin: 'https://sudojo-app.pages.dev',
    });
    const res = await onRequest(ctx);
    expect(res.status).toBe(200);
    expect(res.headers.get('x-robots-tag')).toBe('noindex');
  });

  it('leaves the canonical host indexable', async () => {
    const onRequest = createSeoMiddleware();
    const res = await onRequest(
      makeContext('/en', {
        files: { '/html/en/index.html': SNAPSHOT, '/index.html': SHELL },
      })
    );
    expect(res.headers.get('x-robots-tag')).toBeNull();
  });

  it('ignores asset requests and non-GET/HEAD methods', async () => {
    const onRequest = createSeoMiddleware();
    const asset = await onRequest(
      makeContext('/assets/index-abc123.js', {
        nextContentType: 'application/javascript',
      })
    );
    expect(asset.status).toBe(200);
    expect(asset.headers.get('x-robots-tag')).toBeNull();
    const post = makeContext('/en/play', { method: 'POST' });
    await onRequest(post);
    expect(post.nextCalls).toHaveLength(1);
  });
});
