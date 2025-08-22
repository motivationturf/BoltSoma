
import React, { useState, useEffect } from 'react';
import { lamService } from '../../services/lamService';
import { Grade, Subject } from '../../types/lam';

interface SubjectSelectorProps {
  selectedSubject: Subject | null;
  onSubjectChange: (subject: Subject | null) => void;
  selectedGrade: Grade | null;
}

export function SubjectSelector({ selectedSubject, onSubjectChange, selectedGrade }: SubjectSelectorProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const data = await lamService.getSubjects();
      setSubjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <div className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Subject
      </label>
      <select
        value={selectedSubject?.id || ''}
        onChange={(e) => {
          const subject = subjects.find(s => s.id === e.target.value) || null;
          onSubjectChange(subject);
        }}
        disabled={!selectedGrade}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">
          {selectedGrade ? 'Select a subject...' : 'Select grade first'}
        </option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  );
}
