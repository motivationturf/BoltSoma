import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface AvatarSelectionProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
  onNext: () => void;
}

const avatars = [
  { id: 'avatar-1', name: 'Scholar', emoji: '🎓', color: 'bg-blue-100' },
  { id: 'avatar-2', name: 'Explorer', emoji: '🔍', color: 'bg-green-100' },
  { id: 'avatar-3', name: 'Innovator', emoji: '💡', color: 'bg-yellow-100' },
  { id: 'avatar-4', name: 'Leader', emoji: '👑', color: 'bg-purple-100' },
  { id: 'avatar-5', name: 'Artist', emoji: '🎨', color: 'bg-pink-100' },
  { id: 'avatar-6', name: 'Scientist', emoji: '🔬', color: 'bg-indigo-100' },
  { id: 'avatar-7', name: 'Athlete', emoji: '⚡', color: 'bg-orange-100' },
  { id: 'avatar-8', name: 'Musician', emoji: '🎵', color: 'bg-red-100' }
];

export function AvatarSelection({ selectedAvatar, onSelect, onNext }: AvatarSelectionProps) {
  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Learning Avatar
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select an avatar that represents your learning style. Your avatar will appear throughout your learning journey and represent your achievements.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {avatars.map((avatar) => (
          <Card
            key={avatar.id}
            className={`
              cursor-pointer transition-all duration-200 
              ${selectedAvatar === avatar.id 
                ? 'ring-4 ring-green-500 shadow-lg transform scale-105' 
                : 'hover:shadow-md hover:scale-102'
              }
            `}
            onClick={() => onSelect(avatar.id)}
          >
            <div className={`p-6 ${avatar.color} rounded-t-xl`}>
              <div className="text-4xl mb-2">{avatar.emoji}</div>
            </div>
            <CardContent className="py-4">
              <h3 className="font-semibold text-gray-900">{avatar.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={!selectedAvatar}
        size="lg"
        className="px-8"
      >
        Continue
      </Button>
    </div>
  );
}