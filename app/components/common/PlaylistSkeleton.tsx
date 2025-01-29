// app/components/course/PlaylistSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const PlaylistSkeleton = () => {
  // Create an array of 3 items for chapters
  const chapters = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="w-full space-y-4">
      {chapters.map((chapter) => (
        <div key={chapter} className="border rounded-lg">
          {/* Chapter Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-10 w-10 rounded-full" />{" "}
              {/* Icon placeholder */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-[200px]" /> {/* Title placeholder */}
                <Skeleton className="h-4 w-[100px]" />{" "}
                {/* Subtitle placeholder */}
              </div>
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />{" "}
            {/* Chevron placeholder */}
          </div>

          {/* Videos list - show for first chapter only */}
          {chapter === 0 && (
            <div className="px-4 pb-4">
              <div className="pl-12 space-y-4">
                {/* Create 3 video items */}
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Skeleton className="h-4 w-4" />{" "}
                      {/* Video icon placeholder */}
                      <Skeleton className="h-4 flex-1" />{" "}
                      {/* Video title placeholder */}
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />{" "}
                      {/* Clock icon placeholder */}
                      <Skeleton className="h-4 w-[40px]" />{" "}
                      {/* Duration placeholder */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
