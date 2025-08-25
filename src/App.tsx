// src/App.tsx
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { useUser } from './hooks/useUser';
import { usePosts } from './hooks/usePosts';
import { useComments } from './hooks/useComments';
import { User } from './types/User';
import { Post } from './types/Post';
import { useState, useEffect } from 'react';
import cn from 'classnames';

export const App = () => {
  const { users } = useUser();
  const {
    posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
    getPostsFromServer,
  } = usePosts();
  const {
    comments,
    isLoading: isLoadingComments,
    error: errorComments,
    getCommentsFromServer,
    addComment,
    deleteComment,
    isLoadingForAdd,
  } = useComments();

  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const isUserSelected = !!selectedPerson;
  const isPostSelected = !!selectedPost;

  useEffect(() => {
    if (!selectedPost) {
      setIsFormVisible(false);
    }
  }, [selectedPost]);

  const hasPosts = posts.length > 0;
  const shouldShowPostsList = isUserSelected && hasPosts && !isLoadingPosts;
  const shouldShowNoPostsYet =
    isUserSelected && !hasPosts && !isLoadingPosts && !errorPosts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <UserSelector
                data-cy="UserSelector" // для Cypress
                users={users}
                getPostsFromServer={getPostsFromServer}
                selectedPerson={selectedPerson}
                setSelectedPerson={setSelectedPerson}
                setSelectedPost={setSelectedPost}
                setIsFormVisible={setIsFormVisible}
              />

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoadingPosts && <Loader data-cy="LoaderPosts" />}
                {errorPosts && (
                  <div className="notification is-danger" data-cy="ErrorPosts">
                    {errorPosts}
                  </div>
                )}
                {shouldShowNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {shouldShowPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    getCommentsFromServer={getCommentsFromServer}
                    setIsFormVisible={setIsFormVisible}
                    data-cy="PostsList" // для Cypress
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': isPostSelected,
            })}
          >
            <div className="tile is-child box is-success">
              {isPostSelected && selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  errorComments={errorComments}
                  deleteComment={deleteComment}
                  isFormVisible={isFormVisible}
                  setIsFormVisible={setIsFormVisible}
                  addComment={addComment}
                  isLoadingForAdd={isLoadingForAdd}
                  data-cy="PostDetails" // для Cypress
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
