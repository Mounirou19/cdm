export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <LoadingSkeleton className="h-4 w-24" />
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-6 w-32" />
        <LoadingSkeleton className="h-8 w-16" />
        <LoadingSkeleton className="h-6 w-32" />
      </div>
      <LoadingSkeleton className="h-3 w-40 mx-auto" />
    </div>
  );
}

export function GroupCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <LoadingSkeleton className="h-6 w-24" />
      {[1, 2, 3, 4].map((i) => (
        <LoadingSkeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  );
}
