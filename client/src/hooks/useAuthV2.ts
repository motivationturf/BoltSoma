import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authServiceV2, type User, type LoginRequest, type RegisterRequest, type GuestRequest, type GuestUpgradeRequest } from '../services/authServiceV2';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  createGuestSession: (data: GuestRequest) => Promise<void>;
  upgradeGuestAccount: (data: GuestUpgradeRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export function useAuthV2(): AuthState & AuthActions {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
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

        if (authServiceV2.isAuthenticated()) {
          const user = await authServiceV2.refreshUser();
          if (user) {
            setState({
              user,
              isAuthenticated: true,
              isGuest: user.isGuest,
              isLoading: false,
              error: null,
            });
          } else {
            // Token is invalid, clear auth
            authServiceV2.clearAuth();
            setState({
              user: null,
              isAuthenticated: false,
              isGuest: false,
              isLoading: false,
              error: null,
            });
          }
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isGuest: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authServiceV2.clearAuth();
        setState({
          user: null,
          isAuthenticated: false,
          isGuest: false,
          isLoading: false,
          error: 'Failed to initialize authentication',
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await authServiceV2.login(data);
      
      if (response.success) {
        setState({
          user: response.user,
          isAuthenticated: true,
          isGuest: response.user.isGuest,
          isLoading: false,
          error: null,
        });
        
        // Navigate to dashboard after successful login
        navigate('/dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, [navigate]);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await authServiceV2.register(data);
      
      if (response.success) {
        setState({
          user: response.user,
          isAuthenticated: true,
          isGuest: response.user.isGuest,
          isLoading: false,
          error: null,
        });
        
        // Navigate to dashboard after successful registration
        navigate('/dashboard');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  }, [navigate]);

  const createGuestSession = useCallback(async (data: GuestRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await authServiceV2.createGuestSession(data);
      
      if (response.success) {
        setState({
          user: response.user,
          isAuthenticated: true,
          isGuest: true,
          isLoading: false,
          error: null,
        });
        
        // Navigate to dashboard after successful guest session creation
        navigate('/dashboard');
      } else {
        throw new Error('Guest session creation failed');
      }
    } catch (error) {
      console.error('Guest session creation error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Guest session creation failed',
      }));
      throw error;
    }
  }, [navigate]);

  const upgradeGuestAccount = useCallback(async (data: GuestUpgradeRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await authServiceV2.upgradeGuestAccount(data);
      
      if (response.success) {
        setState({
          user: response.user,
          isAuthenticated: true,
          isGuest: false,
          isLoading: false,
          error: null,
        });
        
        // Show success message or navigate
        console.log('Guest account upgraded successfully');
      } else {
        throw new Error('Account upgrade failed');
      }
    } catch (error) {
      console.error('Account upgrade error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Account upgrade failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await authServiceV2.logout();
      
      setState({
        user: null,
        isAuthenticated: false,
        isGuest: false,
        isLoading: false,
        error: null,
      });
      
      // Navigate to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local auth
      authServiceV2.clearAuth();
      setState({
        user: null,
        isAuthenticated: false,
        isGuest: false,
        isLoading: false,
        error: null,
      });
      navigate('/');
    }
  }, [navigate]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const user = await authServiceV2.refreshUser();
      if (user) {
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isGuest: user.isGuest,
        }));
      } else {
        // User is no longer valid, clear auth
        authServiceV2.clearAuth();
        setState({
          user: null,
          isAuthenticated: false,
          isGuest: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('User refresh error:', error);
      authServiceV2.clearAuth();
      setState({
        user: null,
        isAuthenticated: false,
        isGuest: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  return {
    ...state,
    login,
    register,
    createGuestSession,
    upgradeGuestAccount,
    logout,
    clearError,
    refreshUser,
  };
} 