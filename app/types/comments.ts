// Define an interface for the nested user object
interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  avatar: string | null;
}

// Define an interface for the overall comment object
export interface CommentData {
  id: string;
  comment: string;
  user_id: string;
  video_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
}
