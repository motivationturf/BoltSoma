import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, Star, Trophy } from 'lucide-react';

interface StreakMilestone {
  days: number;
  reward: string;
  multiplier: number;
  icon: 'flame' | 'zap' | 'star' | 'trophy';
}

interface StreakMilestoneProps {
  milestone: StreakMilestone;
  isVisible: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const iconMap = {
  flame: Flame,
  zap: Zap,
  star: Star,
  trophy: Trophy
};

const milestoneColors = {
  flame: 'from-red-400 to-orange-500',
  zap: 'from-yellow-400 to-orange-500',
  star: 'from-blue-400 to-purple-500',
  trophy: 'from-yellow-400 to-amber-500'
};

export function StreakMilestone({ 
  milestone, 
  isVisible, 
  onClose, 
  onComplete 
}: StreakMilestoneProps) {
  const [showFireworks, setShowFireworks] = useState(false);
  const Icon = iconMap[milestone.icon];

  useEffect(() => {
    if (isVisible) {
      setShowFireworks(true);
      const timer = setTimeout(() => {
        setShowFireworks(false);
        onComplete?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          {/* Streak Card */}
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 150, 
              damping: 15 
            }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4"
          >
            {/* Animated Background */}
            <motion.div
              animate={{ 
                background: [
                  "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                  "linear-gradient(45deg, #4ecdc4, #45b7d1)",
                  "linear-gradient(45deg, #45b7d1, #96ceb4)",
                  "linear-gradient(45deg, #96ceb4, #ff6b6b)"
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-3xl opacity-10"
            />

            {/* Icon with Pulse */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15,
                delay: 0.2 
              }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${milestoneColors[milestone.icon]} flex items-center justify-center`}
              >
                <Icon className="h-12 w-12 text-white" />
              </motion.div>
            </motion.div>

            {/* Streak Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-4xl font-bold text-gray-900 mb-2"
              >
                {milestone.days} Day{milestone.days > 1 ? 's' : ''}!
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-gray-600"
              >
                Streak Milestone Reached!
              </motion.div>
            </motion.div>

            {/* Reward */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center mb-6"
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold">
                {milestone.reward}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {milestone.multiplier}x Points Multiplier Active!
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 1 }}
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1 }}
                className={`h-full bg-gradient-to-r ${milestoneColors[milestone.icon]}`}
              />
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </motion.button>
          </motion.div>

          {/* Fireworks Effect */}
          <AnimatePresence>
            {showFireworks && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 0,
                      y: 0
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.cos(i * 45 * Math.PI / 180) * 300,
                      y: Math.sin(i * 45 * Math.PI / 180) * 300
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                    className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 