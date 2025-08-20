import React from 'react';
import { Comment } from '../types/Comment';
import { AddCommentForm } from './AddCommentForm';
import { CommentsError } from './CommentsError';

type PostDetailsProps = {
  postId: number;
  comments: Comment[];
  onAddComment: (name: string, email: string, body: string) => void;
  onDeleteComment: (id: number) => void;
  error: string | null;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  postId,
  comments,
  onAddComment,
  onDeleteComment,
  error,
}) => {
  return (
    <div className="post-details">
      <h2>Post #{postId}</h2>

      {error && <CommentsError message={error} />}

      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>
              <strong>{comment.name}</strong> ({comment.email})
            </p>
            <p>{comment.body}</p>
            <button onClick={() => onDeleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <AddCommentForm onAdd={onAddComment} />
    </div>
  );
};
