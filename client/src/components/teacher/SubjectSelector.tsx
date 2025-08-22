import React from 'react';

interface Subject {
  id: string;
  name: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubjectId: string | null;
  onChange: (subjectId: string) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, selectedSubjectId, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {subjects.map(subject => (
      <button
        key={subject.id}
        className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-150 ${selectedSubjectId === subject.id ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'}`}
        onClick={() => onChange(subject.id)}
        aria-pressed={selectedSubjectId === subject.id}
      >
        {subject.name}
      </button>
    ))}
  </div>
); 