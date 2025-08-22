import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Play,
  UserPlus,
  Lock,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface GuestDashboardProps {
  user: any;
  guestProgress: {
    lessonsViewed: string[];
    quizzesCompleted: string[];
    gamesPlayed: string[]; // Track games played for 3-game limit
    timeSpent: number;
    pointsEarned: number;
    challengesTried: string[];
    subjectsExplored: string[];
  };
  onUpgrade: () => void;
  onUpdateProgress: (update: any) => void;
}

export function GuestDashboard({ user, guestProgress, onUpgrade, onUpdateProgress }: GuestDashboardProps) {
  const navigate = useNavigate();
  // Guest mode: Limited to 3 subjects only
  const availableSubjects = [
    { 
      id: 'computer-studies', 
      name: 'Computer Studies/ICT', 
      progress: 0, 
      color: 'bg-blue-500',
      lessons: 12,
      completed: 0,
      nextLesson: 'Introduction to Programming',
      available: true
    },
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      progress: 0, 
      color: 'bg-green-500',
      lessons: 15,
      completed: 0,
      nextLesson: 'Basic Algebra',
      available: true
    },
    { 
      id: 'sciences', 
      name: 'Sciences', 
      progress: 0, 
      color: 'bg-purple-500',
      lessons: 18,
      completed: 0,
      nextLesson: 'Scientific Method',
      available: true
    }
  ];
  
  // Guest limitations
  const GUEST_GAME_LIMIT = 3;
  const GUEST_SUBJECT_LIMIT = 3; // Already limited in availableSubjects
  const gamesRemaining = GUEST_GAME_LIMIT - guestProgress.gamesPlayed.length;
  const hasReachedGameLimit = guestProgress.gamesPlayed.length >= GUEST_GAME_LIMIT;

  const guestFeatures = [
    { 
      label: 'Lessons Viewed', 
      value: guestProgress.lessonsViewed.length, 
      icon: BookOpen, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      available: true 
    },
    { 
      label: 'Games Remaining', 
      value: `${gamesRemaining}/${GUEST_GAME_LIMIT}`, 
      icon: Target, 
      color: hasReachedGameLimit ? 'text-red-600' : 'text-green-600', 
      bg: hasReachedGameLimit ? 'bg-red-100' : 'bg-green-100', 
      available: !hasReachedGameLimit 
    },
    { 
      label: 'Subjects Available', 
      value: `${GUEST_SUBJECT_LIMIT}`, 
      icon: Star, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100', 
      available: true 
    },
    { 
      label: 'Time Spent', 
      value: `${Math.round(guestProgress.timeSpent / 60)}m`, 
      icon: Clock, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      available: true 
    }
  ];

  const sampleGames = [
    { id: 1, title: 'Math Brain Teaser', type: 'brain-buster', available: !hasReachedGameLimit },
    { id: 2, title: 'Code Challenge', type: 'time-challenge', available: !hasReachedGameLimit },
    { id: 3, title: 'Science Quiz', type: 'flashcards', available: !hasReachedGameLimit }
  ];

  const handleLessonStart = (subjectId: string) => {
    // Track that user started a lesson
    if (!guestProgress.subjectsExplored.includes(subjectId)) {
      onUpdateProgress({
        subjectsExplored: [...guestProgress.subjectsExplored, subjectId],
        timeSpent: guestProgress.timeSpent + 5 // Add 5 minutes for starting
      });
    }
    navigate(`/lesson/${subjectId}`);
  };

  const handleGameStart = (gameId: number, gameType: string) => {
    if (hasReachedGameLimit) {
      // Show upgrade modal or prompt
      onUpgrade();
      return;
    }
    
    // Track game played
    const gameKey = `${gameType}-${gameId}`;
    if (!guestProgress.gamesPlayed.includes(gameKey)) {
      onUpdateProgress({
        gamesPlayed: [...guestProgress.gamesPlayed, gameKey],
        timeSpent: guestProgress.timeSpent + 5
      });
    }
    navigate('/arcade');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section with Progress */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome to SomaSmart EduHub! 👋
            </h1>
            <p className="text-green-100 mb-4">
              You're exploring as a guest. Create an account to unlock your full learning potential!
            </p>
            
            {/* Progress Summary */}
            {(guestProgress.lessonsViewed.length > 0 || guestProgress.quizzesCompleted.length > 0) && (
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">Your Progress So Far:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold">{guestProgress.lessonsViewed.length}</div>
                    <div className="text-green-100">Lessons Viewed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{guestProgress.quizzesCompleted.length}</div>
                    <div className="text-green-100">Quizzes Tried</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round(guestProgress.timeSpent / 60)}</div>
                    <div className="text-green-100">Minutes Spent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{guestProgress.subjectsExplored.length}</div>
                    <div className="text-green-100">Subjects Explored</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={onUpgrade}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account & Save Progress
              </Button>
              <Button 
                onClick={() => navigate('/subjects')} 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Play className="h-4 w-4 mr-2" />
                Continue Exploring
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Guest Features Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {guestFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{feature.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{feature.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${feature.bg} relative`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                    {!feature.available && (
                      <Lock className="h-3 w-3 text-gray-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available Subjects */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Try Our Subjects</h3>
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
                {availableSubjects.map((subject) => (
                  <div key={subject.id} className="p-4 border border-gray-200 rounded-lg relative">
                    {!subject.available && (
                      <div className="absolute inset-0 bg-gray-50/80 rounded-lg flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 font-medium">Create account to unlock</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{subject.name}</h4>
                        <p className="text-sm text-gray-600">
                          {subject.available ? 'Sample lessons available' : `${subject.lessons} lessons total`}
                        </p>
                      </div>
                      {guestProgress.subjectsExplored.includes(subject.id) && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Award className="h-4 w-4" />
                          <span className="text-xs font-medium">Explored</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {subject.available ? `Try: ${subject.nextLesson}` : subject.nextLesson}
                      </p>
                      <Button 
                        size="sm" 
                        variant={subject.available ? "outline" : "ghost"}
                        disabled={!subject.available}
                        onClick={() => subject.available && handleLessonStart(subject.id)}
                      >
                        {subject.available ? 'Try Now' : 'Locked'}
                        {subject.available && <ChevronRight className="h-4 w-4 ml-1" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guest Games - Limited to 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Try Our Games</h3>
                  <p className="text-sm text-gray-600">You have {gamesRemaining} games remaining</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/arcade')}
                >
                  Game Arcade
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {hasReachedGameLimit && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-amber-600" />
                    <div>
                      <h4 className="font-medium text-amber-900">Game Limit Reached</h4>
                      <p className="text-sm text-amber-700">You've played all 3 free games. Create an account for unlimited access!</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={onUpgrade}
                    className="mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Create Free Account
                  </Button>
                </div>
              )}
              
              <div className="space-y-3">
                {sampleGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg relative">
                    {!game.available && (
                      <div className="absolute inset-0 bg-gray-50/80 rounded-lg flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600">Game limit reached</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{game.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">{game.type.replace('-', ' ')}</p>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!game.available}
                      onClick={() => game.available && handleGameStart(game.id, game.type)}
                    >
                      {game.available ? 'Play Now' : 'Locked'}
                    </Button>
                  </div>
                ))}
              </div>
              
              {!hasReachedGameLimit && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">{gamesRemaining} games remaining in guest mode</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Benefits */}
        <div>
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Unlock Full Access</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">Remove all guest limitations and save your progress</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    'Save your progress permanently',
                    'Unlimited games in the arcade',
                    'Access all 4 subjects (vs 3 in guest mode)',
                    'Complete unlimited lessons and quizzes',
                    'Earn points and unlock achievements',
                    'Compete in leaderboards',
                    'Join challenges and competitions',
                    'Connect with classmates'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <Button onClick={onUpgrade} className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Free Account
                </Button>
                
                <div className="text-center text-xs text-gray-600">
                  100% Free • No Credit Card Required
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}