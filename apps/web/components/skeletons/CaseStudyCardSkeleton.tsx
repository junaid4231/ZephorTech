export function CaseStudyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 bg-white/5 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-white/10" />

      {/* Content */}
      <div className="p-8 space-y-4">
        {/* Tags Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-white/10 rounded-full" />
          <div className="h-6 w-20 bg-white/10 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-7 bg-white/10 rounded w-5/6" />
          <div className="h-7 bg-white/10 rounded w-4/6" />
        </div>

        {/* Client Skeleton */}
        <div className="h-4 bg-white/10 rounded w-1/3" />

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-3/4" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-8 bg-white/10 rounded w-full" />
              <div className="h-3 bg-white/10 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

