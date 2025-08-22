import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAuthService, type AuthUser, type SignUpData, type SignInData, type GuestData } from '../services/supabaseAuthService';
import type { Session } from '@supabase/supabase-js';

export interface SupabaseAuthState {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SupabaseAuthActions {
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signInAnonymously: (data: GuestData) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  refreshSession: () => Promise<void>;
}

export function useSupabaseAuth(): SupabaseAuthState & SupabaseAuthActions {
  const navigate = useNavigate();
  const [state, setState] = useState<SupabaseAuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isGuest: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const { session, user } = await supabaseAuthService.getCurrentSession();
        
        setState({
          user,
          session,
          isAuthenticated: !!user,
          isGuest: user?.isGuest || false,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState({
          user: null,
          session: null,
          isAuthenticated: false,
          isGuest: false,
          isLoading: false,
          error: 'Failed to initialize authentication',
        });
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange((user, session) => {
      setState(prev => ({
        ...prev,
        user,
        session,
        isAuthenticated: !!user,
        isGuest: user?.isGuest || false,
        isLoading: false,
      }));
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await supabaseAuthService.signUp(data);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          user: result.user!,
          session: result.session!,
          isAuthenticated: true,
          isGuest: result.user!.isGuest,
          isLoading: false,
          error: null,
        }));
        
        navigate('/dashboard');
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Sign up failed',
        }));
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign up failed',
      }));
    }
  }, [navigate]);

  const signIn = useCallback(async (data: SignInData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await supabaseAuthService.signIn(data);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          user: result.user!,
          session: result.session!,
          isAuthenticated: true,
          isGuest: result.user!.isGuest,
          isLoading: false,
          error: null,
        }));
        
        navigate('/dashboard');
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Sign in failed',
        }));
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign in failed',
      }));
    }
  }, [navigate]);

  const signInAnonymously = useCallback(async (data: GuestData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await supabaseAuthService.signInAnonymously(data);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          user: result.user!,
          session: result.session!,
          isAuthenticated: true,
          isGuest: true,
          isLoading: false,
          error: null,
        }));
        
        navigate('/dashboard');
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Guest session creation failed',
        }));
      }
    } catch (error) {
      console.error('Guest session creation error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Guest session creation failed',
      }));
    }
  }, [navigate]);

  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await supabaseAuthService.signOut();
      
      setState({
        user: null,
        session: null,
        isAuthenticated: false,
        isGuest: false,
        isLoading: false,
        error: null,
      });
      
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      }));
    }
  }, [navigate]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const { session, user } = await supabaseAuthService.getCurrentSession();
      setState(prev => ({
        ...prev,
        user,
        session,
        isAuthenticated: !!user,
        isGuest: user?.isGuest || false,
      }));
    } catch (error) {
      console.error('Session refresh error:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to refresh session',
      }));
    }
  }, []);

  return {
    ...state,
    signUp,
    signIn,
    signInAnonymously,
    signOut,
    clearError,
    refreshSession,
  };
}