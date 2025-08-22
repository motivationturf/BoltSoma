import React from 'react';

interface GradeSelectorProps {
  selectedGrade: string | number | null;
  onChange: (grade: string | number | null) => void;
}

const GRADES: Array<{ value: string | number; label: string }> = [
  { value: '8', label: 'FORM1' },
  { value: 9, label: 'Grade 9' },
  { value: 10, label: 'Grade 10' },
  { value: 11, label: 'Grade 11' },
  { value: 12, label: 'Grade 12' },
];

export const GradeSelector: React.FC<GradeSelectorProps> = ({ selectedGrade, onChange }) => {
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Select Grade">
      {GRADES.map((g) => (
        <button
          key={g.label}
          className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-150 ${
            selectedGrade === g.value
              ? 'bg-green-600 text-white border-green-700'
              : 'bg-white text-green-700 border-green-300 hover:bg-green-50'
          }`}
          onClick={() => onChange(g.value)}
          aria-pressed={selectedGrade === g.value}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
};

 