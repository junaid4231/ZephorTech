export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-white/10" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Tags Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-white/10 rounded-full" />
          <div className="h-6 w-16 bg-white/10 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-white/10 rounded w-5/6" />
          <div className="h-6 bg-white/10 rounded w-4/6" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-3/4" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <div className="h-10 w-10 bg-white/10 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-white/10 rounded w-1/3" />
            <div className="h-3 bg-white/10 rounded w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

