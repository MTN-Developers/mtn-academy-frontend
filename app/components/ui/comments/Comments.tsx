// components/ui/Comments.tsx
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/app/lib/axios/instance';
import { CommentData } from '@/app/types/comments';
import { Loader } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

interface CommentsProps {
  videoId: string;
}

interface CommentResponse {
  data: {
    data: CommentData[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export const Comments: React.FC<CommentsProps> = ({ videoId }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [visibleComments, setVisibleComments] = useState<CommentData[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const INITIAL_VISIBLE_COUNT = 4;
  const LOAD_MORE_COUNT = 10;

  const fetchComments = useCallback(
    async (page = 1) => {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      try {
        const response = await axiosInstance.get<CommentResponse>(
          `/video-comment/video/${videoId}?page=${page}&limit=${LOAD_MORE_COUNT}`,
        );

        const { data, meta } = response.data.data;

        if (page === 1) {
          setComments(data);
        } else {
          setComments(prevComments => [...prevComments, ...data]);
        }

        setHasNextPage(meta.hasNextPage);
        setTotalComments(meta.total);
        setCurrentPage(page);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments. Please try again later.');
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [videoId],
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    // Update visible comments based on the initial count
    setVisibleComments(comments.slice(0, Math.min(INITIAL_VISIBLE_COUNT, comments.length)));
  }, [comments]);

  const handleLoadMore = async () => {
    // If we haven't shown all locally available comments yet
    if (visibleComments.length < comments.length) {
      setVisibleComments(comments);
    } else if (hasNextPage) {
      // If we need to fetch more from the server
      await fetchComments(currentPage + 1);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/video-comment', {
        comment: newComment,
        video_id: videoId,
      });

      // Add the new comment to the beginning of the array
      const newCommentData = response.data.data;
      setComments(prevComments => [newCommentData, ...prevComments]);

      // Update visible comments to include the new comment
      setVisibleComments(prevVisible => {
        const updatedVisible = [newCommentData, ...prevVisible];
        // Keep only the initial count if we're still in the collapsed state
        if (prevVisible.length <= INITIAL_VISIBLE_COUNT) {
          return updatedVisible.slice(0, INITIAL_VISIBLE_COUNT);
        }
        return updatedVisible;
      });

      setTotalComments(prev => prev + 1);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserDisplayName = (comment: CommentData) => {
    // If user exists and has a name, return it
    if (comment.user && comment.user.name) {
      return comment.user.name;
    }

    // Last resort fallback
    return user?.name || 'User';
  };

  const shouldShowLoadMoreButton = visibleComments.length < comments.length || hasNextPage;

  return (
    <section className="comments-section mt-8">
      <h3 className="text-xl font-bold mb-6">Comments {totalComments > 0 && `(${totalComments})`}</h3>

      <form onSubmit={handleAddComment} className="mb-8">
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !newComment.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Comment'}
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader className="animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : visibleComments.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</div>
      ) : (
        <>
          <div className="space-y-6">
            {visibleComments.map(comment => (
              <article key={comment.id} className="p-4 border rounded-lg bg-gray-50">
                <header className="flex items-center mb-2">
                  {comment.user?.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={`${getUserDisplayName(comment)}'s avatar`}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center text-gray-600">
                      {getUserDisplayName(comment).charAt(0).toUpperCase() +
                        getUserDisplayName(comment).charAt(1).toLocaleLowerCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">{getUserDisplayName(comment)}</h4>
                  </div>
                </header>
                <p className="text-gray-800">{comment.comment}</p>
                <time className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</time>
              </article>
            ))}
          </div>

          {shouldShowLoadMoreButton && (
            <div className="mt-6 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="text-blue-400 border border-blue-400 rounded-xl hover:shadow-lg font-medium text-sm px-4 py-2  transition-colors disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin w-4 h-4 mr-2" />
                    Loading...
                  </span>
                ) : (
                  'See More '
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
