import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Different transition types for different routes
const routeTransitions = {
  '/dashboard': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  '/arcade': {
    initial: { opacity: 0, scale: 0.9, rotateY: -15 },
    animate: { opacity: 1, scale: 1, rotateY: 0 },
    exit: { opacity: 0, scale: 0.9, rotateY: 15 }
  },
  '/profile': {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  '/lessons': {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  }
};

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const location = useLocation();
  const currentTransition = routeTransitions[location.pathname as keyof typeof routeTransitions] || pageVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={currentTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 