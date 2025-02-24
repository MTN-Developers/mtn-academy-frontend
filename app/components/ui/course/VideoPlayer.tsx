// app/components/course/VideoPlayer.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useVideoProgress } from "@/app/hooks/useVideoProgress";

interface VideoPlayerProps {
  url: string;
  courseId: string;
  videoId: string;
}

export function VideoPlayer({ url, courseId, videoId }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(played);
  const { loadProgress, saveProgress } = useVideoProgress(courseId, videoId);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = loadProgress();
    setPlayed(savedProgress);
    progressRef.current = savedProgress;
  }, []);

  // Save progress periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (!seeking && progressRef.current !== played) {
        saveProgress(played);
        progressRef.current = played;
      }
    }, 5000);

    return () => {
      clearInterval(saveInterval);
      saveProgress(played);
    };
  }, [played, seeking, saveProgress]);

  const handleProgress = ({ played: currentPlayed }: { played: number }) => {
    if (!seeking) {
      setPlayed(currentPlayed);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (value: number[]) => {
    const newValue = value[0];
    setPlayed(newValue);
    if (playerRef.current) {
      playerRef.current.seekTo(newValue);
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const toggleFullScreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      ref={playerContainerRef}
      className="relative aspect-video bg-black rounded-lg overflow-hidden"
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        progressInterval={1000}
        className="absolute top-0 left-0"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="space-y-2">
          <Slider
            value={[played]}
            max={1}
            step={0.001}
            onValueChange={handleSeekChange}
            className="w-full"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPlaying(!playing)}
                className="text-white hover:bg-white/20"
              >
                {playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMuted(!muted)}
                  className="text-white hover:bg-white/20"
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <Slider
                  value={[muted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="w-20"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullScreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
