import React, { useEffect, useState } from 'react';
import { User, Star, Users } from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

interface PeerStats {
  percentile: number;
  totalUsers: number;
}

export function SocialProof() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [peerStats, setPeerStats] = useState<PeerStats | null>(null);

  useEffect(() => {
    // Fetch recent activity (replace with real API)
    setActivities([
      { id: '1', user: 'Sarah', action: 'completed a Math challenge', timestamp: '2 min ago' },
      { id: '2', user: 'James', action: 'earned the “Streak Master” badge', timestamp: '5 min ago' },
      { id: '3', user: 'Amina', action: 'joined the Science Arcade', timestamp: '10 min ago' }
    ]);
    // Fetch peer stats (replace with real API)
    setPeerStats({ percentile: 78, totalUsers: 1200 });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" /> Community Activity
      </h3>
      <ul className="mb-4">
        {activities.map(a => (
          <li key={a.id} className="text-sm text-gray-700 mb-1">
            <span className="font-semibold">{a.user}</span> {a.action} <span className="text-gray-400">({a.timestamp})</span>
          </li>
        ))}
      </ul>
      {peerStats && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded p-2">
          <Star className="h-4 w-4 text-yellow-500" />
          You’re ahead of {peerStats.percentile}% of {peerStats.totalUsers} learners!
        </div>
      )}
    </div>
  );
} 