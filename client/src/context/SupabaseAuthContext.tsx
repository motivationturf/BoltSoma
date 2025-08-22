import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabaseAuthService, type AuthUser } from '../services/supabaseAuthService';
import type { Session } from '@supabase/supabase-js';

interface SupabaseAuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  signUp: (data: any) => Promise<any>;
  signIn: (data: any) => Promise<any>;
  signInAnonymously: (data: any) => Promise<any>;
  signOut: () => Promise<any>;
  error: string | null;
  clearError: () => void;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

interface SupabaseAuthProviderProps {
  children: ReactNode;
}

export function SupabaseAuthProvider({ children }: SupabaseAuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session: currentSession, user: currentUser } = await supabaseAuthService.getCurrentSession();
        setSession(currentSession);
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange((user, session) => {
      setUser(user);
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: any) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await supabaseAuthService.signUp(data);
      if (!result.success) {
        setError(result.error || 'Sign up failed');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: any) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await supabaseAuthService.signIn(data);
      if (!result.success) {
        setError(result.error || 'Sign in failed');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signInAnonymously = async (data: any) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await supabaseAuthService.signInAnonymously(data);
      if (!result.success) {
        setError(result.error || 'Guest session creation failed');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Guest session creation failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await supabaseAuthService.signOut();
      if (!result.success) {
        setError(result.error || 'Sign out failed');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    isGuest: user?.isGuest || false,
    signUp,
    signIn,
    signInAnonymously,
    signOut,
    error,
    clearError,
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth(): SupabaseAuthContextType {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
}