// hooks/useVideoProgress.ts

interface VideoProgress {
  played: number;
}

export function useVideoProgress(courseId: string, videoId: string) {
  const storageKey = `video-progress-${courseId}-${videoId}`;

  const loadProgress = (): number => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { played } = JSON.parse(saved) as VideoProgress;
        return played;
      }
    } catch (error) {
      console.error("Error loading video progress:", error);
    }
    return 0;
  };

  const saveProgress = (played: number) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ played }));
    } catch (error) {
      console.error("Error saving video progress:", error);
    }
  };

  const clearProgress = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Error clearing video progress:", error);
    }
  };

  return {
    loadProgress,
    saveProgress,
    clearProgress,
  };
}
