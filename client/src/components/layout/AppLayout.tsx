import React from 'react';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function AppLayout({ children, showHeader = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <AppHeader />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 