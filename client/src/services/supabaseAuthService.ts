import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  grade?: string;
  avatar?: string;
  isGuest: boolean;
  isTeacher: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  session?: Session;
  error?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  grade?: string;
  isTeacher: boolean;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface GuestData {
  firstName: string;
  lastName: string;
  grade?: string;
}

class SupabaseAuthService {
  // Sign up with email and password
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            grade: data.grade,
            is_teacher: data.isTeacher,
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (authData.user && authData.session) {
        const user = this.transformSupabaseUser(authData.user);
        return { success: true, user, session: authData.session };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  }

  // Sign in with email and password
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (authData.user && authData.session) {
        const user = this.transformSupabaseUser(authData.user);
        return { success: true, user, session: authData.session };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }

  // Create anonymous guest session
  async signInAnonymously(data: GuestData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            grade: data.grade,
            is_guest: true,
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (authData.user && authData.session) {
        const user = this.transformSupabaseUser(authData.user, true);
        return { success: true, user, session: authData.session };
      }

      return { success: false, error: 'Guest session creation failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Guest session creation failed' 
      };
    }
  }

  // Sign out
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign out failed' 
      };
    }
  }

  // Get current session
  async getCurrentSession(): Promise<{ session: Session | null; user: AuthUser | null }> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session error:', error);
        return { session: null, user: null };
      }

      if (session?.user) {
        const user = this.transformSupabaseUser(session.user);
        return { session, user };
      }

      return { session: null, user: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, user: null };
    }
  }

  // Transform Supabase user to our AuthUser format
  private transformSupabaseUser(user: User, isGuest = false): AuthUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.user_metadata?.first_name || '',
      lastName: user.user_metadata?.last_name || '',
      grade: user.user_metadata?.grade || '',
      avatar: user.user_metadata?.avatar || '',
      isGuest: isGuest || user.user_metadata?.is_guest || user.is_anonymous || false,
      isTeacher: user.user_metadata?.is_teacher || false,
      createdAt: user.created_at,
    };
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const user = this.transformSupabaseUser(session.user);
        callback(user, session);
      } else {
        callback(null, null);
      }
    });
  }
}

export const supabaseAuthService = new SupabaseAuthService();