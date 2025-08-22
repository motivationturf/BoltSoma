import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AnimatedFormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  success?: string;
  isFocused?: boolean;
  className?: string;
}

export function AnimatedFormField({
  label,
  children,
  error,
  success,
  isFocused = false,
  className = ''
}: AnimatedFormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-2 ${className}`}
    >
      <motion.label
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </motion.label>
      
      <motion.div
        animate={isFocused ? {
          scale: 1.01,
          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
        } : {
          scale: 1,
          boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)"
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center space-x-2 text-red-600 text-sm"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center space-x-2 text-green-600 text-sm"
          >
            <CheckCircle className="h-4 w-4" />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Animated Input with floating label
interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  className?: string;
}

export function FloatingLabelInput({
  label,
  value,
  onChange,
  type = 'text',
  error,
  className = ''
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={isFocused || hasValue ? {
          y: -20,
          scale: 0.85,
          color: isFocused ? "#3b82f6" : "#6b7280"
        } : {
          y: 0,
          scale: 1,
          color: "#6b7280"
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-3 top-3 pointer-events-none bg-white px-1"
      >
        {label}
      </motion.div>
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-3 py-3 border rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-300' : 'border-gray-300'}
        `}
      />
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-600 text-sm mt-1"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 