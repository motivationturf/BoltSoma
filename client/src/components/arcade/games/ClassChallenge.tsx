import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ArrowLeft, 
  Crown, 
  Trophy, 
  Target,
  Clock,
  Zap,
  Star,
  Medal,
  CheckCircle,
  XCircle,
  Plus,
  Copy,
  Play,
  RotateCcw,
  Share2,
  Settings,
  UserPlus,
  Timer
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import Logo from '../../ui/Logo';

interface ClassChallengeProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

type ChallengeMode = 'menu' | 'create' | 'join' | 'lobby' | 'playing' | 'results';

interface Challenge {
  id: number;
  title: string;
  subject: string;
  topic: string;
  questionCount: number;
  timeLimit: number;
  inviteCode: string;
  status: string;
  questions: any[];
  participants: any[];
  creatorId: number;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  eagleTip: string;
}

export function ClassChallenge({ config, onBack, isGuest = false, onUpdateProgress }: ClassChallengeProps) {
  const [mode, setMode] = useState<ChallengeMode>('menu');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Mock user ID for demo - in real app this would come from auth context
  const userId = 1;

  // Subject-specific questions database
  const questionDatabase = {
    mathematics: [
      {
        question: "What is 15 × 12?",
        options: ["170", "180", "190", "200"],
        correct: 1,
        explanation: "15 × 12 = 180",
        eagleTip: "Break it down: 15 × 10 = 150, then 15 × 2 = 30, so 150 + 30 = 180!"
      },
      {
        question: "What is the area of a rectangle with length 8 and width 5?",
        options: ["35", "40", "45", "50"],
        correct: 1,
        explanation: "Area = length × width = 8 × 5 = 40",
        eagleTip: "Rectangle area is simple - just multiply length times width!"
      },
      {
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correct: 1,
        explanation: "25% of 80 = 0.25 × 80 = 20",
        eagleTip: "25% is the same as 1/4, so divide 80 by 4!"
      },
      {
        question: "What is √36?",
        options: ["4", "5", "6", "7"],
        correct: 2,
        explanation: "√36 = 6 because 6 × 6 = 36",
        eagleTip: "Think: what number times itself equals 36?"
      },
      {
        question: "What is the perimeter of a square with side length 6?",
        options: ["20", "22", "24", "26"],
        correct: 2,
        explanation: "Perimeter = 4 × side length = 4 × 6 = 24",
        eagleTip: "A square has 4 equal sides, so multiply the side length by 4!"
      }
    ],
    'computer-studies': [
      {
        question: "What does CPU stand for?",
        options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"],
        correct: 1,
        explanation: "CPU stands for Central Processing Unit - the brain of the computer",
        eagleTip: "The CPU is like my brain - it processes all the information!"
      },
      {
        question: "What is binary 1010 in decimal?",
        options: ["8", "10", "12", "14"],
        correct: 1,
        explanation: "1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10",
        eagleTip: "Binary uses powers of 2: 8, 4, 2, 1 from left to right!"
      },
      {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<link>", "<a>", "<url>", "<href>"],
        correct: 1,
        explanation: "The <a> tag (anchor) creates hyperlinks in HTML",
        eagleTip: "Think 'anchor' - it anchors text to a destination!"
      },
      {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"],
        correct: 0,
        explanation: "RAM stands for Random Access Memory - temporary storage for active programs",
        eagleTip: "RAM is like my short-term memory - quick access but doesn't last!"
      }
    ],
    sciences: [
      {
        question: "What is the chemical formula for water?",
        options: ["H₂O", "HO₂", "H₃O", "H₂O₂"],
        correct: 0,
        explanation: "Water consists of 2 hydrogen atoms and 1 oxygen atom: H₂O",
        eagleTip: "Water is essential for all life - even eagles need it to survive!"
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correct: 2,
        explanation: "Mercury is the closest planet to the Sun in our solar system",
        eagleTip: "Mercury is so close to the Sun, a year there is only 88 Earth days!"
      },
      {
        question: "What gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
        explanation: "Plants absorb carbon dioxide (CO₂) and release oxygen during photosynthesis",
        eagleTip: "Plants are nature's air purifiers - they clean the air I fly through!"
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        explanation: "Gold's chemical symbol is Au, from the Latin word 'aurum'",
        eagleTip: "Many chemical symbols come from Latin names - that's why gold is Au!"
      }
    ],
    'religious-education': [
      {
        question: "Which religion was founded by Siddhartha Gautama?",
        options: ["Hinduism", "Buddhism", "Jainism", "Sikhism"],
        correct: 1,
        explanation: "Buddhism was founded by Siddhartha Gautama, who became known as the Buddha",
        eagleTip: "Buddha means 'the awakened one' - wisdom comes from understanding!"
      },
      {
        question: "What is the holy book of Islam?",
        options: ["Bible", "Torah", "Quran", "Vedas"],
        correct: 2,
        explanation: "The Quran is the central religious text of Islam",
        eagleTip: "Different faiths have different sacred texts that guide their believers!"
      },
      {
        question: "What does the Golden Rule teach?",
        options: ["Pray daily", "Give to charity", "Treat others as you want to be treated", "Fast regularly"],
        correct: 2,
        explanation: "The Golden Rule teaches us to treat others as we would like to be treated",
        eagleTip: "This wise principle appears in many different religions around the world!"
      }
    ]
  };

  const apiRequest = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const generateQuestions = (subject: string, count: number): Question[] => {
    const subjectQuestions = questionDatabase[subject as keyof typeof questionDatabase] || questionDatabase.mathematics;
    const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleCreateChallenge = async (challengeData: any) => {
    setLoading(true);
    setError('');
    
    try {
      const questions = generateQuestions(challengeData.subject, challengeData.questionCount);
      
      const challenge = await apiRequest('/api/challenges', {
        method: 'POST',
        body: JSON.stringify({
          ...challengeData,
          creatorId: userId,
          questions
        })
      });
      
      setCurrentChallenge(challenge);
      setMode('lobby');
    } catch (error) {
      setError('Failed to create challenge. Please try again.');
      console.error('Create challenge error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinChallenge = async (inviteCode: string) => {
    setLoading(true);
    setError('');
    
    try {
      const challenge = await apiRequest(`/api/challenges/code/${inviteCode}`);
      
      await apiRequest(`/api/challenges/${challenge.id}/join`, {
        method: 'POST',
        body: JSON.stringify({ userId })
      });
      
      setCurrentChallenge(challenge);
      setMode('lobby');
    } catch (error) {
      setError('Challenge not found or unable to join.');
      console.error('Join challenge error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyInviteCode = () => {
    if (currentChallenge) {
      navigator.clipboard.writeText(currentChallenge.inviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (mode === 'menu') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Challenge</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create or join multiplayer challenges with friends and classmates. Compete in real-time quizzes and climb the leaderboard!
          </p>
        </div>

        {isGuest && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-amber-800">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Guest Mode: Full Access</span>
            </div>
            <p className="text-amber-700 text-sm mt-1 text-center">
              Try the challenge! Create an account to save your progress and unlock premium features!
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setMode('create')}>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create Challenge</h3>
              <p className="text-gray-600">
                Set up a new challenge for your class or study group
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setMode('join')}>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Join Challenge</h3>
              <p className="text-gray-600">
                Enter an invite code to join an existing challenge
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => setMode('menu')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">Create New Challenge</h2>
            <p className="text-gray-600">Set up a multiplayer quiz for your class</p>
          </CardHeader>
          <CardContent>
            <CreateChallengeForm 
              onSubmit={handleCreateChallenge}
              loading={loading}
              error={error}
              defaultSubject={config.subject}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => setMode('menu')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">Join Challenge</h2>
            <p className="text-gray-600">Enter the invite code to join an existing challenge</p>
          </CardHeader>
          <CardContent>
            <JoinChallengeForm 
              onSubmit={handleJoinChallenge}
              loading={loading}
              error={error}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'lobby' && currentChallenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => setMode('menu')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentChallenge.title}</h2>
                <p className="text-gray-600">{currentChallenge.subject} • {currentChallenge.questionCount} questions</p>
              </div>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-2 rounded font-mono text-lg">
                  {currentChallenge.inviteCode}
                </code>
                <Button variant="outline" size="sm" onClick={copyInviteCode}>
                  <Copy className="h-4 w-4" />
                  {copiedCode ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Challenge Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{currentChallenge.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{currentChallenge.questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Limit:</span>
                    <span className="font-medium">{Math.floor(currentChallenge.timeLimit / 60)} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">{currentChallenge.status}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Participants ({currentChallenge.participants?.length || 0})
                </h3>
                <div className="space-y-2">
                  {currentChallenge.participants?.map((participant, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {participant.name?.[0] || 'U'}
                        </span>
                      </div>
                      <span className="text-sm">{participant.name || `User ${participant.userId}`}</span>
                      {participant.userId === currentChallenge.creatorId && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  )) || (
                    <p className="text-gray-500 text-sm">Waiting for participants...</p>
                  )}
                </div>
              </div>
            </div>

            {currentChallenge.creatorId === userId && (
              <div className="mt-6 pt-6 border-t">
                <Button 
                  onClick={() => setMode('playing')} 
                  className="w-full"
                  disabled={!currentChallenge.participants?.length}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Challenge
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Logo className="inline h-5 w-5 align-middle" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Chisomo's Challenge Tips</h4>
              <p className="text-amber-800 text-sm">
                Share the invite code with your classmates! Once everyone joins, 
                the challenge creator can start the game. Remember: no answer edits once submitted!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Challenge Mode Coming Soon!</h2>
        <p className="text-gray-600 mb-6">
          The full challenge experience is being prepared. For now, enjoy the other game modes!
        </p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>
      </div>
    </div>
  );
}

// Form Components
function CreateChallengeForm({ onSubmit, loading, error, defaultSubject }: {
  onSubmit: (data: any) => void;
  loading: boolean;
  error: string;
  defaultSubject: string;
}) {
  const [formData, setFormData] = useState({
    title: '',
    subject: defaultSubject,
    topic: 'general',
    questionCount: 5,
    timeLimit: 300, // 5 minutes in seconds
    maxParticipants: 10
  });

  const subjects = [
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'computer-studies', name: 'Computer Studies/ICT' },
    { id: 'sciences', name: 'Sciences' },
    { id: 'religious-education', name: 'Religious Education' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Challenge Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Grade 10 Math Quiz"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Select subject"
          title="Select subject"
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions
          </label>
          <select
            value={formData.questionCount}
            onChange={(e) => setFormData({ ...formData, questionCount: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select number of questions"
            title="Select number of questions"
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Limit
          </label>
          <select
            value={formData.timeLimit}
            onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select time limit"
            title="Select time limit"
          >
            <option value={300}>5 minutes</option>
            <option value={600}>10 minutes</option>
            <option value={900}>15 minutes</option>
            <option value={1200}>20 minutes</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Challenge'}
      </Button>
    </form>
  );
}

function JoinChallengeForm({ onSubmit, loading, error }: {
  onSubmit: (code: string) => void;
  loading: boolean;
  error: string;
}) {
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inviteCode.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Invite Code
        </label>
        <input
          type="text"
          required
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg"
          placeholder="Enter 8-character code"
          maxLength={8}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || inviteCode.length !== 8}>
        {loading ? 'Joining...' : 'Join Challenge'}
      </Button>
    </form>
  );
}