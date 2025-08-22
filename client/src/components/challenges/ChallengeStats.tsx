import React from 'react';
import { Trophy, Target, Users, Clock, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface ChallengeStatsProps {
  isGuest?: boolean;
  stats: {
    totalChallenges: number;
    activeChallenges: number;
    completedChallenges: number;
    totalPoints: number;
    currentRank: number;
    winRate: number;
  };
}

export function ChallengeStats({ isGuest = false, stats }: ChallengeStatsProps) {
  const statItems = [
    {
      label: 'Active Challenges',
      value: isGuest ? '0' : stats.activeChallenges.toString(),
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Completed',
      value: isGuest ? '0' : stats.completedChallenges.toString(),
      icon: Trophy,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Points Earned',
      value: isGuest ? '0' : stats.totalPoints.toLocaleString(),
      icon: Award,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      label: 'Current Rank',
      value: isGuest ? '-' : `#${stats.currentRank}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Win Rate',
      value: isGuest ? '0%' : `${stats.winRate}%`,
      icon: Users,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}