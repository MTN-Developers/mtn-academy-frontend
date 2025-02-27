'use client';

import React, { useEffect, useState } from 'react';

export const VideoPlayer = ({ url }: { url?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now());

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
        />
      )}
    </div>
  );
};
