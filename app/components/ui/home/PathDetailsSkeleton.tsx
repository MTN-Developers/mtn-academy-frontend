// components/skeletons/PathDetailsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const PathDetailsSkeleton = () => {
  return (
    <div className="overflow-x-hidden bg-[#f2f2f2]">
      {/* Breadcrumb Skeleton */}
      <div className="p-4 lg:px-[130px] bg-[#f2f2f2] w-full shadow-lg">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-4 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            {/* Video Placeholder */}
            <Skeleton className="w-full aspect-video rounded-lg mb-8" />

            {/* Tabs */}
            <div className="w-full">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-24" />
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                <div className="mt-8">
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-2 mb-4">
                      <Skeleton className="h-4 w-4 mt-1" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Courses Section */}
            <div className="my-10">
              <Skeleton className="h-10 w-1/2 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-lg">
                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 md:p-6 rounded-lg my-4">
              <div className="mb-4">
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>

              <Skeleton className="h-12 w-full mb-4" />

              <div className="flex gap-2 mb-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
