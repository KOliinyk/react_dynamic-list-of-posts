import React, { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedPerson: User | null;
  setSelectedPerson: (user: User | null) => void;
  setSelectedPost: (post: Post | null) => void;
  setIsFormVisible: (visible: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedPerson,
  setSelectedPerson,
  setSelectedPost,
  setIsFormVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown ${isOpen ? 'is-active' : ''}`}>
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
          {users.map(user => (
            <a
              key={user.id}
              className={`dropdown-item ${
                selectedPerson?.id === user.id ? 'is-active' : ''
              }`}
              onClick={() => {
                setSelectedPerson(user);
                setSelectedPost(null);
                setIsFormVisible(false);
                setIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
