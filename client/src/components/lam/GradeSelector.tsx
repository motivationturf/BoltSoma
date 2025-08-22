
import React, { useState, useEffect } from 'react';
import { lamService } from '../../services/lamService';
import { Grade } from '../../types/lam';

interface GradeSelectorProps {
  selectedGrade: Grade | null;
  onGradeChange: (grade: Grade | null) => void;
}

export function GradeSelector({ selectedGrade, onGradeChange }: GradeSelectorProps) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      setLoading(true);
      const data = await lamService.getGrades();
      setGrades(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load grades');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <div className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Grade
      </label>
      <select
        value={selectedGrade?.id || ''}
        onChange={(e) => {
          const grade = grades.find(g => g.id === e.target.value) || null;
          onGradeChange(grade);
        }}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select a grade...</option>
        {grades.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.name}
          </option>
        ))}
      </select>
    </div>
  );
}
