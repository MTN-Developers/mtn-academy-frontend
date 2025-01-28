import { Skeleton } from "@/components/ui/skeleton";

// components/ui/home/DiplomaCardSkeleton.tsx
export function DiplomaCardSkeleton() {
  return (
    <div className="p-6 h-full flex flex-col bg-white rounded-lg shadow-sm">
      <div className="flex justify-center mb-6 flex-shrink-0">
        <Skeleton className="w-[120px] h-[120px] rounded-full" />
      </div>

      <Skeleton className="h-6 w-3/4 mx-auto mb-6" />

      <div className="space-y-3 flex-grow">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-2">
            <Skeleton className="h-4 w-4 mt-1" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 flex-shrink-0">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
