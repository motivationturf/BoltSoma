import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContextV2 } from '../../context/AuthContextV2';
import { Button } from '../ui/Button';
import { 
  Home, 
  User, 
  BookOpen, 
  Trophy, 
  Users, 
  Gamepad2, 
  Brain, 
  Settings, 
  LogOut,
  Crown,
  Menu,
  X
} from 'lucide-react';

export function Navigation() {
  const { isAuthenticated, isGuest, user, logout } = useAuthContextV2();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleUpgrade = () => {
    navigate('/guest/upgrade');
  };

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { path: '/subjects', label: 'Subjects', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/challenges', label: 'Challenges', icon: <Trophy className="w-4 h-4" /> },
    { path: '/leaderboards', label: 'Leaderboards', icon: <Users className="w-4 h-4" /> },
    { path: '/arcade', label: 'Arcade', icon: <Gamepad2 className="w-4 h-4" /> },
    { path: '/ai-hub', label: 'AI Hub', icon: <Brain className="w-4 h-4" /> },
  ];

  // Navigation items for guests (limited access)
  const guestNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { path: '/subjects', label: 'Subjects', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/arcade', label: 'Arcade', icon: <Gamepad2 className="w-4 h-4" /> },
  ];

  const navItems = isGuest ? guestNavItems : authenticatedNavItems;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SomaSmart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                {/* Main Navigation */}
                <div className="flex items-center space-x-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  {/* Guest Upgrade Banner */}
                  {isGuest && (
                    <Button
                      onClick={handleUpgrade}
                      size="sm"
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      Upgrade
                    </Button>
                  )}

                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.firstName || 'Profile'}</span>
                    {isGuest && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        Guest
                      </span>
                    )}
                  </Link>

                  {/* Logout */}
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            )}

            {/* Public Navigation */}
            {!isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
                <Link
                  to="/guest"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Try as Guest
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {isAuthenticated ? (
              <>
                {/* Mobile Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}

                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {isGuest && (
                    <Button
                      onClick={() => {
                        handleUpgrade();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Account
                    </Button>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                    {isGuest && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        Guest
                      </span>
                    )}
                  </Link>

                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              /* Mobile Public Navigation */
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Link>
                <Link
                  to="/guest"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Try as Guest
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 