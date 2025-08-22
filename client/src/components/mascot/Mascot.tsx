import React, { useState, useEffect } from 'react';
import { Lightbulb, Star, Trophy, Target, Heart, HelpCircle, X } from 'lucide-react';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'encouraging' | 'proud' | 'wise' | 'excited' | 'helpful';
  message?: string;
  showBubble?: boolean;
  animated?: boolean;
  className?: string;
  helpText?: string;
  showHelp?: boolean;
  onHelpClick?: () => void;
}

export function Mascot({ 
  size = 'md',
  mood = 'happy',
  message,
  showBubble = true,
  animated = true,
  className = "",
  helpText,
  showHelp = false,
  onHelpClick
}: MascotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: { eagle: 'w-8 h-8', bubble: 'text-xs p-2', container: 'w-16' },
    md: { eagle: 'w-12 h-12', bubble: 'text-sm p-3', container: 'w-20' },
    lg: { eagle: 'w-16 h-16', bubble: 'text-base p-4', container: 'w-24' },
    xl: { eagle: 'w-20 h-20', bubble: 'text-lg p-5', container: 'w-32' }
  };

  // Mood-based messages
  const moodMessages = {
    happy: [
      "You're doing great! Keep learning!",
      "Every question makes you stronger!",
      "Learning is like flying - the more you practice, the higher you soar!"
    ],
    encouraging: [
      "Don't give up! Eagles never quit!",
      "Every expert was once a beginner!",
      "You've got this! I believe in you!"
    ],
    proud: [
      "Amazing work! You're soaring to new heights!",
      "I'm proud of your progress!",
      "You're becoming a true learning eagle!"
    ],
    wise: [
      "Remember: Knowledge is power, but wisdom is knowing how to use it.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Success is not final, failure is not fatal - it's courage that counts!"
    ],
    excited: [
      "This is so exciting! Let's learn together!",
      "Ready for an adventure in learning?",
      "Learning is the best treasure you can find!"
    ],
    helpful: [
      "Need help? I'm here to guide you!",
      "Let me share some wisdom with you!",
      "Here's a tip from high above the clouds..."
    ]
  };

  // Get random message based on mood if no specific message provided
  const getMessage = () => {
    if (message) return message;
    const messages = moodMessages[mood];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mood icon component
  const MoodIcon = () => {
    const iconProps = { className: "h-4 w-4 text-amber-600" };
    switch (mood) {
      case 'proud':
        return <Trophy {...iconProps} />;
      case 'wise':
        return <Lightbulb {...iconProps} />;
      case 'excited':
        return <Star {...iconProps} />;
      case 'encouraging':
        return <Heart {...iconProps} />;
      case 'helpful':
        return <HelpCircle {...iconProps} />;
      default:
        return <Target {...iconProps} />;
    }
  };

  return (
    <div className={`relative ${sizeConfig[size].container} ${className}`}>
      {/* Main Mascot Logo */}
      <div 
        className={`
          ${sizeConfig[size].eagle}
          mascot-logo
          ${animated ? 'animate-float' : ''}
          ${isVisible ? 'animate-scale-in' : 'opacity-0'}
          cursor-pointer
          select-none
          transition-all duration-300
        `}
        onClick={() => {
          const mascot = document.querySelector('.mascot-logo');
          mascot?.classList.add('animate-pulse');
          setTimeout(() => mascot?.classList.remove('animate-pulse'), 600);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 768 768" 
          className="w-full h-full"
          aria-label="Chisomo the Eagle Mascot"
        >
          <defs>
            <clipPath id="eagle-clip">
              <path d="M 351.109375 297.230469 L 392.703125 297.230469 L 392.703125 338.824219 L 351.109375 338.824219 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#eagle-clip)">
            <path 
              fill="#ffffff" 
              d="M 235.164062 232.480469 L 524.769531 232.480469 L 524.769531 412.429688 L 235.164062 412.429688 Z" 
            />
            <path 
              fill="#ffffff" 
              d="M 276.316406 372.296875 L 565.917969 372.296875 L 565.917969 552.242188 L 276.316406 552.242188 Z" 
            />
            <path 
              fill="#ffffff" 
              d="M 502.800781 176.359375 L 579.320312 421.089844 L 427.621094 468.523438 L 351.101562 223.789062 Z" 
            />
            <path 
              fill="#ffffff" 
              d="M 504.066406 499.136719 L 504.066406 605.351562 L 239.777344 605.351562 L 239.777344 499.136719 Z" 
            />
            <path 
              fill="#ffffff" 
              d="M 380.070312 658.566406 L 273.855469 658.566406 L 273.855469 394.277344 L 380.070312 394.277344 Z" 
            />
          </g>
        </svg>
      </div>

      {/* Speech Bubble */}
      {showBubble && getMessage() && (
        <div 
          className={`
            absolute top-0 left-full ml-4 z-10
            mascot-speech-bubble
            ${sizeConfig[size].bubble}
            ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}
            max-w-xs
            transition-all duration-500
          `}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-start gap-2">
            <MoodIcon />
            <div>
              <p className="text-amber-900 font-medium leading-relaxed">
                {getMessage()}
              </p>
              <div className="text-xs text-amber-700 mt-1 font-semibold">
                - Chisomo the Eagle
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Tooltip */}
      {showHelp && helpText && (
        <div 
          className={`
            absolute top-0 left-full ml-4 z-20
            mascot-help-tooltip
            ${sizeConfig[size].bubble}
            ${showTooltip ? 'opacity-100' : 'opacity-0'}
            max-w-xs
            transition-all duration-300
          `}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {helpText}
                </p>
                {onHelpClick && (
                  <button
                    onClick={onHelpClick}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2"
                  >
                    Learn more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sparkles effect for excited mood */}
      {mood === 'excited' && animated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-2 -right-1 text-yellow-400 animate-ping">✨</div>
          <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute top-1/2 -right-2 text-yellow-400 animate-ping" style={{ animationDelay: '1s' }}>💫</div>
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const MascotPresets = {
  Welcome: (props: Partial<MascotProps>) => (
    <Mascot 
      mood="excited" 
      message="Welcome to SomaSmart! Ready to soar to new heights?" 
      size="lg"
      {...props} 
    />
  ),
  
  GameComplete: (props: Partial<MascotProps>) => (
    <Mascot 
      mood="proud" 
      message="Outstanding! You've mastered this challenge like a true eagle!" 
      size="md"
      {...props} 
    />
  ),
  
  Encouragement: (props: Partial<MascotProps>) => (
    <Mascot 
      mood="encouraging" 
      message="Don't worry about mistakes - that's how eagles learn to fly!" 
      size="md"
      {...props} 
    />
  ),
  
  Wisdom: (props: Partial<MascotProps>) => (
    <Mascot 
      mood="wise" 
      message="Remember: The eagle that soars highest has learned from every wind." 
      size="md"
      {...props} 
    />
  ),
  
  Help: (props: Partial<MascotProps>) => (
    <Mascot 
      mood="helpful" 
      message="Need help? I'm here to guide you!" 
      size="sm"
      showHelp={true}
      {...props} 
    />
  )
};

// Hook for managing mascot state across the app
export function useMascot() {
  const [mood, setMood] = useState<MascotProps['mood']>('happy');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showMascot = (newMood: MascotProps['mood'], newMessage: string, duration = 5000) => {
    setMood(newMood);
    setMessage(newMessage);
    setIsVisible(true);
    
    if (duration > 0) {
      setTimeout(() => setIsVisible(false), duration);
    }
  };

  const hideMascot = () => {
    setIsVisible(false);
  };

  return {
    mood,
    message,
    isVisible,
    showMascot,
    hideMascot
  };
} 