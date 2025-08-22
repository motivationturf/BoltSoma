import React from 'react';

interface TopicPreviewCardProps {
  topic: { 
    id: string; 
    name: string; 
    curriculum: string;
    subjectId?: string;
    grade?: string | number;
  };
  onViewLesson: (topicId: string) => void;
  onCreateChallenge: (topicId: string) => void;
  onPresentLesson: (topicId: string) => void;
}

export const TopicPreviewCard: React.FC<TopicPreviewCardProps> = ({ 
  topic, 
  onViewLesson, 
  onCreateChallenge,
  onPresentLesson 
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-green-200 group">
    {/* Header with topic name and curriculum badge */}
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="font-bold text-xl text-gray-800 group-hover:text-green-700 transition-colors">
          {topic.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold border border-green-200">
            {topic.curriculum}
          </span>
          {topic.grade && (
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold border border-blue-200">
              {typeof topic.grade === 'string' ? topic.grade : `Grade ${topic.grade}`}
            </span>
          )}
        </div>
      </div>
      
      {/* Quick action indicator */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>

    {/* Action buttons with improved styling */}
    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
      <button
        className="flex-1 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        onClick={() => onViewLesson(topic.id)}
        title="View lesson content and materials"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View Lesson
      </button>
      
      <button
        className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        onClick={() => onCreateChallenge(topic.id)}
        title="Create a classroom challenge"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create Challenge
      </button>
      
      <button
        className="flex-1 px-4 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        onClick={() => onPresentLesson(topic.id)}
        title="Present lesson in fullscreen mode"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
        </svg>
        Present
      </button>
    </div>

    {/* Subtle hover effect indicator */}
    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-300 transition-all duration-300 pointer-events-none"></div>
  </div>
); 