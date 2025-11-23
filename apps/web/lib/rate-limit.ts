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


