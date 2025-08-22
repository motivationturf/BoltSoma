import React, { useState, useContext } from 'react';
import { User, Pencil } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProfileForm } from './ProfileForm';
import { UserContext } from '../../context/UserContext';
import type { User as UserType, Achievement } from '../../types';

const TABS = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'progress', label: 'Progress' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'settings', label: 'Settings' },
];

export default function ProfilePage() {
  const { user, onUpdate, isLoading, error } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('personal');
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

  // Fallbacks for missing user data
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const grade = user?.grade ? (user.grade === '8' ? 'FORM1' : `Grade ${user.grade}`) : '';
  const avatarUrl = user?.avatar || '';
  const stats = {
    lessons: 0,
    challenges: 0,
    achievements: 0,
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <Card className="mb-6 p-6 flex items-center gap-6 bg-white shadow-md">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl text-green-600">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User />
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-0 right-0 bg-white border border-gray-200 shadow-sm"
            aria-label="Edit avatar"
            onClick={() => setAvatarModalOpen(true)}
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{firstName} {lastName}</h2>
            <span className="ml-2 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">{grade}</span>
          </div>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <div><span className="font-semibold text-green-600">{stats.lessons}</span> Lessons</div>
            <div><span className="font-semibold text-green-600">{stats.challenges}</span> Points</div>
            <div><span className="font-semibold text-green-600">{stats.achievements}</span> Achievements</div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 -mb-px font-medium border-b-2 transition-colors duration-200 focus:outline-none ${
              activeTab === tab.key
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-500 hover:text-green-600'
            }`}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'personal' && (
          <ProfileForm
            user={user as any}
            onUpdate={onUpdate}
            isLoading={isLoading}
            error={error}
          />
        )}
        {activeTab === 'progress' && <ProgressTab user={user} />}
        {activeTab === 'achievements' && <AchievementsTab user={user} />}
        {activeTab === 'settings' && <SettingsTab user={user} />}
      </div>

      {/* Avatar Modal (stub) */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Select Avatar</h3>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setAvatarModalOpen(false)} variant="secondary">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stub components for each tab
function ProgressTab({ user }: { user: UserType | null }) {
  // Example: use user data for progress
  const progress = {
    lessonsCompleted: 0,
    totalLessons: 20,
    challengesCompleted: 0,
    totalChallenges: 10,
    streak: 0,
  };
  const lessonPercent = Math.round((progress.lessonsCompleted / progress.totalLessons) * 100);
  const challengePercent = Math.round((progress.challengesCompleted / progress.totalChallenges) * 100);
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Learning Progress</h3>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-green-700">Lessons Completed</span>
            <span className="text-sm font-semibold text-gray-700">{progress.lessonsCompleted}/{progress.totalLessons}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${lessonPercent}%` }} />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-green-700">Points</span>
            <span className="text-sm font-semibold text-gray-700">{progress.challengesCompleted}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-400 h-3 rounded-full" style={{ width: `${Math.min(challengePercent, 100)}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Streak: {progress.streak} days</span>
        </div>
      </Card>
    </div>
  );
}

function AchievementsTab({ user }: { user: UserType | null }) {
  // Use real achievements if available
  const achievements: Achievement[] = [];
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.length === 0 && (
            <div className="text-gray-500">No achievements yet.</div>
          )}
          {achievements.map((a: Achievement, i: number) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${a.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`inline-block w-3 h-3 rounded-full ${a.earned ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <div className={`font-semibold ${a.earned ? 'text-green-700' : 'text-gray-500'}`}>{a.title}</div>
                <div className="text-xs text-gray-500">{a.description}</div>
              </div>
              {a.earned && <span className="ml-auto text-xs font-bold text-green-600">Earned</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SettingsTab({ user }: { user: UserType | null }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Settings</h3>
        <div className="text-gray-600 text-sm">Settings options coming soon.</div>
      </Card>
    </div>
  );
} 