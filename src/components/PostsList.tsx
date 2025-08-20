// src/components/PostsList.tsx
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post) => void;
  getCommentsFromServer: (postId: number) => void;
  setIsFormVisible: (v: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  getCommentsFromServer,
  setIsFormVisible,
}) => {
  const handleClick = (post: Post) => {
    setSelectedPost(post);
    setIsFormVisible(false);
    getCommentsFromServer(post.id);
  };

  return (
    <div className="table-container">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr
              key={post.id}
              onClick={() => handleClick(post)}
              className={selectedPost?.id === post.id ? 'is-selected' : ''}
            >
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
