import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'zap' | 'target' | 'award';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface AchievementUnlockProps {
  achievement: Achievement;
  isVisible: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  award: Award
};

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600'
};

export function AchievementUnlock({ 
  achievement, 
  isVisible, 
  onClose, 
  onComplete 
}: AchievementUnlockProps) {
  const [showParticles, setShowParticles] = useState(false);
  const Icon = iconMap[achievement.icon];

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true);
      const timer = setTimeout(() => {
        setShowParticles(false);
        onComplete?.();
      }, 3000);
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
          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10 
            }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4"
          >
            {/* Rarity Border */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${rarityColors[achievement.rarity]} opacity-20`}
            />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15,
                delay: 0.3 
              }}
              className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity]} flex items-center justify-center`}
            >
              <Icon className="h-10 w-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-center text-gray-900 mb-2"
            >
              {achievement.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-center mb-4"
            >
              {achievement.description}
            </motion.p>

            {/* Points */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
                +{achievement.points} Points
              </span>
            </motion.div>

            {/* Rarity Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute top-4 right-4"
            >
              <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${rarityColors[achievement.rarity]}`}>
                {achievement.rarity.toUpperCase()}
              </span>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </motion.button>
          </motion.div>

          {/* Particle Effects */}
          <AnimatePresence>
            {showParticles && (
              <>
                {[...Array(12)].map((_, i) => (
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
                      x: Math.cos(i * 30 * Math.PI / 180) * 200,
                      y: Math.sin(i * 30 * Math.PI / 180) * 200
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
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