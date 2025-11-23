export function ServiceCardSkeleton() {
  return (
    <div className="group p-8 rounded-3xl backdrop-blur-sm border border-white/10 bg-white/5 animate-pulse">
      {/* Icon Skeleton */}
      <div className="h-16 w-16 bg-white/10 rounded-2xl mb-6" />

      {/* Title Skeleton */}
      <div className="h-7 bg-white/10 rounded w-3/4 mb-4" />

      {/* Description Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
      </div>

      {/* Features Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="h-5 w-5 bg-white/10 rounded-full mt-0.5" />
            <div className="h-4 bg-white/10 rounded flex-1" />
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="mt-6 h-12 bg-white/10 rounded-xl w-full" />
    </div>
  );
}

