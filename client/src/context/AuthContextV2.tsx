import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthV2, type AuthState, type AuthActions } from '../hooks/useAuthV2';

interface AuthContextType extends AuthState, AuthActions {}

const AuthContextV2 = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderV2Props {
  children: ReactNode;
}

export function AuthProviderV2({ children }: AuthProviderV2Props) {
  const auth = useAuthV2();

  return (
    <AuthContextV2.Provider value={auth}>
      {children}
    </AuthContextV2.Provider>
  );
}

export function useAuthContextV2(): AuthContextType {
  const context = useContext(AuthContextV2);
  if (context === undefined) {
    throw new Error('useAuthContextV2 must be used within an AuthProviderV2');
  }
  return context;
}

// Export the hook for convenience
export { useAuthV2 }; 