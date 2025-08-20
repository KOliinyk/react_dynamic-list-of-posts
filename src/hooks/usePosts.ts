import { useState } from 'react';
import { getPosts } from '../api';
import { Post } from '../types/Post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPostsFromServer = (userId: number) => {
    setIsLoading(true);
    setError(null);
    getPosts()
      .then(allPosts => setPosts(allPosts.filter(p => p.userId === userId)))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setIsLoading(false));
  };

  return { posts, isLoading, error, getPostsFromServer };
};
