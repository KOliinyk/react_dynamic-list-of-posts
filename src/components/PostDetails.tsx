import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { AddCommentForm } from './AddCommentForm';

type PostDetailsProps = {
  post: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  errorComments: string | null;
  deleteComment: (id: number) => void;
  isFormVisible: boolean;
  setIsFormVisible: (visible: boolean) => void;
  addComment: (comment: Omit<Comment, 'id'>) => void;
  isLoadingForAdd: boolean;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  comments,
  isLoadingComments,
  errorComments,
  deleteComment,
  isFormVisible,
  setIsFormVisible,
  addComment,
  isLoadingForAdd,
}) => {
  return (
    <div>
      <h2 className="title is-4">{post.title}</h2>
      <p>{post.body}</p>

      <hr />

      <h3 className="title is-5">Comments</h3>

      {isLoadingComments && <Loader />}
      {errorComments && (
        <div className="notification is-danger">{errorComments}</div>
      )}

      {!isLoadingComments && !errorComments && comments.length === 0 && (
        <div className="notification is-warning">No comments</div>
      )}

      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="box">
            <p>
              <strong>{comment.name}</strong> ({comment.email})
            </p>
            <p>{comment.body}</p>
            <button
              className="button is-small is-danger mt-2"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {!isFormVisible && (
        <button
          className="button is-link mt-3"
          onClick={() => setIsFormVisible(true)}
        >
          Write a comment
        </button>
      )}

      {isFormVisible && (
        <div className="mt-3">
          <AddCommentForm
            onAddComment={addComment}
            isLoading={isLoadingForAdd}
          />
        </div>
      )}
    </div>
  );
};
