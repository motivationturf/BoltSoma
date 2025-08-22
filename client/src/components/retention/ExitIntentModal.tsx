import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, Zap, Target, Award } from 'lucide-react';

interface ExitIntentModalProps {
  isVisible: boolean;
  offer: {
    type: string;
    title: string;
    message: string;
    cta: string;
  };
  onAccept: () => void;
  onDecline: () => void;
}

const iconMap = {
  quick_win: Target,
  streak_freeze: Star,
  feature_unlock: Zap,
  achievement: Award,
  discount: Gift
};

const colorMap = {
  quick_win: 'from-green-500 to-blue-500',
  streak_freeze: 'from-orange-500 to-red-500',
  feature_unlock: 'from-purple-500 to-pink-500',
  achievement: 'from-yellow-500 to-orange-500',
  discount: 'from-blue-500 to-green-500'
};

export function ExitIntentModal({ 
  isVisible, 
  offer, 
  onAccept, 
  onDecline 
}: ExitIntentModalProps) {
  const Icon = iconMap[offer.type as keyof typeof iconMap] || Gift;
  const colorClass = colorMap[offer.type as keyof typeof colorMap] || 'from-blue-500 to-green-500';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDecline}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center`}
            >
              <Icon className="h-10 w-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-center text-gray-900 mb-4"
            >
              {offer.title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-center mb-6 leading-relaxed"
            >
              {offer.message}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAccept}
                className={`flex-1 bg-gradient-to-r ${colorClass} text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                {offer.cta}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDecline}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Maybe Later
              </motion.button>
            </motion.div>

            {/* Urgency indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center space-x-2 text-sm text-orange-600"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span>Limited time offer</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 