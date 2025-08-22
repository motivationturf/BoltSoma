import React from 'react';
import { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

// Standard animation variants
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  
  // Retention-focused animations
  achievementUnlock: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 10 
    }
  },
  
  streakMilestone: {
    initial: { scale: 0, y: 50 },
    animate: { scale: 1, y: 0 },
    transition: { 
      type: "spring", 
      stiffness: 150, 
      damping: 15 
    }
  },
  
  // Form animations
  formField: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2, ease: "easeOut" }
  },
  
  // Loading states
  loadingPulse: {
    animate: { 
      opacity: [0.5, 1, 0.5],
      scale: [0.98, 1, 0.98]
    },
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Utility to conditionally apply animations
export const getAnimationProps = (animation: keyof typeof animations, delay = 0) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 }
    };
  }
  
  const anim = animations[animation];
  return {
    ...anim,
    transition: {
      ...anim.transition,
      delay
    }
  };
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  animationDelay?: number;
  animationType?: 'fadeInUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
}

export function Card({ 
  children, 
  className = '', 
  hover = false, 
  onClick, 
  style,
  animationDelay = 0,
  animationType = 'fadeInUp'
}: CardProps) {
  const animationVariants = {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.5, delay: animationDelay, ease: "easeOut" }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: { duration: 0.3, delay: animationDelay, ease: "easeOut" }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
      transition: { duration: 0.4, delay: animationDelay, ease: "easeOut" }
    },
    slideInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.4, delay: animationDelay, ease: "easeOut" }
    }
  };

  const selectedAnimation = animationVariants[animationType];

  return (
    <motion.div 
      variants={selectedAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={hover || onClick ? { 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={onClick ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      className={`
        card-zambian rounded-xl
        ${hover ? 'hover:scale-[1.02] cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
        ${className}
      `}
      onClick={onClick}
      style={{
        background: className?.includes('gradient') 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : className?.includes('subject-card')
          ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)'
          : className?.includes('progress-card')
          ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
          : undefined,
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`px-6 py-4 border-b border-gray-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`px-6 py-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}