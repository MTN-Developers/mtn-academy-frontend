import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SemesterCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  );
};
