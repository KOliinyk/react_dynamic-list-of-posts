import React from 'react';

type CommentsErrorProps = {
  message: string;
};

export const CommentsError: React.FC<CommentsErrorProps> = ({ message }) => (
  <div className="comments-error">
    <p>{message}</p>
  </div>
);
