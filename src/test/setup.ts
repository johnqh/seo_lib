import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { ReactNode } from 'react';

// Mock react-helmet-async
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: ReactNode }) => children,
  HelmetProvider: ({ children }: { children: ReactNode }) => children,
}));

// Mock window.location for SSR tests
const mockLocation = {
  pathname: '/test-page',
  href: 'https://example.com/test-page',
  origin: 'https://example.com',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});
