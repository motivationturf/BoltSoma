import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Trophy, 
  Target, 
  Calendar,
  CheckCircle,
  Star,
  Share2,
  Bookmark,
  Play,
  UserPlus
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface ChallengeDetailProps {
  challengeId: number;
  onBack: () => void;
  onJoin?: () => void;
  onStart?: () => void;
  isGuest?: boolean;
  onUpgrade?: () => void;
}

export function ChallengeDetail({ 
  challengeId, 
  onBack, 
  onJoin, 
  onStart, 
  isGuest = false,
  onUpgrade 
}: ChallengeDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock challenge data - in real app this would come from API
  const challenge = {
    id: challengeId,
    title: 'Weekly Mathematics Challenge',
    subject: 'Mathematics',
    description: 'Test your mathematical prowess with complex algebra problems and compete with your classmates for the top spot.',
    fullDescription: `This week's mathematics challenge focuses on advanced algebraic concepts including quadratic equations, polynomial functions, and systems of equations. You'll have 5 days to complete a series of increasingly difficult problems that test both your computational skills and problem-solving abilities.

The challenge is designed to reinforce key concepts from your Grade 11 mathematics curriculum while providing an engaging competitive element. Each problem is worth different points based on difficulty, and you can earn bonus points for creative solutions or helping other participants.`,
    difficulty: 'Hard',
    type: 'weekly',
    status: 'active',
    participants: 45,
    maxParticipants: 100,
    timeLeft: '2 days 14 hours',
    points: 500,
    bonusPoints: 100,
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    requirements: [
      'Complete Grade 10 Algebra module',
      'Minimum 70% score in previous math quizzes',
      'Active participation in math discussions'
    ],
    rewards: [
      '500 Base Points',
      '100 Bonus Points',
      'Math Champion Badge',
      'Leaderboard Recognition',
      'Certificate of Achievement'
    ],
    rules: [
      'No external calculators or tools allowed',
      'Each problem has a time limit of 15 minutes',
      'You can attempt each problem up to 3 times',
      'Collaboration is encouraged in discussion forums',
      'Final submission deadline is strictly enforced'
    ],
    topics: [
      'Quadratic Equations',
      'Polynomial Functions',
      'Systems of Equations',
      'Factoring',
      'Graphing Functions'
    ],
    leaderboard: [
      { rank: 1, name: 'Sarah Mwanza', score: 450, avatar: 'SM' },
      { rank: 2, name: 'John Banda', score: 420, avatar: 'JB' },
      { rank: 3, name: 'Grace Phiri', score: 380, avatar: 'GP' },
      { rank: 4, name: 'David Tembo', score: 350, avatar: 'DT' },
      { rank: 5, name: 'Mary Zulu', score: 320, avatar: 'MZ' }
    ],
    guestAllowed: true
  };

  const isLocked = isGuest && !challenge.guestAllowed;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenges
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{challenge.title}</h1>
              {isGuest && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                  Guest Mode
                </span>
              )}
            </div>
            <p className="text-lg text-gray-600 mb-4">{challenge.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{challenge.subject}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{challenge.participants}/{challenge.maxParticipants} participants</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-orange-600 font-medium">{challenge.timeLeft} left</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-600 font-medium">{challenge.points} points</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Challenge Details</h3>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {challenge.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Topics Covered */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Topics Covered</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {challenge.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Challenge Rules</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {challenge.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Current Leaderboard */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Current Leaderboard</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {challenge.leaderboard.map((participant) => (
                  <div key={participant.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                        participant.rank === 1 ? 'bg-yellow-500' :
                        participant.rank === 2 ? 'bg-gray-400' :
                        participant.rank === 3 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {participant.rank <= 3 ? (
                          <Trophy className="h-4 w-4" />
                        ) : (
                          participant.avatar
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">#{participant.rank} {participant.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{participant.score}</p>
                      <p className="text-xs text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className={`${isLocked ? 'opacity-75' : ''}`}>
            <CardContent className="p-6">
              {isLocked ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Create Account to Join</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign up to participate in challenges and compete with classmates.
                  </p>
                  <Button onClick={onUpgrade} className="w-full">
                    Create Free Account
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {challenge.points}
                    </div>
                    <p className="text-sm text-gray-600">Base Points</p>
                    {challenge.bonusPoints > 0 && (
                      <div className="mt-2">
                        <div className="text-lg font-semibold text-yellow-600">
                          +{challenge.bonusPoints}
                        </div>
                        <p className="text-xs text-gray-600">Bonus Points Available</p>
                      </div>
                    )}
                  </div>
                  
                  {challenge.status === 'active' && (
                    <Button onClick={onStart} className="w-full mb-3">
                      <Play className="h-4 w-4 mr-2" />
                      {isGuest ? 'Try Sample' : 'Start Challenge'}
                    </Button>
                  )}
                  
                  {challenge.status === 'upcoming' && (
                    <Button onClick={onJoin} className="w-full mb-3">
                      Join Challenge
                    </Button>
                  )}
                  
                  <div className="text-xs text-gray-600">
                    {challenge.participants} students already joined
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Requirements</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Rewards</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {challenge.rewards.map((reward, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">{reward}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenge Info */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Challenge Info</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`font-medium ${
                    challenge.difficulty === 'Easy' ? 'text-green-600' :
                    challenge.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{challenge.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{challenge.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{challenge.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Participants:</span>
                  <span className="font-medium">{challenge.maxParticipants}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}