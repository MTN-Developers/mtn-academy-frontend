// app/components/course/Playlist.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Video } from "lucide-react";
import { useCoursePlaylist } from "@/app/hooks/useCoursePlaylist";
import { useParams } from "next/navigation";
import { getLangDir } from "rtl-detect";
import { PlaylistSkeleton } from "../../common/PlaylistSkeleton";

export const Playlist = () => {
  const { slug } = useParams();
  const { data, isLoading } = useCoursePlaylist(slug as string);
  const pathArr = window.location.pathname.split("/");
  const locale = pathArr[1];
  const direction = getLangDir(locale);
  const isRTL = direction === "rtl";

  console.log("slug is ", slug);

  if (isLoading) {
    return <PlaylistSkeleton/>;
  }

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      {data?.data.map((playlist) => (
        <div key={playlist.id} className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {playlist.chapters.map((chapter) => (
              <AccordionItem key={chapter.id} value={chapter.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Video className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">
                        {isRTL ? chapter.title_ar : chapter.title_en}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {chapter.videos.length} videos
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-12">
                    {chapter.videos.map((video) => (
                      <div
                        key={video.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Video className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {isRTL ? video.title_ar : video.title_en}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatDuration(video.duration)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};
