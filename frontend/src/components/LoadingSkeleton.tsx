export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="h-40 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
      ))}
    </div>
  );
}

export function AyahSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 w-32 bg-neutral-100 dark:bg-neutral-800 rounded ml-auto" />
          <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
          <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded" />
        </div>
      ))}
    </div>
  );
}
