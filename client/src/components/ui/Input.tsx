import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  animationDelay?: number;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
  label,
  error,
  helperText,
  type,
  className = '',
  animationDelay = 0,
  ...props
  }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: animationDelay }}
      className="space-y-1"
    >
      {label && (
        <motion.label 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: animationDelay + 0.1 }}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </motion.label>
      )}
      <div className="relative">
        {/* framer-motion typing is looser at runtime; assert compatibility for input element */}
        {/* @ts-expect-error HTMLMotionProps typing mismatch with InputHTMLAttributes */}
        <motion.input
            ref={ref}
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.01 }}
          className={`
            block w-full px-3 py-2 border rounded-xl shadow-sm transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <AnimatePresence mode="wait">
              {showPassword ? (
                <motion.div
                  key="eye-off"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <EyeOff className="h-4 w-4 text-gray-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="eye"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Eye className="h-4 w-4 text-gray-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-gray-500"
          >
            {helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
);

Input.displayName = 'Input';