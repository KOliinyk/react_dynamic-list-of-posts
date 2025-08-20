import React, { useState } from 'react';

type Props = {
  onAdd: (name: string, email: string, body: string) => void;
};

export const AddCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    onAdd(name, email, body);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form className="add-comment-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment-name" className="sr-only">
          Name
        </label>
        <input
          id="comment-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="comment-email" className="sr-only">
          Email
        </label>
        <input
          id="comment-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="comment-body" className="sr-only">
          Comment
        </label>
        <textarea
          id="comment-body"
          placeholder="Comment"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </div>

      <button type="submit">Add comment</button>
    </form>
  );
};
