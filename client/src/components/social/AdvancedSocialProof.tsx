import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, Star, TrendingUp, Gift, Target, Zap } from 'lucide-react';

interface SocialActivity {
  id: string;
  type: 'achievement' | 'streak' | 'challenge' | 'invite' | 'milestone';
  user: {
    name: string;
    avatar: string;
    grade: string;
  };
  action: string;
  reward?: string;
  timestamp: Date;
  isHighlighted?: boolean;
}

interface PeerComparison {
  percentile: number;
  totalUsers: number;
  userRank: number;
  nextMilestone: string;
  competitiveAdvantage: string;
}

interface InviteRewards {
  invitesSent: number;
  rewards: Array<{
    invites: number;
    reward: string;
    unlocked: boolean;
  }>;
}

export function AdvancedSocialProof() {
  const [activities, setActivities] = useState<SocialActivity[]>([]);
  const [peerComparison, setPeerComparison] = useState<PeerComparison | null>(null);
  const [inviteRewards, setInviteRewards] = useState<InviteRewards>({
    invitesSent: 2,
    rewards: [
      { invites: 1, reward: 'Unlock Premium Theme', unlocked: true },
      { invites: 3, reward: '1 Month Free Premium', unlocked: false },
      { invites: 5, reward: 'Exclusive Beta Features', unlocked: false }
    ]
  });
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    // Simulate real-time activity feed
    const mockActivities: SocialActivity[] = [
      {
        id: '1',
        type: 'achievement',
        user: { name: 'Sarah M.', avatar: '��‍��', grade: 'Grade 10' },
        action: 'unlocked "Math Master" badge',
        reward: '+100 points',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        isHighlighted: true
      },
      {
        id: '2',
        type: 'streak',
        user: { name: 'James K.', avatar: '��‍��', grade: 'Grade 11' },
        action: 'reached 7-day learning streak',
        reward: 'Streak Multiplier x2',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '3',
        type: 'challenge',
        user: { name: 'Amina S.', avatar: '��‍��', grade: 'Grade 9' },
        action: 'completed Science Challenge',
        reward: '+50 points',
        timestamp: new Date(Date.now() - 8 * 60 * 1000)
      },
      {
        id: '4',
        type: 'invite',
        user: { name: 'David L.', avatar: '��‍��', grade: 'Grade 12' },
        action: 'invited 3 friends',
        reward: 'Premium Theme Unlocked',
        timestamp: new Date(Date.now() - 12 * 60 * 1000)
      }
    ];

    setActivities(mockActivities);
    setPeerComparison({
      percentile: 78,
      totalUsers: 1247,
      userRank: 273,
      nextMilestone: 'Top 10%',
      competitiveAdvantage: 'You\'re ahead in Mathematics'
    });
  }, []);

  const handleInviteFriends = () => {
    setShowInviteModal(true);
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getActivityIcon = (type: SocialActivity['type']) => {
    switch (type) {
      case 'achievement': return Trophy;
      case 'streak': return TrendingUp;
      case 'challenge': return Target;
      case 'invite': return Gift;
      case 'milestone': return Star;
      default: return Users;
    }
  };

  const getActivityColor = (type: SocialActivity['type']) => {
    switch (type) {
      case 'achievement': return 'text-yellow-600 bg-yellow-50';
      case 'streak': return 'text-green-600 bg-green-50';
      case 'challenge': return 'text-blue-600 bg-blue-50';
      case 'invite': return 'text-purple-600 bg-purple-50';
      case 'milestone': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Peer Comparison Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Your Progress
          </h3>
          <span className="text-sm text-gray-600">Rank #{peerComparison?.userRank}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{peerComparison?.percentile}%</div>
            <div className="text-sm text-gray-600">Percentile</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{peerComparison?.totalUsers}</div>
            <div className="text-sm text-gray-600">Total Learners</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-3">
          <div className="text-sm text-gray-700 mb-2">
            <strong>Next Milestone:</strong> {peerComparison?.nextMilestone}
          </div>
          <div className="text-sm text-green-700">
            <strong>Your Edge:</strong> {peerComparison?.competitiveAdvantage}
          </div>
        </div>
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border"
      >
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Recent Activity
          </h3>
        </div>
        
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${activity.isHighlighted ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activity.user.avatar}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{activity.user.name}</div>
                        <div className="text-xs text-gray-500">{activity.user.grade}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      {activity.action}
                      {activity.reward && (
                        <span className="text-green-600 font-medium ml-2">
                          {activity.reward}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {formatTimeAgo(activity.timestamp)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Invite Friends Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
      >
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Invite Friends, Unlock Rewards</h3>
          <p className="text-sm text-gray-600">Share the learning experience and earn exclusive rewards!</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {inviteRewards.rewards.map((reward, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`text-center p-3 rounded-lg border ${
                reward.unlocked 
                  ? 'bg-green-100 border-green-300' 
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <div className="text-lg font-bold text-gray-900">{reward.invites}</div>
              <div className="text-xs text-gray-600">{reward.reward}</div>
              {reward.unlocked && (
                <div className="text-xs text-green-600 font-medium mt-1">✓ Unlocked</div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleInviteFriends}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
        >
          <Gift className="h-4 w-4 inline mr-2" />
          Invite Friends ({inviteRewards.invitesSent}/5)
        </motion.button>
      </motion.div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold mb-4">Invite Friends</h3>
              <p className="text-gray-600 mb-4">
                Share SomaSmart with your classmates and unlock exclusive rewards!
              </p>
              
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Friend's email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Personal message (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
                >
                  Send Invite
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 