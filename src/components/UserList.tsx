import React from 'react';
import { User } from '../types/User';
import { UserItem } from './UserItem'; // обов’язково вказати розширення .tsx, якщо потрібне

type UserListProps = {
  users: User[];
  setSelectedPerson: (user: User) => void;
};

export const UserList: React.FC<UserListProps> = ({
  users,
  setSelectedPerson,
}) => {
  return (
    <ul>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          setSelectedPerson={setSelectedPerson}
        />
      ))}
    </ul>
  );
};
