// components/ui/Comments.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
  id: string;
  comment: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
  created_at: string;
}

interface CommentsProps {
  videoId: string;
}

export const Comments: React.FC<CommentsProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  // FIXME: Fetch comments on initial render
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?videoId=${videoId}`);
        setComments(response.data.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/comments', {
        comment: newComment,
        video_id: videoId,
      });
      setComments([...comments, response.data.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="text-lg font-bold mb-4">Comments</h3>
      <div className="comments-list mb-4">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item mb-2">
            <div className="flex items-center mb-1">
              <img
                src={comment.user.avatar || '/default-avatar.png'}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-bold">{comment.user.name}</span>
            </div>
            <p className="text-sm">{comment.comment}</p>
            <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={handleAddComment} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </div>
    </div>
  );
};
