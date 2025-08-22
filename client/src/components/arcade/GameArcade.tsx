import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gamepad2, 
  Clock, 
  Zap, 
  Users, 
  Shuffle, 
  Brain,
  Trophy,
  Star,
  Play,
  Settings,
  ArrowLeft,
  Target,
  Timer,
  Award,
  BookOpen,
  Calculator,
  Microscope,
  Computer
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { BrainBuster } from './games/BrainBuster';
import { Flashcards } from './games/Flashcards';
import { TimeChallenge } from './games/TimeChallenge';
import { JumbleMaster } from './games/JumbleMaster';
import { ClassChallenge } from './games/ClassChallenge';
import { ZedLegacyGame } from './games/ZedLegacyGame';
import { Mascot } from '../mascot';
import { AppLayout } from '../layout/AppLayout';
import { useAuthContextV2 } from '../../context/AuthContextV2';

interface GameArcadeProps {
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

interface SubjectSelectionModalProps {
  gameId: string;
  onSubjectSelect: (subject: string) => void;
  onClose: () => void;
}

function SubjectSelectionModal({ gameId, onSubjectSelect, onClose }: SubjectSelectionModalProps) {
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: 'from-green-500 to-emerald-500',
      description: 'Algebra, geometry, calculus, and problem-solving'
    },
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: Computer,
      color: 'from-blue-500 to-cyan-500',
      description: 'Programming, databases, and technology'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: Microscope,
      color: 'from-purple-500 to-pink-500',
      description: 'Physics, chemistry, biology, and experiments'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      description: 'World religions, ethics, and philosophy'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Subject</h3>
          <p className="text-gray-600">Select the subject you want to practice with this game</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card
                key={subject.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => onSubjectSelect(subject.id)}
              >
                <div className={`bg-gradient-to-r ${subject.color} p-4 text-white rounded-t-xl`}>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-8 w-8" />
                    <div>
                      <h4 className="font-bold text-lg">{subject.name}</h4>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm">{subject.description}</p>
                  <Button 
                    className="w-full mt-3" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSubjectSelect(subject.id);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play with {subject.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function GameArcade({ isGuest: propIsGuest, onUpdateProgress }: GameArcadeProps) {
  const navigate = useNavigate();
  const { isGuest: authIsGuest, isAuthenticated } = useAuthContextV2();
  
  // Use auth context guest status if available, otherwise fall back to prop
  const isGuest = isAuthenticated ? authIsGuest : (propIsGuest ?? false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [pendingGameId, setPendingGameId] = useState<string>('');

  const games = [
    {
      id: 'mulungushi-quiz',
      title: 'Mulungushi Quiz',
      description: 'Test your strength of mind with solo challenges',
      icon: Brain, // or 🧠
      color: 'from-green-600 via-emerald-500 to-amber-500', // Carousel/flag
      players: 'Solo',
      duration: '5-15 min',
      features: ['Timed Questions', 'Multiple Choice', 'Instant Feedback'],
      guestAllowed: true
    },
    {
      id: 'luangwa-flip',
      title: 'Luangwa Flip',
      description: 'Flip through fast facts and sharpen your memory',
      icon: Shuffle, // or 🦓
      color: 'from-amber-500 via-orange-500 to-red-500', // Carousel/sunset
      players: 'Solo',
      duration: '10-20 min',
      features: ['Interactive Cards', 'Spaced Repetition', 'Progress Tracking'],
      guestAllowed: true
    },
    {
      id: 'zambezi-rush',
      title: 'Zambezi Rush',
      description: 'Beat the clock in this rapid-fire timed quiz',
      icon: Timer, // or 🌊
      color: 'from-blue-600 via-cyan-500 to-victoria-blue', // River blue
      players: 'Solo',
      duration: '1-2 min',
      features: ['60 Second Timer', 'Quick Fire', 'Score Multiplier'],
      guestAllowed: true
    },
    {
      id: 'kundalila-puzzles',
      title: 'Kundalila Puzzles',
      description: 'Unscramble clues and discover the missing pieces',
      icon: Zap, // or 🧩
      color: 'from-emerald-600 via-green-500 to-teal-500', // Forest
      players: 'Solo',
      duration: '5-10 min',
      features: ['Word Puzzles', 'Formula Scrambles', 'Hint System'],
      guestAllowed: true
    },
    {
      id: 'kalambo-clash',
      title: 'Kalambo Clash',
      description: 'Compete with classmates in high-stakes brain duels',
      icon: Users, // or 🥇
      color: 'from-copper-orange via-zambezi-teal to-sunset-gold', // Copper/teal
      players: 'Multiplayer',
      duration: '10-30 min',
      features: ['Real-time Competition', 'Custom Questions', 'Live Leaderboard'],
      guestAllowed: true
    },
    {
      id: 'zed-legacy',
      title: 'Zed Legacy',
      description: 'Discover Zambia’s history, heroes, and culture',
      icon: Award, // or 🇿🇲
      color: 'from-orange-500 via-pink-500 to-red-500', // Carousel gradient
      players: 'Solo',
      duration: '5-10 min',
      features: ['Zambian Facts', 'Multiple Choice', 'Badges'],
      guestAllowed: true
    },
  ];

  const handleGameSelect = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const isLocked = isGuest && !game.guestAllowed;
    if (isLocked) return;

    if (gameId === 'zed-legacy') {
      setSelectedGame('zed-legacy');
      setSelectedSubject(''); // No subject needed
      return;
    }

    // Show subject selection modal for other games
    setPendingGameId(gameId);
    setShowSubjectModal(true);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedGame(pendingGameId);
    setShowSubjectModal(false);
    setPendingGameId('');
  };

  const handleBackToArcade = () => {
    setSelectedGame(null);
    setSelectedSubject('');
  };

  const renderGameComponent = () => {
    if (selectedGame === 'zed-legacy') {
      return <ZedLegacyGame onBack={handleBackToArcade} />;
    }
    const gameConfig = {
      subject: selectedSubject,
      topic: 'general',
      questionCount: 10,
      timeLimit: 300
    };

    const commonProps = {
      config: gameConfig,
      onBack: handleBackToArcade,
      isGuest,
      onUpdateProgress
    };

    switch (selectedGame) {
      case 'mulungushi-quiz':
        return <BrainBuster {...commonProps} />;
      case 'luangwa-flip':
        return <Flashcards {...commonProps} />;
      case 'zambezi-rush':
        return <TimeChallenge {...commonProps} />;
      case 'kundalila-puzzles':
        return <JumbleMaster {...commonProps} />;
      case 'kalambo-clash':
        return <ClassChallenge {...commonProps} />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return renderGameComponent();
  }

  return (
    <AppLayout>
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 hover:bg-green-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="gradient-eagle w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg animate-float">
              <Gamepad2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Game Arcade
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Learn through play! Choose from our collection of educational games designed to make studying fun and engaging.
          </p>
          
          {isGuest && (
            <div className="mt-6 glass-effect rounded-xl p-6 max-w-2xl mx-auto border border-amber-200 animate-scale-in">
              <div className="flex items-center justify-center space-x-2 text-amber-800">
                <Target className="h-6 w-6" />
                <span className="font-semibold text-lg">Guest Mode: Full Access Available</span>
              </div>
              <p className="text-amber-700 mt-2">
                Try all games! Create an account to save your progress and unlock premium features!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Eagle Mascot Introduction */}
      <Card className="mb-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-300 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative flex flex-col items-center">
                              <Mascot size="lg" mood="excited" showBubble={false} className="transform hover:scale-110 transition-transform duration-300" />
              <span className="mt-2 text-xs text-amber-700 font-semibold tracking-wide">Chisomo the Mascot</span>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-yellow-800" />
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent mb-3">
                Meet Chisomo the Eagle!
              </h3>
              <p className="text-amber-800 text-lg leading-relaxed">
                Your wise learning companion will guide you through each game with helpful tips, concept nuggets, and encouragement. 
                The eagle represents wisdom and soaring to new heights - just like your academic journey in Zambia!
              </p>
              <div className="mt-4 flex items-center justify-center md:justify-start space-x-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                <span className="text-amber-700 font-medium">Ready to soar to new learning heights?</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Game Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {games.map((game, index) => {
          const Icon = game.icon;
          const isLocked = isGuest && !game.guestAllowed;
          
          return (
            <Card 
              key={game.id} 
              className={`
                group relative overflow-hidden animate-slide-up
                ${isLocked 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'cursor-pointer hover:shadow-2xl'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => !isLocked && handleGameSelect(game.id)}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center">
                  <div className="text-center bg-white p-4 rounded-lg shadow-lg border">
                    <div className="text-3xl mb-2">🔒</div>
                    <p className="text-sm font-medium text-gray-900">Create Account</p>
                    <p className="text-xs text-gray-600">to unlock this game</p>
                  </div>
                </div>
              )}
              
              {/* Enhanced Game Header with Zambian Theme */}
              <div className={`bg-gradient-to-br ${game.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-90 font-medium">{game.players}</div>
                      <div className="text-sm font-bold">{game.duration}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    {game.title}
                  </h3>
                  <p className="text-white/95 text-sm leading-relaxed">{game.description}</p>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {game.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Play Button */}
                <Button 
                  className="w-full" 
                  disabled={isLocked}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) handleGameSelect(game.id);
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isLocked ? 'Locked' : 'Play Game'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">Game Modes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{isGuest ? '0' : '1,247'}</div>
            <div className="text-sm text-gray-600">Games Played</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{isGuest ? '0' : '89%'}</div>
            <div className="text-sm text-gray-600">Best Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{isGuest ? '0' : '15'}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {!isGuest && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Game Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { game: 'Brain Buster', subject: 'Mathematics', score: '85%', time: '2 hours ago' },
                { game: 'Time Challenge', subject: 'Sciences', score: '92%', time: '1 day ago' },
                { game: 'Flashcards', subject: 'Computer Studies', score: '78%', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.game}</p>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{activity.score}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subject Selection Modal */}
      {showSubjectModal && (
        <SubjectSelectionModal
          gameId={pendingGameId}
          onSubjectSelect={handleSubjectSelect}
          onClose={() => {
            setShowSubjectModal(false);
            setPendingGameId('');
          }}
        />
      )}
    </div>
    </AppLayout>
  );
}