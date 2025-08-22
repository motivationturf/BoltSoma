import React, { useState, useContext } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Lock, UserPlus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { UserContext } from '../../context/UserContext';
import { AppLayout } from '../layout/AppLayout';

export function LeaderboardsPage() {
  const { user } = useContext(UserContext) as any;
  const isGuest = !user;
  const [activeTab, setActiveTab] = useState<'overall' | 'mathematics' | 'sciences' | 'computer-studies' | 'religious-education'>('overall');
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'all-time'>('week');

  const leaderboardData = {
    overall: [
      { id: 1, name: 'Sarah Mwanza', grade: '12', points: 4250, streak: 15, avatar: 'SM', change: '+2' },
      { id: 2, name: 'John Banda', grade: '11', points: 3890, streak: 12, avatar: 'JB', change: '-1' },
      { id: 3, name: 'Grace Phiri', grade: '12', points: 3654, streak: 8, avatar: 'GP', change: '+1' },
      { id: 4, name: 'David Tembo', grade: '11', points: 3421, streak: 10, avatar: 'DT', change: '0' },
      { id: 5, name: 'Mary Zulu', grade: '10', points: 3198, streak: 7, avatar: 'MZ', change: '+3' },
      { id: 6, name: 'Peter Mulenga', grade: '12', points: 2987, streak: 5, avatar: 'PM', change: '-2' },
      { id: 7, name: 'Ruth Sakala', grade: '11', points: 2876, streak: 9, avatar: 'RS', change: '+1' },
      { id: 8, name: 'James Chanda', grade: '10', points: 2654, streak: 6, avatar: 'JC', change: '-1' },
      { id: 9, name: 'Alice Mwale', grade: '12', points: 2543, streak: 4, avatar: 'AM', change: '+2' },
      { id: 10, name: 'Moses Lungu', grade: '11', points: 2432, streak: 8, avatar: 'ML', change: '0' },
      { id: 11, name: 'Esther Nyirenda', grade: '10', points: 2321, streak: 3, avatar: 'EN', change: '-3' },
      { id: 12, name: `${user?.firstName} ${user?.lastName}`, grade: user?.grade, points: isGuest ? 0 : 2198, streak: isGuest ? 0 : 7, avatar: `${user?.firstName?.[0]}${user?.lastName?.[0]}`, change: '+1', isCurrentUser: true }
    ]
  };

  const subjects = [
    { id: 'overall', name: 'Overall', icon: Trophy },
    { id: 'mathematics', name: 'Mathematics', icon: Star },
    { id: 'sciences', name: 'Sciences', icon: Medal },
    { id: 'computer-studies', name: 'Computer Studies', icon: Crown },
    { id: 'religious-education', name: 'Religious Education', icon: TrendingUp }
  ];

  const timeFrames = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'all-time', name: 'All Time' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const currentUserRank = leaderboardData.overall.findIndex(student => student.isCurrentUser) + 1;

  const handleUpgrade = () => {
    // Navigate to registration
    window.location.href = '#register';
  };

  if (isGuest) {
    return (
      <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboards</h1>
          <p className="text-lg text-gray-600">
            See how students rank and celebrate top performers.
          </p>
        </div>

        {/* Guest Access Message */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">Guest Mode - View Sample Leaderboards</h3>
                <p className="text-sm text-blue-700">Experience our leaderboard system. Create an account to participate and track your rankings.</p>
              </div>
            <Button
              onClick={handleUpgrade}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
            >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
    );
  }

  return (
    <AppLayout>
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboards</h1>
        <p className="text-lg text-gray-600">
          See how you rank against your classmates and celebrate top performers.
        </p>
      </div>

      {/* Current User Stats */}
      <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Ranking</h3>
                <p className="text-gray-600">Grade {user?.grade}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">#{currentUserRank}</p>
                  <p className="text-sm text-gray-600">Rank</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">2,198</p>
                  <p className="text-sm text-gray-600">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">7</p>
                  <p className="text-sm text-gray-600">Streak</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Subject Tabs */}
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <button
                  key={subject.id}
                  onClick={() => setActiveTab(subject.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === subject.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{subject.name}</span>
                </button>
              );
            })}
          </div>

          {/* Time Frame */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {timeFrames.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setTimeFrame(frame.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeFrame === frame.id
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {frame.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <div className="flex justify-center items-end space-x-4 mb-6">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-bold">
                {leaderboardData.overall[1].avatar}
              </span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 min-h-[100px] flex flex-col justify-end">
              <Medal className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">{leaderboardData.overall[1].name}</p>
              <p className="text-sm text-gray-600">Grade {leaderboardData.overall[1].grade}</p>
              <p className="text-lg font-bold text-gray-700">{leaderboardData.overall[1].points}</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">
                {leaderboardData.overall[0].avatar}
              </span>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 min-h-[120px] flex flex-col justify-end">
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">{leaderboardData.overall[0].name}</p>
              <p className="text-sm text-gray-600">Grade {leaderboardData.overall[0].grade}</p>
              <p className="text-xl font-bold text-yellow-600">{leaderboardData.overall[0].points}</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-bold">
                {leaderboardData.overall[2].avatar}
              </span>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 min-h-[100px] flex flex-col justify-end">
              <Trophy className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">{leaderboardData.overall[2].name}</p>
              <p className="text-sm text-gray-600">Grade {leaderboardData.overall[2].grade}</p>
              <p className="text-lg font-bold text-orange-600">{leaderboardData.overall[2].points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Full Rankings</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.overall.map((student, index) => (
              <div
                key={student.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  student.isCurrentUser 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    student.isCurrentUser ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    <span className="text-white font-semibold text-sm">
                      {student.avatar}
                    </span>
                  </div>
                  
                  <div>
                    <p className={`font-medium ${student.isCurrentUser ? 'text-green-900' : 'text-gray-900'}`}>
                      {student.name}
                      {student.isCurrentUser && <span className="ml-2 text-green-600">(You)</span>}
                    </p>
                    <p className="text-sm text-gray-600">Grade {student.grade}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{student.points}</p>
                    <p className="text-xs text-gray-600">Points</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-bold text-orange-600">{student.streak}</p>
                    <p className="text-xs text-gray-600">Streak</p>
                  </div>
                  
                  <div className="text-center min-w-[40px]">
                    <p className={`text-sm font-medium ${getChangeColor(student.change)}`}>
                      {student.change !== '0' && student.change}
                    </p>
                    <p className="text-xs text-gray-600">Change</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </AppLayout>
  );
}