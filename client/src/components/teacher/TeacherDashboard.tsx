import React, { useState, useContext, useEffect, useRef } from 'react';
import { GradeSelector } from './GradeSelector';
import { SubjectSelector } from './SubjectSelector';
import { TopicPreviewCard } from './TopicPreviewCard';
import { UserContext } from '../../context/UserContext';
// remove duplicate import of useEffect
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';

// Toast component for microinteraction feedback
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <span role="img" aria-label="Celebration">🎉</span>
      <span>{message}</span>
    </div>
  );
}

const TABS = [
  { id: 'home', label: 'Dashboard Home' },
  { id: 'curriculum', label: 'Curriculum & Lessons' },
  { id: 'challenges', label: 'My Challenges' },
  { id: 'progress', label: 'Student Progress (Coming Soon)' },
];

// Mock data
const SUBJECTS = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  { id: 'cs', name: 'Computer Studies' },
  { id: 're', name: 'Religious Education' },
];

const TOPICS = [
  { id: 'algebra', name: 'Algebra', subjectId: 'math', grade: 'FORM1', curriculum: 'Zambian' },
  { id: 'geometry', name: 'Geometry', subjectId: 'math', grade: 9, curriculum: 'Zambian' },
  { id: 'biology', name: 'Biology', subjectId: 'science', grade: 'FORM1', curriculum: 'Zambian' },
  { id: 'chemistry', name: 'Chemistry', subjectId: 'science', grade: 10, curriculum: 'Zambian' },
  { id: 'programming', name: 'Programming Basics', subjectId: 'cs', grade: 'FORM1', curriculum: 'Zambian' },
  { id: 'ethics', name: 'Ethics', subjectId: 're', grade: 9, curriculum: 'Zambian' },
  // Add more topics as needed
];

const LESSONS: Record<string, { title: string; content: string }> = {
  algebra: {
    title: 'Algebra - FORM1',
    content: 'This is the lesson content for Algebra (FORM1). Includes examples, explanations, and diagrams.',
  },
  geometry: {
    title: 'Geometry - Grade 9',
    content: 'This is the lesson content for Geometry (Grade 9).',
  },
  biology: {
    title: 'Biology - FORM1',
    content: 'This is the lesson content for Biology (FORM1).',
  },
  chemistry: {
    title: 'Chemistry - Grade 10',
    content: 'This is the lesson content for Chemistry (Grade 10).',
  },
  programming: {
    title: 'Programming Basics - FORM1',
    content: 'This is the lesson content for Programming Basics (FORM1).',
  },
  ethics: {
    title: 'Ethics - Grade 9',
    content: 'This is the lesson content for Ethics (Grade 9).',
  },
};

function downloadLessonAsPDF({ lesson, grade, subject, topic }: { lesson: { title: string; content: string }, grade: string | number, subject: string, topic: string }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  // SomaSmart branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SomaSmart EduHub', 40, 60);
  // Logo (optional, if available as base64)
  // doc.addImage(logoBase64, 'PNG', 400, 30, 120, 40);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(`Grade: ${grade}    Subject: ${subject}`, 40, 90);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(lesson.title, 40, 120);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  // Split content into paragraphs
  const paragraphs = lesson.content.split(/\n{2,}/g).map(s => s.trim()).filter(Boolean);
  let y = 150;
  paragraphs.forEach((para, idx) => {
    const lines = doc.splitTextToSize(para, 500);
    if (y + lines.length * 18 > 780) {
      doc.addPage();
      y = 60;
    }
    doc.text(lines, 40, y);
    y += lines.length * 18 + 18;
  });
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text('Generated with SomaSmart EduHub', 40, 820);
  // Download
  const safeTopic = topic.replace(/[^a-zA-Z0-9]/g, '_');
  const safeSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
  const safeGrade = typeof grade === 'string' ? grade : `Grade${grade}`;
  doc.save(`${safeGrade}_${safeSubject}_${safeTopic}.pdf`);
}

