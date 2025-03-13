'use client';

import { Video } from '@/app/types/video';
import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '@/app/lib/axios/instance';

export const VideoPlayer = ({
  video,
  url,
  chapterVideoId,
}: {
  video: Video | null;
  url?: string;
  chapterVideoId?: string; // Add this prop to receive the chapter_video_id
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now());
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [hasMarkedAsCompleted, setHasMarkedAsCompleted] = useState(false);

  // console.log('video id is ', video?.id);

  // Show loading indicator when URL changes
  useEffect(() => {
    if (url) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setVideoKey(Date.now()); // Force iframe re-render with a new key
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [url]);

  // Set up the completion timer when the video loads
  useEffect(() => {
    // Reset completion state when video changes
    setHasMarkedAsCompleted(false);

    // Clear any existing timer
    if (completionTimerRef.current) {
      clearTimeout(completionTimerRef.current);
      completionTimerRef.current = null;
    }

    // Only set up the timer if we have a valid chapterVideoId and the video is loaded
    if (chapterVideoId && url && !isLoading) {
      console.log('Starting 30-second completion timer for video');

      completionTimerRef.current = setTimeout(() => {
        markVideoAsCompleted();
      }, 30000); // 30 seconds
    }

    // Cleanup function
    return () => {
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }
    };
  }, [chapterVideoId, url, isLoading]);

  const markVideoAsCompleted = async () => {
    if (!chapterVideoId || hasMarkedAsCompleted) return;

    try {
      console.log('Marking video as completed:', chapterVideoId);
      await axiosInstance.post('/completed-video', {
        video_id: video?.id,
      });

      console.log('Video marked as completed successfully');
      setHasMarkedAsCompleted(true);
    } catch (error) {
      console.error('Error marking video as completed:', error);
    }
  };

  if (!url) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-600">Video URL is missing</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video relative rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-primary animate-spin"></div>
            <p className="text-gray-600">Loading video...</p>
          </div>
        </div>
      ) : (
        <iframe
          key={videoKey} // Key forces re-render when changed
          src={url}
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture pip"
          className="absolute top-0 left-0 w-full h-full border-0 rounded-3xl"
          title="Video player"
          onLoad={() => {
            // Reset the timer when the iframe loads
            if (completionTimerRef.current) {
              clearTimeout(completionTimerRef.current);
            }

            if (chapterVideoId && !hasMarkedAsCompleted) {
              completionTimerRef.current = setTimeout(() => {
                markVideoAsCompleted();
              }, 30000); // 30 seconds
            }
          }}
        />
      )}
    </div>
  );
};
