import { useState } from 'react';
import {
  getComments,
  addComment as apiAddComment,
  deleteComment as apiDeleteComment,
} from '../api';
import { Comment } from '../types/Comment';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingForAdd, setIsLoadingForAdd] = useState(false);

  const getCommentsFromServer = (postId: number) => {
    setIsLoading(true);
    setError(null);
    getComments()
      .then(allComments =>
        setComments(allComments.filter(c => c.postId === postId)),
      )
      .catch(() => setError('Failed to load comments'))
      .finally(() => setIsLoading(false));
  };

  const addComment = (comment: Omit<Comment, 'id'>) => {
    setIsLoadingForAdd(true);

    return apiAddComment(comment)
      .then(c => setComments(prev => [...prev, c]))
      .finally(() => setIsLoadingForAdd(false));
  };

  const deleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
    apiDeleteComment(id).catch(() => alert('Failed to delete comment'));
  };

  return {
    comments,
    isLoading,
    error,
    getCommentsFromServer,
    addComment,
    deleteComment,
    isLoadingForAdd,
  };
};
