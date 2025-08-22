import React, { useState, useContext } from 'react';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Users, 
  MessageSquare, 
  User as UserIcon, 
  Menu, 
  X,
  Target,
  Award,
  UserPlus,
  Lock,
  Gamepad2,
  GraduationCap,
  LogOut,
  Brain,
  Bell
} from 'lucide-react';
import { Button } from '../ui/Button';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import type { User as AppUser, NavigationItem as AppNavigationItem } from '../../types';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: AppUser | null;
  isGuest?: boolean;
  onLogout?: () => void;
}

export function Navigation({ currentView, onNavigate, user, isGuest = false, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user: contextUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Mock unread count for notifications
  const unreadCount = 0;

  // use the strongly-typed list defined below

  const handleUpgrade = () => {
    onNavigate('register');
  };

  const handleLogoClick = () => {
    onNavigate('landing');
  };

  const NavItem = ({ item, isMobile = false }: { item: AppNavigationItemExt; isMobile?: boolean }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id || (currentView === 'guest-dashboard' && item.id === 'dashboard');
    const isLocked = isGuest && !item.guestAllowed;
    const isDashboard = item.id === 'dashboard';
    return (
      <button
        onClick={() => {
          if (isLocked) {
            handleUpgrade();
          } else {
            onNavigate(item.id);
          }
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        className={`
          flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 relative
          ${isActive 
            ? 'bg-green-600 text-white shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-orange-500'
            : isLocked
              ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
              : isMobile
                ? 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-orange-500'
                : 'text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-orange-500'
          }
          ${isMobile ? 'w-full justify-start' : ''}
        `}
      >
        <Icon className="h-5 w-5" />
        <span className={`font-medium ${isMobile ? 'block' : 'hidden lg:block'}`}>
          {item.label}
        </span>
        {isLocked && (
          <Lock className="h-3 w-3 ml-auto" />
        )}
      </button>
    );
  };

  return (
    <>
      {/* Enhanced Desktop Navigation with Zambian Theming */}
      <nav className="hidden md:flex header-zambian shadow-lg border-b border-green-700/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Clickable Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="/logo.svg" alt="SomaSmart Logo" className="h-8 w-8" />
              </div>
              <h1 className="text-xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                SomaSmart EduHub
              </h1>
              {isGuest && (
                <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                  Guest Mode
                </span>
              )}
            </button>

            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
               {navigationItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>

            {/* User Info / Actions */}
            <div className="flex items-center space-x-3">
              {isGuest ? (
                <Button
                  onClick={handleUpgrade}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2 text-white" />
                  Create Account
                </Button>
              ) : (
                <>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      {contextUser?.firstName} {contextUser?.lastName}
                    </p>
                    <p className="text-xs text-white/80">{contextUser?.grade === '8' ? 'FORM1' : `Grade ${contextUser?.grade}`}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {contextUser?.firstName?.[0]}{contextUser?.lastName?.[0]}
                    </span>
                  </div>
                  {onLogout && (
                    <Button
                      onClick={onLogout}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-red-200"
                    >
                      <LogOut className="h-4 w-4 text-white" />
                    </Button>
                  )}
                   {false && (
                    <button
                      onClick={() => navigate('/student/inbox')}
                      className="relative focus:outline-none"
                      aria-label="Notifications"
                    >
                      <Bell className="h-5 w-5 text-white" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">{unreadCount}</span>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Clickable Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <img src="/logo.svg" alt="SomaSmart Logo" className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                  SomaSmart
                </h1>
                {isGuest && (
                  <span className="text-xs text-orange-600 font-medium">Guest Mode</span>
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="pb-4 border-t border-gray-200">
              <div className="pt-4 space-y-2">
                 {navigationItems.map((item) => (
                  <NavItem key={item.id} item={item} isMobile />
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  {isGuest ? (
                    <button
                      onClick={handleUpgrade}
                      className="w-full flex items-center space-x-3 px-3 py-2 bg-green-600 text-white rounded-lg font-medium"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-3 py-2">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {contextUser?.firstName?.[0]}{contextUser?.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {contextUser?.firstName} {contextUser?.lastName}
                          </p>
                          <p className="text-xs text-gray-600">{contextUser?.grade === '8' ? 'FORM1' : `Grade ${contextUser?.grade}`}</p>
                        </div>
                      </div>
                      {onLogout && (
                        <button
                          onClick={() => {
                            onLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sign Out</span>
                        </button>
                      )}
                       {false && (
                        <button
                          onClick={() => navigate('/student/inbox')}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        >
                          <Bell className="h-5 w-5" />
                          <span>Inbox</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

// Extend the app NavigationItem with local fields used by this component
type AppNavigationItemExt = AppNavigationItem & {
  id: string;
  label: string;
  guestAllowed: boolean;
};

// Locally define the items with additional fields while keeping icon type compatible
const navigationItems: AppNavigationItemExt[] = [
  { id: 'dashboard', label: 'Home', icon: Home, guestAllowed: true, name: 'Home', href: '/dashboard' },
  { id: 'subjects', label: 'Subjects', icon: BookOpen, guestAllowed: true, name: 'Subjects', href: '/subjects' },
  { id: 'arcade', label: 'Game Arcade', icon: Gamepad2, guestAllowed: true, name: 'Arcade', href: '/arcade' },
  { id: 'ai-hub', label: 'AI Hub', icon: Brain, guestAllowed: true, name: 'AI Hub', href: '/ai-hub' },
  { id: 'challenges', label: 'Challenges', icon: Target, guestAllowed: true, name: 'Challenges', href: '/challenges' },
  { id: 'leaderboards', label: 'Leaderboards', icon: Trophy, guestAllowed: true, name: 'Leaderboards', href: '/leaderboards' },
  { id: 'forum', label: 'Forum', icon: MessageSquare, guestAllowed: true, name: 'Forum', href: '/forum' },
  { id: 'profile', label: 'Profile', icon: UserIcon, guestAllowed: false, name: 'Profile', href: '/profile' },
];