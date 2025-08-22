import React, { useContext } from 'react';
import { User, BookOpen, Trophy, Target, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AchievementUnlock } from '../retention/AchievementUnlock';
import { StreakMilestone } from '../retention/StreakMilestone';
import { useRetentionAnimations } from '../../hooks/useRetentionAnimations';
import { UserContext } from '../../context/UserContext';

export function Dashboard() {
  const { user, onLogout, onViewProfile } = useContext(UserContext) as any;
  const { currentEvent, triggerAchievement, triggerStreakMilestone, clearCurrentEvent } = useRetentionAnimations();

  const subjects = [
    { id: 'computer-studies', name: 'Computer Studies/ICT', progress: 65, color: 'bg-blue-500' },
    { id: 'mathematics', name: 'Mathematics', progress: 78, color: 'bg-green-500' },
    { id: 'sciences', name: 'Sciences', progress: 52, color: 'bg-purple-500' },
    { id: 'religious-education', name: 'Religious Education', progress: 43, color: 'bg-orange-500' }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed onboarding', earned: true },
    { id: 2, title: 'Math Whiz', description: 'Solved 10 math problems', earned: true },
    { id: 3, title: 'Consistent Learner', description: '7-day learning streak', earned: false },
    { id: 4, title: 'Subject Master', description: 'Complete one subject', earned: false }
  ];

  const stats = [
    { label: 'Learning Streak', value: '3 days', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Points', value: '1,247', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Subjects Active', value: '4', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Goals Completed', value: '2/6', icon: Target, color: 'text-purple-600' }
  ];

  // Example: Trigger achievement when user completes first game
  const handleGameComplete = (score: number) => {
    if (score > 80) {
      triggerAchievement({
        id: 'first_perfect_score',
        title: 'Perfect Score!',
        description: 'You achieved a perfect score on your first game!',
        icon: 'trophy',
        rarity: 'rare',
        points: 100
      });
    }
  };

  // Example: Trigger streak milestone
  const handleStreakUpdate = (days: number) => {
    if (days === 7) {
      triggerStreakMilestone({
        days: 7,
        reward: 'Weekly Warrior Badge',
        multiplier: 1.5,
        icon: 'flame'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-sm text-gray-600">Grade {user?.grade} • Ready to learn?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button onClick={onViewProfile} variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button onClick={onLogout} variant="ghost" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subject Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Subject Progress</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {subject.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {subject.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${subject.color}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button className="w-full">Continue Learning</Button>
                  <Button variant="outline" className="w-full">View All Subjects</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <Trophy className={`h-5 w-5 ${
                          achievement.earned ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          achievement.earned ? 'text-green-900' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-xs ${
                          achievement.earned ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Retention Animations */}
      {currentEvent?.type === 'achievement' && (
        <AchievementUnlock
          achievement={currentEvent.data}
          isVisible={true}
          onClose={clearCurrentEvent}
        />
      )}
      
      {currentEvent?.type === 'streak' && (
        <StreakMilestone
          milestone={currentEvent.data}
          isVisible={true}
          onClose={clearCurrentEvent}
        />
      )}
    </div>
  );
}