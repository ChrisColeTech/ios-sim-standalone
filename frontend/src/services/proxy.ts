const PROXY_URL = 'http://localhost:32199/proxy';

type ProxyOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

/**
 * Routes a fetch request through the Go proxy server to avoid CORS issues.
 * Drop-in replacement for fetch() when calling external APIs.
 *
 * The Go proxy accepts a JSON body with { method, url, headers, body }
 * and streams the upstream response directly (status, headers, body).
 */
export async function proxyFetch(url: string, options?: ProxyOptions): Promise<Response> {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: options?.method ?? 'GET',
      url,
      headers: options?.headers ?? {},
      body: options?.body ?? '',
    }),
  });

  // The Go proxy streams the upstream response directly —
  // status code, headers, and body are all forwarded as-is.
  return res;
}
