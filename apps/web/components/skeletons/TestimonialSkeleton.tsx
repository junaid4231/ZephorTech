export function TestimonialSkeleton() {
  return (
    <div className="p-8 rounded-3xl backdrop-blur-sm border border-white/10 bg-white/5 animate-pulse">
      {/* Quote Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
      </div>

      {/* Rating Skeleton */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-5 w-5 bg-white/10 rounded" />
        ))}
      </div>

      {/* Author Info Skeleton */}
      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
        <div className="h-12 w-12 bg-white/10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="h-3 bg-white/10 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

