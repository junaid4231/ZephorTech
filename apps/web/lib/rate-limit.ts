/**
 * In-memory rate limiter.
 *
 * ⚠️  SERVERLESS WARNING: This Map is stored in module memory. On stateless/serverless
 * platforms (Vercel, Railway, AWS Lambda) each function instance has its own isolated
 * memory and the store resets on cold-starts. Requests routed to different instances
 * bypass this limiter entirely.
 *
 * For production-grade rate limiting replace this with a Redis-backed solution,
 * e.g. Upstash Redis with the @upstash/ratelimit SDK:
 *   https://github.com/upstash/ratelimit
 */
const bucketStore = new Map<string, number[]>();

type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  bucket?: string;
};

export function isRateLimited(
  identifier: string,
  { limit = 5, windowMs = 60_000, bucket = "default" }: RateLimitOptions = {}
) {
  const key = `${bucket}:${identifier}`;
  const now = Date.now();
  const timestamps = bucketStore.get(key) ?? [];
  const recent = timestamps.filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    bucketStore.set(key, recent);
    return true;
  }

  recent.push(now);
  bucketStore.set(key, recent);
  return false;
}
