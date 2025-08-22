import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Home, Gamepad2, BookOpen, User, Trophy } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/arcade', label: 'Arcade', icon: Gamepad2 },
  { path: '/lessons', label: 'Lessons', icon: BookOpen },
  { path: '/leaderboards', label: 'Leaderboards', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User }
];

export function AnimatedNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path} className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    flex flex-col items-center p-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-600 hover:text-green-600'
                    }
                  `}
                >
                  <motion.div
                    animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 