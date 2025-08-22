import React from 'react';
import { 
  Target, 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  Zap,
  Award,
  Lock,
  UserPlus,
  CheckCircle,
  Play
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface Challenge {
  id: number;
  title: string;
  subject: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  timeLeft?: string;
  startsIn?: string;
  completedOn?: string;
  points: number;
  progress?: number;
  rank?: number;
  type: 'weekly' | 'quiz' | 'project' | 'debate' | 'coding' | 'tournament';
  guestAllowed: boolean;
  status: 'active' | 'upcoming' | 'completed';
  requirements?: string[];
  rewards?: string[];
}

interface ChallengeCardProps {
  challenge: Challenge;
  isGuest?: boolean;
  onJoin?: (challengeId: number) => void;
  onContinue?: (challengeId: number) => void;
  onViewResults?: (challengeId: number) => void;
  onUpgrade?: () => void;
}

export function ChallengeCard({ 
  challenge, 
  isGuest = false, 
  onJoin, 
  onContinue, 
  onViewResults,
  onUpgrade 
}: ChallengeCardProps) {
  const isLocked = isGuest && !challenge.guestAllowed;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weekly': return Target;
      case 'quiz': return Trophy;
      case 'project': return Zap;
      case 'debate': return Users;
      case 'coding': return Award;
      case 'tournament': return Star;
      default: return Target;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weekly': 
      case 'speed': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'quiz': 
      case 'accuracy': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'project': 
      case 'endurance': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'debate': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'coding': return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
      case 'tournament': return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const TypeIcon = getTypeIcon(challenge.type);

  return (
    <Card className={`transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 ${
      isLocked ? 'opacity-75' : 'hover:-translate-y-2 hover:scale-105'
    }`}>
      {isLocked && (
        <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center rounded-lg">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg border max-w-xs">
            <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Create Account</h3>
            <p className="text-sm text-gray-600 mb-4">Join challenges and compete with classmates</p>
            <Button onClick={onUpgrade} size="sm" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up Free
            </Button>
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        {/* Header with gradient based on type */}
        <div className={`p-6 ${getTypeColor(challenge.type)} bg-gradient-to-r shadow-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TypeIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{challenge.title}</h3>
                <p className="text-white/90 text-sm">{challenge.subject}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-white/50 bg-black/30 backdrop-blur-sm text-white shadow-lg`}>
                {challenge.difficulty}
              </span>
              <span className="text-xs font-bold capitalize bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                {challenge.type}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-white to-gray-50">
          <p className="text-gray-700 mb-4 text-sm leading-relaxed font-medium">{challenge.description}</p>

          {/* Challenge Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 p-2 rounded-xl">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{challenge.participants} participants</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 p-2 rounded-xl">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{challenge.points} points</span>
            </div>
          </div>

          {/* Progress Bar for Active Challenges */}
          {challenge.status === 'active' && challenge.progress !== undefined && !isGuest && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-blue-900">Your Progress</span>
                <span className="text-blue-700 font-bold">{challenge.progress}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-3 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Requirements for Upcoming Challenges */}
          {challenge.status === 'upcoming' && challenge.requirements && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl shadow-sm">
              <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Requirements:
              </h4>
              <ul className="text-xs text-blue-800 space-y-2">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-2 bg-white/50 p-2 rounded-xl">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rewards */}
          {challenge.rewards && (
            <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl shadow-sm">
              <h4 className="text-sm font-bold text-yellow-900 mb-3 flex items-center">
                <Trophy className="h-4 w-4 mr-2" />
                Rewards:
              </h4>
              <div className="flex flex-wrap gap-2">
                {challenge.rewards.map((reward, index) => (
                  <span key={index} className="text-xs bg-gradient-to-r from-yellow-200 to-amber-200 text-yellow-800 px-3 py-1 rounded-full font-bold shadow-sm">
                    {reward}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50 rounded-b-xl">
            {challenge.status === 'active' && (
              <>
                <div className="flex items-center text-sm text-orange-700 bg-gradient-to-r from-orange-100 to-orange-200 px-3 py-2 rounded-xl border border-orange-300 shadow-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-bold">{challenge.timeLeft} left</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={isLocked}
                  onClick={() => onContinue?.(challenge.id)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {isGuest && challenge.guestAllowed ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Try Sample
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </>
                  )}
                </Button>
              </>
            )}
            
            {challenge.status === 'upcoming' && (
              <>
                <div className="flex items-center text-sm text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-2 rounded-xl border border-blue-300 shadow-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-bold">Starts in {challenge.startsIn}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={isLocked}
                  onClick={() => onJoin?.(challenge.id)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {isLocked ? 'Locked' : 'Join Challenge'}
                </Button>
              </>
            )}
            
            {challenge.status === 'completed' && (
              <>
                <div className="flex items-center space-x-4 text-sm text-gray-700">
                  {!isGuest && challenge.rank && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-2 rounded-xl border border-yellow-300 shadow-sm">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                      <span className="font-bold text-yellow-800">Rank #{challenge.rank}</span>
                    </div>
                  )}
                  <span className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 rounded-xl font-medium text-gray-800 border border-gray-300 shadow-sm">{challenge.completedOn}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={isLocked}
                  onClick={() => onViewResults?.(challenge.id)}
                  className="border-green-300 text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  View Results
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}