import React, { useEffect, useState } from 'react';
import { lamService } from '../services/lamService';
import { Grade, Subject, Topic, Lesson, Question } from '../types/lam';

export default function LAMTest() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all data in parallel
      const [gradesData, subjectsData, topicsData] = await Promise.all([
        lamService.getGrades(),
        lamService.getSubjects(),
        lamService.getTopics()
      ]);

      setGrades(gradesData);
      setSubjects(subjectsData);
      setTopics(topicsData);

      // If we have topics, load lessons and questions for the first topic
      if (topicsData.length > 0) {
        const firstTopic = topicsData[0];
        const [lessonsData, questionsData] = await Promise.all([
          lamService.getLessonsByTopic(firstTopic.id),
          lamService.getQuestionsByTopic(firstTopic.id)
        ]);
        setLessons(lessonsData);
        setQuestions(questionsData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading LAM data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">LAM Database Test</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3">Loading LAM data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">LAM Database Test</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold">Error Loading Data</h3>
          <p>{error}</p>
          <button
            onClick={loadData}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">LAM Database Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Grades */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Grades ({grades.length})</h3>
          <div className="space-y-2">
            {grades.map((grade) => (
              <div key={grade.id} className="p-2 bg-gray-50 rounded text-sm">
                {grade.name}
              </div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Subjects ({subjects.length})</h3>
          <div className="space-y-2">
            {subjects.map((subject) => (
              <div key={subject.id} className="p-2 bg-gray-50 rounded text-sm">
                {subject.name}
              </div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Topics ({topics.length})</h3>
          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id} className="p-2 bg-gray-50 rounded text-sm">
                <div className="font-medium">{topic.name}</div>
                <div className="text-xs text-gray-500">
                  {/* When join selects are used Topic includes grade/subject aliases */}
                  {(topic as any).grade?.name} • {(topic as any).subject?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons and Questions */}
      {topics.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lessons */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-3">Lessons ({lessons.length})</h3>
            {lessons.length > 0 ? (
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">{lesson.title}</div>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(lesson.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No lessons found for this topic.</p>
            )}
          </div>

          {/* Questions */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-3">Questions ({questions.length})</h3>
            {questions.length > 0 ? (
              <div className="space-y-2">
                {questions.map((question) => (
                  <div key={question.id} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">{question.question_text}</div>
                    <div className="text-xs text-gray-500">
                      Type: {question.question_type} • Difficulty: {question.difficulty_level}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No questions found for this topic.</p>
            )}
          </div>
        </div>
      )}

      {/* Database Status */}
      <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <h3 className="font-bold">✅ LAM Database Connected Successfully!</h3>
        <p className="text-sm mt-1">
          Grades: {grades.length} | Subjects: {subjects.length} | Topics: {topics.length} | 
          Lessons: {lessons.length} | Questions: {questions.length}
        </p>
      </div>
    </div>
  );
} 