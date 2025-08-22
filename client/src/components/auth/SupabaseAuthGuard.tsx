import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '../../context/SupabaseAuthContext';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface SupabaseAuthGuardProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  allowedRoles?: ('guest' | 'user' | 'admin')[];
  guestAllowed?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function SupabaseAuthGuard({ 
  children, 
  requiredAuth = true,
  allowedRoles = ['user', 'admin'],
  guestAllowed = false,
  redirectTo = '/login',
  fallback = null
}: SupabaseAuthGuardProps) {
  const { isAuthenticated, isGuest, user, isLoading } = useSupabaseAuth();
  const location = useLocation();

  // Show loading state while auth is being determined
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // If authentication is not required, render children
  if (!requiredAuth) {
    return <>{children}</>;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Handle guest user restrictions
  if (isGuest && !guestAllowed) {
    return <Navigate to="/guest/upgrade" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0) {
    const userRole = isGuest ? 'guest' : 'user';
    
    if (!allowedRoles.includes(userRole as any)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // All checks passed, render children
  return <>{children}</>;
}

// Convenience components for common protection patterns
export function SupabaseProtectedRoute({ children, ...props }: Omit<SupabaseAuthGuardProps, 'requiredAuth'>) {
  return (
    <SupabaseAuthGuard requiredAuth={true} {...props}>
      {children}
    </SupabaseAuthGuard>
  );
}

export function SupabaseGuestOnlyRoute({ children, ...props }: Omit<SupabaseAuthGuardProps, 'requiredAuth' | 'guestAllowed'>) {
  return (
    <SupabaseAuthGuard requiredAuth={true} guestAllowed={true} allowedRoles={['guest']} {...props}>
      {children}
    </SupabaseAuthGuard>
  );
}

export function SupabaseUserOnlyRoute({ children, ...props }: Omit<SupabaseAuthGuardProps, 'requiredAuth' | 'allowedRoles'>) {
  return (
    <SupabaseAuthGuard requiredAuth={true} allowedRoles={['user', 'admin']} {...props}>
      {children}
    </SupabaseAuthGuard>
  );
}