import React, { useState, useEffect } from 'react';
import { GradeSelector } from '../components/lam/GradeSelector';
import { SubjectSelector } from '../components/lam/SubjectSelector';
import { TopicSelector } from '../components/lam/TopicSelector';
import { GenerateLessonButton } from '../components/lam/GenerateLessonButton';
import { LessonPreviewModal } from '../components/lam/LessonPreviewModal';
import { QuizPreview } from '../components/lam/QuizPreview';
import { lamService } from '../services/lamService';
import { Grade, Subject, Topic, Lesson, Question } from '../types/lam';

interface LAMGeneratorPageProps {
  // Add any props if needed
}

export default function LAMGeneratorPage({}: LAMGeneratorPageProps) {
  // State management
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset subject and topic when grade changes
  useEffect(() => {
    if (selectedGrade) {
      setSelectedSubject(null);
      setSelectedTopic(null);
    }
  }, [selectedGrade]);

  // Reset topic when subject changes
  useEffect(() => {
    if (selectedSubject) {
      setSelectedTopic(null);
    }
  }, [selectedSubject]);

  // Clear generated content when selections change
  useEffect(() => {
    setGeneratedLesson(null);
    setGeneratedQuiz([]);
    setError(null);
  }, [selectedGrade, selectedSubject, selectedTopic]);

  const handleGenerateContent = async () => {
    if (!selectedTopic) {
      setError('Please select a topic first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate AI content for the selected topic
      const result = await fetchGeneratedLesson(selectedTopic.id, selectedTopic.name);
      setGeneratedLesson(result.lesson);
      setGeneratedQuiz(result.questions);
      setShowPreviewModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToCurriculum = async () => {
    if (!generatedLesson || !selectedTopic) return;

    setIsLoading(true);
    try {
      // Save lesson
      const savedLesson = await lamService.createLesson({
        ...generatedLesson,
        topic_id: selectedTopic.id
      });

      // Save questions
      const savedQuestions = await Promise.all(
        generatedQuiz.map(question => 
          lamService.createQuestion({
            ...question,
            lesson_id: savedLesson.id
          })
        )
      );

      // Close modal and show success
      setShowPreviewModal(false);
      setGeneratedLesson(null);
      setGeneratedQuiz([]);
      // You can add a toast notification here
      alert('Lesson and quiz saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Assistance Module
          </h1>
          <p className="text-gray-600">
            Generate AI-powered lessons and quizzes for your curriculum
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Selection Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GradeSelector
              selectedGrade={selectedGrade}
              onGradeChange={setSelectedGrade}
            />
            <SubjectSelector
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              selectedGrade={selectedGrade}
            />
            <TopicSelector
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              selectedGrade={selectedGrade}
              selectedSubject={selectedSubject}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mb-8">
            <GenerateLessonButton
              onGenerate={handleGenerateContent}
              isLoading={isLoading}
              disabled={!selectedTopic}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Generated Content Preview */}
          {generatedLesson && (
            <div className="space-y-6">
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Generated Content Preview
                </h2>
                
                {/* Lesson Preview */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Lesson: {generatedLesson.title}
                  </h3>
                  <div className="prose max-w-none bg-gray-50 p-4 rounded-md">
                    <div dangerouslySetInnerHTML={{ __html: generatedLesson.content }} />
                  </div>
                </div>

                {/* Quiz Preview */}
                {generatedQuiz.length > 0 && (
                  <QuizPreview questions={generatedQuiz} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {showPreviewModal && generatedLesson && (
          <LessonPreviewModal
            lesson={generatedLesson}
            questions={generatedQuiz}
            onSave={handleSaveToCurriculum}
            onCancel={() => setShowPreviewModal(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

// Mock AI generation function - replace with actual AI API call
async function fetchGeneratedLesson(topicId: string, topicName: string = 'Selected Topic'): Promise<{
  lesson: Lesson;
  questions: Question[];
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate dynamic content based on topic name
  const mockLesson: Lesson = {
    id: `lesson-${Date.now()}`,
    title: `Introduction to ${topicName}`,
    content: `
      <h2>Introduction to ${topicName}</h2>
      <p>This lesson covers the fundamental concepts of ${topicName}.</p>
      <h3>Learning Objectives:</h3>
      <ul>
        <li>Understand the basic principles of ${topicName}</li>
        <li>Apply key concepts in practical scenarios</li>
        <li>Develop problem-solving skills</li>
      </ul>
      <h3>Key Concepts:</h3>
      <p>Throughout this lesson, you will learn important concepts that form the foundation of ${topicName}.</p>
      <h3>Practice Examples:</h3>
      <p>We will work through several examples to reinforce your understanding.</p>
    `,
    topic_id: topicId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const mockQuestions: Question[] = [
    {
      id: `question-${Date.now()}-1`,
      lesson_id: mockLesson.id,
      question_text: `What is the main focus of ${topicName}?`,
      question_type: 'multiple_choice',
      options: [
        'Basic mathematical operations',
        'Understanding fundamental concepts and principles',
        'Memorizing formulas only',
        'Advanced theoretical applications'
      ],
      correct_answer: 'Understanding fundamental concepts and principles',
      explanation: `${topicName} focuses on understanding fundamental concepts and applying them to solve problems.`,
      difficulty_level: 'beginner',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: `question-${Date.now()}-2`,
      lesson_id: mockLesson.id,
      question_text: `Which of the following is most important when studying ${topicName}?`,
      question_type: 'multiple_choice',
      options: [
        'Speed of calculation',
        'Understanding underlying principles',
        'Memorizing all examples',
        'Using complex terminology'
      ],
      correct_answer: 'Understanding underlying principles',
      explanation: `The key to mastering ${topicName} is understanding the underlying principles rather than just memorizing examples.`,
      difficulty_level: 'intermediate',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: `question-${Date.now()}-3`,
      lesson_id: mockLesson.id,
      question_text: `True or False: ${topicName} concepts can be applied in real-world scenarios.`,
      question_type: 'true_false',
      options: ['True', 'False'],
      correct_answer: 'True',
      explanation: `${topicName} concepts have many practical applications and can be used to solve real-world problems.`,
      difficulty_level: 'beginner',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return {
    lesson: mockLesson,
    questions: mockQuestions
  };
} 