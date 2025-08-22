
import React, { useState, useEffect } from 'react';
import { lamService } from '../../services/lamService';
import { Grade, Subject, Topic } from '../../types/lam';

interface TopicSelectorProps {
  selectedTopic: Topic | null;
  onTopicChange: (topic: Topic | null) => void;
  selectedGrade: Grade | null;
  selectedSubject: Subject | null;
}

export function TopicSelector({ selectedTopic, onTopicChange, selectedGrade, selectedSubject }: TopicSelectorProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      loadTopics();
    } else {
      setTopics([]);
      setError(null);
    }
  }, [selectedGrade, selectedSubject]);

  const loadTopics = async () => {
    if (!selectedGrade || !selectedSubject) return;

    try {
      setLoading(true);
      setError(null);
      const data = await lamService.getTopics({
        grade_id: selectedGrade.id,
        subject_id: selectedSubject.id
      });
      setTopics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Topic</label>
        <div className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Topic</label>
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Topic
      </label>
      <select
        value={selectedTopic?.id || ''}
        onChange={(e) => {
          const topic = topics.find(t => t.id === e.target.value) || null;
          onTopicChange(topic);
        }}
        disabled={!selectedGrade || !selectedSubject}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">
          {selectedGrade && selectedSubject ? 'Select a topic...' : 'Select grade and subject first'}
        </option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
      {topics.length === 0 && selectedGrade && selectedSubject && !loading && (
        <p className="text-gray-500 text-sm">No topics available for this combination.</p>
      )}
    </div>
  );
}
