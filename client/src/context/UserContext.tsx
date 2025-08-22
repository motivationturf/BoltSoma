import React, { createContext, useState, ReactNode } from 'react';
import type { User, ApiError } from '../types';

interface UserContextType {
  user: User | null;
  onUpdate: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  onUpdate: async () => {},
  isLoading: false,
  error: '',
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Mock user for demonstration
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    grade: '12',
    avatar: '',
    createdAt: new Date(),
    lastLogin: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onUpdate = async (data: Partial<User>) => {
    setIsLoading(true);
    setError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({ ...prev!, ...data }));
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, onUpdate, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}; 