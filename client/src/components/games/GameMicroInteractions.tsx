import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, Zap, Target, CheckCircle, XCircle } from 'lucide-react';

// Score Popup Animation
interface ScorePopupProps {
  score: number;
  isVisible: boolean;
  position: { x: number; y: number };
}

export function ScorePopup({ score, isVisible, position }: ScorePopupProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: -20 }}
          exit={{ opacity: 0, scale: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute pointer-events-none z-50"
          style={{ left: position.x, top: position.y }}
        >
          <div className="bg-yellow-400 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
            +{score}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Correct Answer Animation
export function CorrectAnswerAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 1, repeat: 2 }}
        className="bg-green-500 text-white p-8 rounded-full"
      >
        <CheckCircle className="h-16 w-16" />
      </motion.div>
    </motion.div>
  );
}

// Wrong Answer Animation
export function WrongAnswerAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [-5, 5, -5, 5, 0]
        }}
        transition={{ duration: 0.8 }}
        className="bg-red-500 text-white p-8 rounded-full"
      >
        <XCircle className="h-16 w-16" />
      </motion.div>
    </motion.div>
  );
}

// Timer Animation
interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export function AnimatedTimer({ timeLeft, totalTime }: TimerProps) {
  const progress = (timeLeft / totalTime) * 100;
  
  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-red-500"
          strokeDasharray={`${2 * Math.PI * 28}`}
          strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progress / 100) }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: timeLeft <= 10 ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
          className="text-lg font-bold"
        >
          {timeLeft}
        </motion.span>
      </div>
    </div>
  );
} 