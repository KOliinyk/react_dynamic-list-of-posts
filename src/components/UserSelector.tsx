import React, { ChangeEvent } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type UserSelectorProps = {
  users: User[];
  getPostsFromServer: (userId: number) => void;
  selectedPerson: User | null;
  setSelectedPerson: (user: User | null) => void;
  setSelectedPost: (post: Post | null) => void;
  setIsFormVisible: (value: boolean) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  getPostsFromServer,
  selectedPerson,
  setSelectedPerson,
  setSelectedPost,
  setIsFormVisible,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    const user = users.find(u => u.id === userId) || null;

    setSelectedPerson(user);
    setSelectedPost(null);
    setIsFormVisible(false);

    if (user) {
      getPostsFromServer(user.id);
    }
  };

  return (
    <div className="field">
      <label htmlFor="user-select" className="label">
        Select user
      </label>
      <div className="control">
        <div className="select is-fullwidth">
          <select
            id="user-select"
            value={selectedPerson?.id || ''}
            onChange={handleChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
