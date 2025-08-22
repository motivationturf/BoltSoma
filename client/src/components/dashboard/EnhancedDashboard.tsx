import React, { useContext, useState } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Users,
  Star,
  Zap,
  Calendar,
  ChevronRight,
  Play
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { UserContext } from '../../context/UserContext';
import { useAuthContextV2 } from '../../context/AuthContextV2';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { GuestDashboard } from './GuestDashboard';

export function EnhancedDashboard() {
  const { user } = useContext(UserContext);
  const { isGuest, user: authUser } = useAuthContextV2();
  const navigate = useNavigate();
  const [guestProgress, setGuestProgress] = useState({
    lessonsViewed: [],
    quizzesCompleted: [],
    gamesPlayed: [], // Track games played for 3-game limit
    timeSpent: 0,
    pointsEarned: 0,
    challengesTried: [],
    subjectsExplored: []
  });

  // If user is a guest, show guest dashboard
  if (isGuest) {
    return (
      <AppLayout>
        <GuestDashboard 
          user={authUser}
          guestProgress={guestProgress}
          onUpgrade={() => navigate('/guest/upgrade')}
          onUpdateProgress={(update) => setGuestProgress(prev => ({ ...prev, ...update }))}
        />
      </AppLayout>
    );
  }

  const subjects = [
    { 
      id: 'computer-studies', 
      name: 'Computer Studies/ICT', 
      progress: 65, 
      color: 'bg-blue-500',
      lessons: 12,
      completed: 8,
      nextLesson: 'Introduction to Programming'
    },
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      progress: 78, 
      color: 'bg-green-500',
      lessons: 15,
      completed: 12,
      nextLesson: 'Quadratic Equations'
    },
    { 
      id: 'sciences', 
      name: 'Sciences', 
      progress: 52, 
      color: 'bg-purple-500',
      lessons: 18,
      completed: 9,
      nextLesson: 'Chemical Reactions'
    },
    { 
      id: 'religious-education', 
      name: 'Religious Education', 
      progress: 43, 
      color: 'bg-orange-500',
      lessons: 10,
      completed: 4,
      nextLesson: 'World Religions Overview'
    }
  ];

  const recentAchievements = [
    { id: 1, title: 'Math Streak Master', description: '5-day math practice streak', icon: '🔥', earned: '2 days ago' },
    { id: 2, title: 'Science Explorer', description: 'Completed 3 virtual labs', icon: '🔬', earned: '1 week ago' },
    { id: 3, title: 'Code Warrior', description: 'First programming challenge', icon: '💻', earned: '1 week ago' }
  ];

  const upcomingChallenges = [
    { id: 1, title: 'Weekly Math Challenge', subject: 'Mathematics', deadline: '3 days', participants: 45 },
    { id: 2, title: 'Science Quiz Bowl', subject: 'Sciences', deadline: '5 days', participants: 32 },
    { id: 3, title: 'Coding Competition', subject: 'Computer Studies', deadline: '1 week', participants: 28 }
  ];

  const stats = [
    { label: 'Learning Streak', value: '7 days', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Points', value: '2,847', icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Rank', value: '#12', icon: Star, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Study Time', value: '24h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user?.firstName}! 🎉
              </h1>
              <p className="text-green-100 mb-4">
                Ready to continue your learning journey? You're doing great!
              </p>
              <Button 
                onClick={() => navigate('/subjects')} 
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subject Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Subject Progress</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/subjects')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{subject.name}</h4>
                          <p className="text-sm text-gray-600">
                            {subject.completed}/{subject.lessons} lessons completed
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{subject.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full ${subject.color}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Next: {subject.nextLesson}
                        </p>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/subjects/${subject.id}`)}>
                          Continue
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Challenges */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Challenges</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/challenges')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingChallenges.map((challenge) => (
                    <div key={challenge.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">{challenge.subject}</span>
                          <span className="text-sm text-orange-600 font-medium">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {challenge.deadline}
                          </span>
                          <span className="text-sm text-gray-600">
                            <Users className="h-3 w-3 inline mr-1" />
                            {challenge.participants} joined
                          </span>
                        </div>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/profile')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-green-900">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-green-700">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {achievement.earned}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}