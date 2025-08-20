import React from 'react';
import { User } from '../types/User';

type UserItemProps = {
  user: User;
  setSelectedPerson: (user: User) => void;
};

export const UserItem: React.FC<UserItemProps> = ({
  user,
  setSelectedPerson,
}) => {
  return (
    <li>
      <button onClick={() => setSelectedPerson(user)}>{user.name}</button>
    </li>
  );
};
