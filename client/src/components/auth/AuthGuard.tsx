import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContextV2 } from '../../context/AuthContextV2';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  allowedRoles?: ('guest' | 'user' | 'admin')[];
  guestAllowed?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function AuthGuard({ 
  children, 
  requiredAuth = true,
  allowedRoles = ['user', 'admin'],
  guestAllowed = false,
  redirectTo = '/login',
  fallback = null
}: AuthGuardProps) {
  const { isAuthenticated, isGuest, user, isLoading } = useAuthContextV2();
  const location = useLocation();

  // Show loading state while auth is being determined
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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
    // Redirect guests to upgrade page or show upgrade modal
    return <Navigate to="/guest/upgrade" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0) {
    const userRole = isGuest ? 'guest' : 'user'; // Remove role property access since User doesn't have role
    
    if (!allowedRoles.includes(userRole as any)) {
      // Redirect to unauthorized page or show access denied
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // All checks passed, render children
  return <>{children}</>;
}

// Convenience components for common protection patterns
export function ProtectedRoute({ children, ...props }: Omit<AuthGuardProps, 'requiredAuth'>) {
  return (
    <AuthGuard requiredAuth={true} {...props}>
      {children}
    </AuthGuard>
  );
}

export function GuestOnlyRoute({ children, ...props }: Omit<AuthGuardProps, 'requiredAuth' | 'guestAllowed'>) {
  return (
    <AuthGuard requiredAuth={true} guestAllowed={true} allowedRoles={['guest']} {...props}>
      {children}
    </AuthGuard>
  );
}

export function UserOnlyRoute({ children, ...props }: Omit<AuthGuardProps, 'requiredAuth' | 'allowedRoles'>) {
  return (
    <AuthGuard requiredAuth={true} allowedRoles={['user', 'admin']} {...props}>
      {children}
    </AuthGuard>
  );
}

export function AdminOnlyRoute({ children, ...props }: Omit<AuthGuardProps, 'requiredAuth' | 'allowedRoles'>) {
  return (
    <AuthGuard requiredAuth={true} allowedRoles={['admin']} {...props}>
      {children}
    </AuthGuard>
  );
} 