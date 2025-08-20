import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { User } from '../types/User';

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users'))
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading, error };
};
