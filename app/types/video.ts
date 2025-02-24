// types/video.ts
export interface Video {
  id: string;
  title: string;
  url: string;
  duration: number;
  progress?: number;
}

export interface Chapter {
  id: string;
  title: string;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  chapters: Chapter[];
}
