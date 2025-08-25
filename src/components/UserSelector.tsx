// src/components/UserSelector.tsx
import React, { useState } from 'react';
import { User } from '../types/User';

type UserSelectorProps = {
  users: User[];
  selectedPerson: User | null;
  setSelectedPerson: (user: User | null) => void;
  setSelectedPost: (post: Post | null) => void;
  setIsFormVisible: (visible: boolean) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedPerson,
  setSelectedPerson,
  setSelectedPost,
  setIsFormVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (user: User) => {
    setSelectedPerson(user);
    setSelectedPost(null);
    setIsFormVisible(false);
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedPerson ? selectedPerson.name : 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length > 0 ? (
            users.map(user => (
              <a
                key={user.id}
                className="dropdown-item"
                onClick={() => handleSelect(user)}
              >
                {user.name}
              </a>
            ))
          ) : (
            <div className="dropdown-item">No users available</div>
          )}
        </div>
      </div>
    </div>
  );
};
