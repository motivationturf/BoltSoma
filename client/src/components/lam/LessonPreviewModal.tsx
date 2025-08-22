import React from 'react';
import { Lesson, Question } from '../../types/lam';

interface LessonPreviewModalProps {
  lesson: Lesson;
  questions: Question[];
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function LessonPreviewModal({ lesson, questions, onSave, onCancel, isLoading }: LessonPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Preview Generated Content</h2>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          {/* Lesson Preview */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Lesson: {lesson.title}
            </h3>
            <div className="prose max-w-none bg-gray-50 p-4 rounded-lg border">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          </div>

          {/* Quiz Preview */}
          {questions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quiz ({questions.length} questions)
              </h3>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
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
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}: {option}
                            {option === question.correct_answer && (
                              <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
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
          )}
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save to Curriculum'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}