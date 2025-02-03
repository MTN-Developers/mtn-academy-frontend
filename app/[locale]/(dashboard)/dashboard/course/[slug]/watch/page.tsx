// app/[locale]/course/[slug]/watch/page.tsx
"use client";

import { Playlist } from "@/app/components/ui/course/Playlist";
import { VideoPlayer } from "@/app/components/ui/course/VideoPlayer";

// Dummy data for testing
const dummyVideo = {
  id: "1",
  title: "Introduction to the Course",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with your video URL
};

export default function WatchPage() {
  return (
    <div className="min-h-screen lg:px-20 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* Video Player Section */}
        <div className="lg:col-span-2">
          <VideoPlayer
            url={dummyVideo.url}
            courseId="dummy-course"
            videoId={dummyVideo.id}
          />
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{dummyVideo.title}</h1>
          </div>
        </div>

        {/* Playlist Section */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-sm">
            <Playlist />
          </div>
        </div>
      </div>
    </div>
  );
}
