
import React from 'react';
import { Question } from '../../types/lam';

interface QuizPreviewProps {
  questions: Question[];
}

export function QuizPreview({ questions }: QuizPreviewProps) {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Quiz Preview ({questions.length} questions)
      </h3>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {question.question_type}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {question.difficulty_level}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">{question.question_text}</p>
            
            {question.options && question.options.length > 0 && (
              <div className="space-y-2 mb-3">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className={`p-2 rounded border text-sm ${
                      option === question.correct_answer 
                        ? 'bg-green-100 border-green-300 text-green-800 font-medium'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + optionIndex)}:
                    </span>
                    {option}
                    {option === question.correct_answer && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {question.explanation && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Explanation:</span> {question.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
