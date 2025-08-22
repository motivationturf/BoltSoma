import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lock, UserPlus } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  isLocked?: boolean;
  isGuest?: boolean;
  onUpgrade?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  gradient,
  isLocked = false,
  isGuest = false,
  onUpgrade,
  onClick,
  children,
  className = ''
}: FeatureCardProps) {
  const handleClick = () => {
    if (isLocked && onUpgrade) {
      onUpgrade();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative">
        {isLocked && (
          <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center rounded-lg">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border max-w-xs">
              <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Create Account</h3>
              <p className="text-sm text-gray-600 mb-4">Unlock this feature and save your progress</p>
              <Button onClick={onUpgrade} size="sm" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up Free
              </Button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={`bg-gradient-to-br ${gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icon}
              </div>
              {isGuest && (
                <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full">
                  Guest Access
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
              {title}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}