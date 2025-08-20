import { useState } from 'react';
import { Comment } from '../types/Comment';

type AddCommentFormProps = {
  onAddComment: (comment: Omit<Comment, 'id'>) => void;
  isLoading: boolean;
};

export const AddCommentForm: React.FC<AddCommentFormProps> = ({
  onAddComment,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!body) {
      newErrors.body = 'Comment text is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    onAddComment({ name, email, body });
    setBody('');
    setErrors({});
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="comment-name" className="label">
          Name
        </label>
        <div className="control">
          <input
            id="comment-name"
            type="text"
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name && <p className="help is-danger">{errors.name}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="comment-email" className="label">
          Email
        </label>
        <div className="control">
          <input
            id="comment-email"
            type="email"
            className="input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <p className="help is-danger">{errors.email}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="comment-body" className="label">
          Comment
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            className="textarea"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          {errors.body && <p className="help is-danger">{errors.body}</p>}
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
          >
            Add Comment
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