function downloadLessonAsPPTX({ lesson, grade, subject, topic }: { lesson: { title: string; content: string }, grade: string | number, subject: string, topic: string }) {
  const pptx = new PptxGenJS();
  // SomaSmart branding colors
  const brandColor = '008000'; // green
  const titleColor = '003300';
  // Title slide
  pptx.addSlide().addText([
    { text: 'SomaSmart EduHub', options: { fontSize: 28, bold: true, color: brandColor, align: 'center' } },
    { text: `\n${lesson.title}`, options: { fontSize: 22, bold: true, color: titleColor, align: 'center' } },
    { text: `\nGrade: ${grade}    Subject: ${subject}`, options: { fontSize: 18, color: '333333', align: 'center' } },
    { text: '\n', options: { fontSize: 10 } },
    { text: 'Generated with SomaSmart EduHub', options: { fontSize: 12, italic: true, color: '888888', align: 'center' } },
  ], { x: 0.5, y: 1.5, w: 8.5, h: 3, align: 'center' });
  // Content slides
  const paragraphs = lesson.content.split(/\n{2,}/g).map(s => s.trim()).filter(Boolean);
  paragraphs.forEach((para, idx) => {
    pptx.addSlide()
      .addText(lesson.title, { x: 0.5, y: 0.3, fontSize: 20, bold: true, color: brandColor, w: 8.5, h: 0.7, align: 'center' })
      .addText(para.split('\n').map(line => ({ text: line, options: { bullet: true, fontSize: 16, color: '222222' } })),
        { x: 0.7, y: 1.2, w: 8, h: 4, fontSize: 16, color: '222222', bullet: true });
  });
  // Footer on all slides
  // Add a footer on the last generated slide as an example (pptxgenjs public API doesn't expose slides array)
  const slide = pptx.addSlide();
  slide.addText('SomaSmart EduHub', { x: 0.5, y: 6.7, fontSize: 10, color: brandColor, italic: true });
  // Download
  const safeTopic = topic.replace(/[^a-zA-Z0-9]/g, '_');
  const safeSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
  const safeGrade = typeof grade === 'string' ? grade : `Grade${grade}`;
  pptx.writeFile({ fileName: `${safeGrade}_${safeSubject}_${safeTopic}.pptx` });
}

