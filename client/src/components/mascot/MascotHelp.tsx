import React, { useState } from 'react';
import { HelpCircle, X, Lightbulb, BookOpen, Target } from 'lucide-react';
import { Mascot } from './Mascot';

interface MascotHelpProps {
  title?: string;
  content: string;
  type?: 'tip' | 'explanation' | 'guidance' | 'nugget';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClose?: () => void;
}

export function MascotHelp({ 
  title,
  content,
  type = 'tip',
  size = 'md',
  className = "",
  onClose
}: MascotHelpProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getIcon = () => {
    switch (type) {
      case 'explanation':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'guidance':
        return <Target className="h-4 w-4 text-green-600" />;
      case 'nugget':
        return <Lightbulb className="h-4 w-4 text-amber-600" />;
      default:
        return <HelpCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'explanation':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'guidance':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'nugget':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-start space-x-3">
        <Mascot 
          size={size} 
          mood="helpful" 
          showBubble={false}
          className="flex-shrink-0"
        />
        
        <div className={`flex-1 rounded-lg border p-4 ${getColorClasses()}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              {getIcon()}
              <div className="flex-1">
                {title && (
                  <h4 className="font-semibold mb-2">{title}</h4>
                )}
                <p className="text-sm leading-relaxed">{content}</p>
              </div>
            </div>
            
            {onClose && (
              <button
                onClick={handleClose}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close help message"
                title="Close help message"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Preset help components
export const MascotHelpPresets = {
  ConceptExplanation: ({ content, ...props }: { content: string } & Partial<MascotHelpProps>) => (
    <MascotHelp
      title="Concept Explanation"
      content={content}
      type="explanation"
      {...props}
    />
  ),
  
  LearningTip: ({ content, ...props }: { content: string } & Partial<MascotHelpProps>) => (
    <MascotHelp
      title="Learning Tip"
      content={content}
      type="tip"
      {...props}
    />
  ),
  
  StudyGuidance: ({ content, ...props }: { content: string } & Partial<MascotHelpProps>) => (
    <MascotHelp
      title="Study Guidance"
      content={content}
      type="guidance"
      {...props}
    />
  ),
  
  KnowledgeNugget: ({ content, ...props }: { content: string } & Partial<MascotHelpProps>) => (
    <MascotHelp
      title="Knowledge Nugget"
      content={content}
      type="nugget"
      {...props}
    />
  )
}; 