function LessonViewer({ topicId, onClose, onDownloadPDF, onDownloadPPTX }: { topicId: string; onClose: () => void; onDownloadPDF?: () => void; onDownloadPPTX?: () => void }) {
  const lesson = LESSONS[topicId];
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(lesson?.content || '');
  const [editedTitle, setEditedTitle] = useState(lesson?.title || '');
  
  if (!lesson) return null;

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Lesson updated! (mock)');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(lesson.content);
    setEditedTitle(lesson.title);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-800">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                  placeholder="Enter lesson title..."
                  aria-label="Lesson title"
                />
              ) : (
                lesson.title
              )}
            </h3>
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
              Lesson Content
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit Lesson
              </button>
            )}
            <button
              className="text-gray-400 hover:text-gray-700 text-2xl transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Lesson Content
                </label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
                  rows={15}
                  placeholder="Enter lesson content..."
                />
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Tip:</strong> Use double line breaks to create new slides for presentations.</p>
                <p><strong>Formatting:</strong> You can use basic markdown-like syntax for emphasis.</p>
              </div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                {lesson.content}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                <strong>Actions:</strong> Use this lesson for presentations, downloads, or classroom activities
              </span>
            </div>
            
            <div className="flex gap-3">
              <button 
                className="px-6 py-3 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                onClick={() => {
                  // This would open the presentation modal
                  onClose();
                  // In a real app, you'd trigger the presentation mode here
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
                Use as Presentation
              </button>
              
              <button
                className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                onClick={onDownloadPDF}
                aria-label="Download as PDF"
                title="Download as PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
              
              <button
                className="px-6 py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                onClick={onDownloadPPTX}
                aria-label="Export as Presentation"
                title="Export as Presentation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PPTX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChallengeCreator({ topicId, onClose }: { topicId: string; onClose: () => void }) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('MCQ');
  const [timer, setTimer] = useState(60);
  const [difficulty, setDifficulty] = useState('medium');
  const [challengeName, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!challengeName.trim()) {
      alert('Please enter a challenge name');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Challenge created (mock)!');
      onClose();
    }, 1000);
  };

  React.useEffect(() => {
    if (!topicId) {
      setNumQuestions(5);
      setQuestionType('MCQ');
      setTimer(60);
      setDifficulty('medium');
      setChallengeName('');
      setDescription('');
      setSaving(false);
    }
  }, [topicId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Challenge</h3>
          <p className="text-gray-600">Configure your classroom challenge with custom settings</p>
        </div>

        <div className="space-y-6">
          {/* Challenge Name */}
          <div>
            <label htmlFor="challenge-name" className="block text-sm font-semibold mb-2 text-gray-700">
              Challenge Name *
            </label>
            <input
              id="challenge-name"
              type="text"
              value={challengeName}
              onChange={e => setChallengeName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
              placeholder="Enter challenge name..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2 text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
              rows={3}
              placeholder="Optional description for students..."
            />
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Number of Questions */}
            <div>
              <label htmlFor="num-questions" className="block text-sm font-semibold mb-2 text-gray-700">
                Number of Questions
              </label>
              <input
                id="num-questions"
                type="number"
                min={1}
                max={50}
                value={numQuestions}
                onChange={e => setNumQuestions(Number(e.target.value))}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Question Type */}
            <div>
              <label htmlFor="question-type" className="block text-sm font-semibold mb-2 text-gray-700">
                Question Type
              </label>
              <select
                id="question-type"
                value={questionType}
                onChange={e => setQuestionType(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
              >
                <option value="MCQ">Multiple Choice (MCQ)</option>
                <option value="Fill">Fill-in-the-Blank</option>
                <option value="Jumble">Jumble</option>
                <option value="TrueFalse">True/False</option>
                <option value="Matching">Matching</option>
              </select>
            </div>

            {/* Timer */}
            <div>
              <label htmlFor="timer" className="block text-sm font-semibold mb-2 text-gray-700">
                Timer (seconds per question)
              </label>
              <input
                id="timer"
                type="number"
                min={10}
                max={600}
                value={timer}
                onChange={e => setTimer(Number(e.target.value))}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-semibold mb-2 text-gray-700">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition-colors"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Advanced Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                <span className="text-sm text-gray-700">Allow multiple attempts</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                <span className="text-sm text-gray-700">Show correct answers after</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                <span className="text-sm text-gray-700">Randomize question order</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                <span className="text-sm text-gray-700">Enable hints</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            className="flex-1 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={saving || !challengeName.trim()}
          >
            {saving ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </div>
            ) : (
              'Create Challenge'
            )}
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-all duration-200 disabled:opacity-50"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PresentationModal({ lesson, onClose, onDownloadPDF, onDownloadPPTX }: { lesson: { title: string; content: string }; onClose: () => void; onDownloadPDF?: () => void; onDownloadPPTX?: () => void }) {
  // Split content into pages (for demo, split by paragraphs)
  const pages = lesson.content.split(/\n{2,}/g).map(s => s.trim()).filter(Boolean);
  const [page, setPage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setPage(p => Math.min(p + 1, pages.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setPage(p => Math.max(p - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [pages.length, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      tabIndex={-1}
      ref={modalRef}
      aria-modal="true"
      role="dialog"
      style={{ outline: 'none' }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center relative" style={{ minHeight: 400 }}>
          <button
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
            aria-label="Exit Presentation"
            title="Exit Presentation"
          >
            ×
          </button>
          <h2 className="text-3xl font-bold mb-6 text-green-800 text-center" style={{ fontSize: '2.5rem' }}>{lesson.title}</h2>
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="text-2xl md:text-3xl text-gray-900 leading-relaxed text-center" style={{ minHeight: 200 }}>
              {pages[page]}
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-8">
            <button
              className="px-6 py-3 rounded bg-green-700 text-white font-semibold text-lg hover:bg-green-800 transition disabled:opacity-50"
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              ◀ Previous
            </button>
            <span className="text-lg text-gray-700">Page {page + 1} of {pages.length}</span>
            <button
              className="px-6 py-3 rounded bg-green-700 text-white font-semibold text-lg hover:bg-green-800 transition disabled:opacity-50"
              onClick={() => setPage(p => Math.min(p + 1, pages.length - 1))}
              disabled={page === pages.length - 1}
              aria-label="Next Slide"
              title="Next Slide"
            >
              Next ▶
            </button>
            <button
              className="ml-6 px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
              onClick={onDownloadPDF}
              aria-label="Download as PDF"
              title="Download as PDF"
            >
              📥 Download as PDF
            </button>
            <button
              className="ml-2 px-4 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
              onClick={onDownloadPPTX}
              aria-label="Export as Presentation"
              title="Export as Presentation"
            >
              📊 Export as Presentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeacherDashboard() {
  // Enforce teacher-only access for dashboard features
  const { user } = React.useContext(UserContext);
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-700">Access Denied</h2>
          <p className="text-gray-700">You must be logged in as a teacher to access this page.</p>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showChallengeCreator, setShowChallengeCreator] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [challenges, setChallenges] = useState([
    {
      id: 'c1',
      topic: 'Algebra',
      subject: 'Mathematics',
      code: 'XJ92K',
      participants: 12,
      createdAt: '2024-06-10',
      analytics: { avgScore: 78, attempts: 15 },
    },
    {
      id: 'c2',
      topic: 'Biology',
      subject: 'Science',
      code: 'QW8PL',
      participants: 8,
      createdAt: '2024-06-09',
      analytics: { avgScore: 65, attempts: 10 },
    },
    // Add more mock challenges as needed
  ]);
  const [showToast, setShowToast] = useState(false);
  const [firstVisit, setFirstVisit] = useState(() => {
    // Mock: use localStorage to persist first-visit state
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('teacher_first_visit');
      if (!seen) {
        localStorage.setItem('teacher_first_visit', '1');
        return true;
      }
    }
    return false;
  });
  const [presentingLessonId, setPresentingLessonId] = useState<string | null>(null);

  // Filter topics by selected grade and subject
  const filteredTopics = TOPICS.filter(
    t =>
      (selectedGrade ? t.grade === selectedGrade : true) &&
      (selectedSubjectId ? t.subjectId === selectedSubjectId : true)
  );

  // Handlers
  const handleViewLesson = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const handleCreateChallenge = (topicId: string) => {
    setSelectedTopicId(topicId);
    setShowChallengeCreator(true);
  };

  const handleViewChallenge = (challengeId: string) => {
    // In a real app, this would open a detailed view of the challenge results
    alert(`Viewing results for challenge ${challengeId} (mock)`);
  };

  const handleEditChallenge = (challengeId: string) => {
    // In a real app, this would open an edit form for the challenge
    alert(`Editing challenge ${challengeId} (mock)`);
  };

  const handleDeleteChallenge = (challengeId: string) => {
    if (confirm('Are you sure you want to delete this challenge? This action cannot be undone.')) {
      setChallenges(challenges.filter(c => c.id !== challengeId));
    }
  };

  const handleDownloadPDF = (topicId: string) => {
    alert(`Downloading PDF for topic ${topicId} (mock)`);
  };

  const handleDownloadPPTX = (topicId: string) => {
    alert(`Downloading PPTX for topic ${topicId} (mock)`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm flex-shrink-0">
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-700">Teacher Dashboard</h1>
          <a
            href="https://somasmart.help/teacher-quickstart" // Placeholder help link
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-green-700 hover:text-green-900"
            title="Open Teacher Quickstart Guide"
            aria-label="Help"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeWidth="2" d="M12 16v-2m0-4h.01M12 8a4 4 0 1 1 0 8" /></svg>
          </a>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`text-left px-4 py-2 rounded-lg transition-colors font-medium ${activeTab === tab.id ? 'bg-green-100 text-green-800' : 'hover:bg-green-50 text-gray-700'}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {firstVisit && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded flex items-center gap-3 animate-fade-in">
            <span role="img" aria-label="Wave" className="text-2xl">👋</span>
            <div>
              <div className="font-semibold text-green-800">Welcome, {user.firstName || 'Teacher'}!</div>
              <div className="text-green-700 text-sm">Tip: Use the sidebar to browse curriculum, view lessons, and create classroom challenges. Click the <span className='font-bold'>?</span> for a quickstart guide.</div>
            </div>
          </div>
        )}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.firstName?.charAt(0) || 'T'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user.firstName || 'Teacher'}!</h2>
                  <p className="text-gray-600">Ready to inspire your students today?</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Lessons</p>
                    <p className="text-2xl font-bold text-gray-800">{filteredTopics.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Challenges</p>
                    <p className="text-2xl font-bold text-gray-800">{challenges.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-800">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                    <p className="text-2xl font-bold text-gray-800">78%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Browse Curriculum</p>
                        <p className="text-sm text-gray-600">View and edit lesson content</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('challenges')}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Create Challenge</p>
                        <p className="text-sm text-gray-600">Set up classroom activities</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('progress')}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">View Progress</p>
                        <p className="text-sm text-gray-600">Monitor student performance</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {challenges.slice(0, 3).map((challenge, index) => (
                    <div key={challenge.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          Challenge: {challenge.topic}
                        </p>
                        <p className="text-xs text-gray-600">
                          {challenge.participants} participants • {challenge.analytics.avgScore}% avg
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{challenge.createdAt}</span>
                    </div>
                  ))}
                  {challenges.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Teaching Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">💡</span>
                  <p className="text-gray-700">Use the presentation mode for engaging classroom lessons</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">📊</span>
                  <p className="text-gray-700">Create challenges to assess student understanding</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">📚</span>
                  <p className="text-gray-700">Customize lesson content to match your teaching style</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Header with Search and Filters */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Curriculum Browser</h2>
                  <p className="text-gray-600">Browse and manage lesson content by subject and grade</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      showFilters 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                      </svg>
                      Filters
                      {showFilters && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Active</span>}
                    </div>
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <SubjectSelector
                        selectedSubject={selectedSubject}
                        onSubjectChange={setSelectedSubject}
                        subjects={SUBJECTS}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                      <GradeSelector
                        selectedGrade={selectedGrade}
                        onGradeChange={setSelectedGrade}
                        grades={['FORM1', 9, 10, 11, 12]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                      <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        aria-label="Difficulty level"
                      >
                        <option value="">All Difficulties</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedSubject('');
                        setSelectedGrade('');
                        setDifficultyFilter('');
                        setSearchTerm('');
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Clear All Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredTopics.length} of {TOPICS.length} topics
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedSubject && ` in ${selectedSubject}`}
                {selectedGrade && ` for grade ${selectedGrade}`}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Sort topics by"
                >
                  <option value="name">Name</option>
                  <option value="curriculum">Curriculum</option>
                  <option value="grade">Grade</option>
                </select>
              </div>
            </div>

            {/* Topics Grid */}
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTopics.map((topic) => (
                  <TopicPreviewCard
                    key={topic.id}
                    topic={topic}
                    onViewLesson={() => setSelectedTopicId(topic.id)}
                    onCreateChallenge={() => setShowChallengeCreator(true)}
                    onPresentLesson={() => setSelectedTopicId(topic.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedSubject || selectedGrade || difficultyFilter
                    ? 'Try adjusting your search criteria or filters'
                    : 'No topics are currently available'}
                </p>
                {(searchTerm || selectedSubject || selectedGrade || difficultyFilter) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSubject('');
                      setSelectedGrade('');
                      setDifficultyFilter('');
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Classroom Challenges</h2>
                  <p className="text-gray-600">Create and manage interactive challenges for your students</p>
                </div>
                <button
                  onClick={() => setShowChallengeCreator(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Challenge
                </button>
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Challenges</p>
                    <p className="text-2xl font-bold text-gray-800">{challenges.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-gray-800">18</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                    <p className="text-2xl font-bold text-gray-800">78%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Time</p>
                    <p className="text-2xl font-bold text-gray-800">12m</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenges List */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Your Challenges</h3>
              </div>
              
              {challenges.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-800 mb-1">{challenge.topic}</h4>
                              <p className="text-gray-600 mb-2">{challenge.description}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {challenge.participants} participants
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {challenge.analytics.avgScore}% avg score
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  Created {challenge.createdAt}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleViewChallenge(challenge.id)}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Results
                          </button>
                          <button
                            onClick={() => handleEditChallenge(challenge.id)}
                            className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteChallenge(challenge.id)}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges yet</h3>
                  <p className="text-gray-500 mb-4">Create your first challenge to engage your students</p>
                  <button
                    onClick={() => setShowChallengeCreator(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create Challenge
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Student Progress</h2>
                  <p className="text-gray-600">Monitor student performance and track learning outcomes</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export Report
                    </div>
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Analytics
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Class Average</p>
                    <p className="text-2xl font-bold text-gray-800">78%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-800">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Top Performer</p>
                    <p className="text-2xl font-bold text-gray-800">95%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Time</p>
                    <p className="text-2xl font-bold text-gray-800">12m</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Progress Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Individual Student Progress</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recent Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Challenges Completed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 1, name: 'Alice Johnson', score: 92, progress: 85, completed: 8, status: 'Excellent' },
                      { id: 2, name: 'Bob Smith', score: 78, progress: 72, completed: 6, status: 'Good' },
                      { id: 3, name: 'Carol Davis', score: 85, progress: 78, completed: 7, status: 'Good' },
                      { id: 4, name: 'David Wilson', score: 65, progress: 58, completed: 4, status: 'Needs Help' },
                      { id: 5, name: 'Eva Brown', score: 88, progress: 82, completed: 7, status: 'Good' },
                    ].map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-green-800">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.score}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.completed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                            student.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            View Details
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Message
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-lg font-medium">Performance Chart</p>
                  <p className="text-sm">Interactive chart showing student progress over time</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modals and Overlays */}
        {showChallengeCreator && (
          <ChallengeCreator
            topicId={selectedTopicId || ''}
            onClose={() => {
              setShowChallengeCreator(false);
              setSelectedTopicId(null);
            }}
          />
        )}

        {selectedTopicId && (
          <LessonViewer
            topicId={selectedTopicId}
            onClose={() => setSelectedTopicId(null)}
            onDownloadPDF={() => handleDownloadPDF(selectedTopicId)}
            onDownloadPPTX={() => handleDownloadPPTX(selectedTopicId)}
          />
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Challenge created successfully!
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 