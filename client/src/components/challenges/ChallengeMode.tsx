import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Clock, 
  Users, 
  Trophy, 
  Zap, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Star,
  Award,
  Timer,
  Brain,
  Flame,
  Crown,
  Medal
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AppLayout } from '../layout/AppLayout';

interface ChallengeModeProps {
  challengeId: number;
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

interface Challenge {
  id: number;
  title: string;
  subject: string;
  type: 'speed' | 'accuracy' | 'endurance' | 'multiplayer';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  questionCount: number;
  points: number;
  description: string;
  questions: Question[];
  participants?: Participant[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  timeLimit?: number;
  explanation: string;
  category: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  questionsAnswered: number;
  isCurrentUser?: boolean;
}

export function ChallengeMode({ challengeId, onBack, isGuest = false, onUpdateProgress }: ChallengeModeProps) {
  const [gameState, setGameState] = useState<'lobby' | 'countdown' | 'playing' | 'results'>('lobby');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [countdownTime, setCountdownTime] = useState(3);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  // Mock challenge data
  const challenges: Record<number, Challenge> = {
    1: {
      id: 1,
      title: 'Math Speed Challenge',
      subject: 'Mathematics',
      type: 'speed',
      difficulty: 'Medium',
      timeLimit: 300, // 5 minutes
      questionCount: 20,
      points: 500,
      description: 'Answer as many math questions as possible in 5 minutes!',
      questions: [
        {
          id: 1,
          question: 'What is 15 × 8?',
          options: ['110', '120', '130', '140'],
          correctAnswer: 1,
          points: 25,
          timeLimit: 15,
          explanation: '15 × 8 = 120',
          category: 'Multiplication'
        },
        {
          id: 2,
          question: 'Solve: 144 ÷ 12',
          options: ['10', '11', '12', '13'],
          correctAnswer: 2,
          points: 25,
          timeLimit: 15,
          explanation: '144 ÷ 12 = 12',
          category: 'Division'
        },
        {
          id: 3,
          question: 'What is 25% of 80?',
          options: ['15', '20', '25', '30'],
          correctAnswer: 1,
          points: 30,
          timeLimit: 20,
          explanation: '25% of 80 = 0.25 × 80 = 20',
          category: 'Percentages'
        },
        {
          id: 4,
          question: 'Solve: 3x + 7 = 22',
          options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
          correctAnswer: 2,
          points: 35,
          timeLimit: 25,
          explanation: '3x = 22 - 7 = 15, so x = 5',
          category: 'Algebra'
        },
        {
          id: 5,
          question: 'What is the area of a circle with radius 5?',
          options: ['25π', '10π', '15π', '20π'],
          correctAnswer: 0,
          points: 40,
          timeLimit: 30,
          explanation: 'Area = πr² = π × 5² = 25π',
          category: 'Geometry'
        }
      ],
      participants: [
        { id: 'user', name: 'You', avatar: '🦅', score: 0, questionsAnswered: 0, isCurrentUser: true },
        { id: '1', name: 'Sarah M.', avatar: '⭐', score: 0, questionsAnswered: 0 },
        { id: '2', name: 'John B.', avatar: '🚀', score: 0, questionsAnswered: 0 },
        { id: '3', name: 'Grace P.', avatar: '💎', score: 0, questionsAnswered: 0 },
        { id: '4', name: 'David T.', avatar: '⚡', score: 0, questionsAnswered: 0 }
      ]
    },
    2: {
      id: 2,
      title: 'Science Knowledge Battle',
      subject: 'Sciences',
      type: 'accuracy',
      difficulty: 'Hard',
      timeLimit: 600, // 10 minutes
      questionCount: 15,
      points: 750,
      description: 'Test your scientific knowledge with precision!',
      questions: [
        {
          id: 1,
          question: 'What is the chemical symbol for gold?',
          options: ['Go', 'Gd', 'Au', 'Ag'],
          correctAnswer: 2,
          points: 50,
          timeLimit: 30,
          explanation: 'Gold\'s chemical symbol is Au, from the Latin word "aurum"',
          category: 'Chemistry'
        },
        {
          id: 2,
          question: 'Which planet is closest to the Sun?',
          options: ['Venus', 'Earth', 'Mercury', 'Mars'],
          correctAnswer: 2,
          points: 50,
          timeLimit: 25,
          explanation: 'Mercury is the closest planet to the Sun',
          category: 'Astronomy'
        },
        {
          id: 3,
          question: 'What is the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
          correctAnswer: 1,
          points: 50,
          timeLimit: 30,
          explanation: 'Mitochondria produce energy (ATP) for the cell',
          category: 'Biology'
        }
      ],
      participants: [
        { id: 'user', name: 'You', avatar: '🦅', score: 0, questionsAnswered: 0, isCurrentUser: true },
        { id: '1', name: 'Alice K.', avatar: '🔬', score: 0, questionsAnswered: 0 },
        { id: '2', name: 'Mark R.', avatar: '🧪', score: 0, questionsAnswered: 0 },
        { id: '3', name: 'Lisa W.', avatar: '🌟', score: 0, questionsAnswered: 0 }
      ]
    }
  };

  const challenge = challenges[challengeId] || challenges[1];
  const currentQuestionData = challenge.questions[currentQuestion];

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === 'countdown' && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'countdown' && countdownTime === 0) {
      setGameState('playing');
      setTimeLeft(challenge.timeLimit);
      setQuestionStartTime(Date.now());
    }

    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleChallengeComplete();
    }

    return () => clearInterval(interval);
  }, [gameState, countdownTime, timeLeft]);

  // Simulate other participants' progress
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setParticipants(prev => prev.map(p => {
          if (p.isCurrentUser) return p;
          
          // Simulate other players answering questions
          const shouldAnswer = Math.random() > 0.7; // 30% chance per second
          if (shouldAnswer && p.questionsAnswered < challenge.questionCount) {
            const isCorrect = Math.random() > 0.3; // 70% accuracy
            const points = isCorrect ? Math.floor(Math.random() * 50) + 25 : 0;
            return {
              ...p,
              score: p.score + points,
              questionsAnswered: p.questionsAnswered + 1
            };
          }
          return p;
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [gameState, challenge.questionCount]);

  const startChallenge = () => {
    setGameState('countdown');
    setCountdownTime(3);
    setParticipants(challenge.participants || []);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
    const responseTime = Date.now() - questionStartTime;
    const timeBonus = Math.max(0, (currentQuestionData.timeLimit || 30) * 1000 - responseTime) / 1000;
    
    let points = 0;
    if (isCorrect) {
      points = currentQuestionData.points + Math.floor(timeBonus * 2); // Time bonus
      setScore(prev => prev + points);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    // Update user in participants
    setParticipants(prev => prev.map(p => 
      p.isCurrentUser 
        ? { ...p, score: score + points, questionsAnswered: currentQuestion + 1 }
        : p
    ));

    setUserAnswers(prev => ({ ...prev, [currentQuestion]: selectedAnswer }));
    setShowFeedback(true);

    // Auto-advance after feedback
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 >= challenge.questions.length) {
      handleChallengeComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handleChallengeComplete = () => {
    setGameState('results');
    
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        challengesTried: [challengeId.toString()],
        timeSpent: Math.floor((challenge.timeLimit - timeLeft) / 60),
        pointsEarned: score
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-purple-600 bg-purple-100';
    if (streak >= 5) return 'text-orange-600 bg-orange-100';
    if (streak >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  // Lobby State
  if (gameState === 'lobby') {
    return (
      <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenges
        </Button>

        <Card className="text-center overflow-hidden">
          <div className={`bg-gradient-to-r ${
            challenge.type === 'speed' ? 'from-red-500 to-orange-500' :
            challenge.type === 'accuracy' ? 'from-blue-500 to-purple-500' :
            challenge.type === 'endurance' ? 'from-green-500 to-teal-500' :
            'from-purple-500 to-pink-500'
          } p-8 text-white`}>
            <div className="text-6xl mb-4">
              {challenge.type === 'speed' ? '⚡' : 
               challenge.type === 'accuracy' ? '🎯' :
               challenge.type === 'endurance' ? '💪' : '👥'}
            </div>
            <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
            <p className="text-xl mb-6">{challenge.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 rounded-lg p-3">
                <Clock className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold">{formatTime(challenge.timeLimit)}</div>
                <div className="text-sm opacity-80">Time Limit</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Target className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold">{challenge.questionCount}</div>
                <div className="text-sm opacity-80">Questions</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Trophy className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold">{challenge.points}</div>
                <div className="text-sm opacity-80">Max Points</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold">{challenge.participants?.length || 1}</div>
                <div className="text-sm opacity-80">Players</div>
              </div>
            </div>
          </div>
          
          <CardContent className="p-8">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Challenge Rules</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Answer questions as quickly and accurately as possible</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Faster correct answers earn bonus points</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Build streaks for multiplier bonuses</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Compete with other players in real-time</span>
                </div>
              </div>
            </div>

            {challenge.participants && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Players Ready</h3>
                <div className="flex justify-center space-x-4">
                  {challenge.participants.map((participant) => (
                    <div key={participant.id} className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                        participant.isCurrentUser ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'
                      }`}>
                        {participant.avatar}
                      </div>
                      <p className={`text-sm font-medium ${
                        participant.isCurrentUser ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {participant.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button size="lg" onClick={startChallenge} className="px-12 py-4 text-lg">
              <Zap className="h-5 w-5 mr-2" />
              Start Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
      </AppLayout>
    );
  }

  // Countdown State
  if (gameState === 'countdown') {
    return (
      <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
        <Card className="text-center p-12">
          <div className="text-8xl font-bold text-blue-600 mb-4 animate-pulse">
            {countdownTime}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Get Ready!</h2>
          <p className="text-gray-600">Challenge starts in {countdownTime} second{countdownTime !== 1 ? 's' : ''}...</p>
        </Card>
      </div>
      </AppLayout>
    );
  }

  // Results State
  if (gameState === 'results') {
    const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);
    const userRank = sortedParticipants.findIndex(p => p.isCurrentUser) + 1;
    const accuracy = Math.round((Object.values(userAnswers).filter((answer, index) => 
      answer === challenge.questions[index]?.correctAnswer
    ).length / Object.keys(userAnswers).length) * 100) || 0;

    return (
      <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-8 text-white">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
            <p className="text-yellow-100">Amazing effort! Here are your results:</p>
          </div>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">#{userRank}</div>
                <p className="text-blue-700 font-medium">Final Rank</p>
                <div className="mt-2">{getRankIcon(userRank)}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{score}</div>
                <p className="text-green-700 font-medium">Total Score</p>
                <Trophy className="h-6 w-6 text-green-500 mx-auto mt-2" />
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{accuracy}%</div>
                <p className="text-purple-700 font-medium">Accuracy</p>
                <Target className="h-6 w-6 text-purple-500 mx-auto mt-2" />
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">{maxStreak}</div>
                <p className="text-orange-700 font-medium">Best Streak</p>
                <Flame className="h-6 w-6 text-orange-500 mx-auto mt-2" />
              </div>
            </div>

            {/* Final Leaderboard */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Final Leaderboard</h3>
              <div className="space-y-3">
                {sortedParticipants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      participant.isCurrentUser 
                        ? 'bg-green-50 border-2 border-green-200' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(index + 1)}
                      </div>
                      <div className="text-2xl">{participant.avatar}</div>
                      <div>
                        <p className={`font-medium ${
                          participant.isCurrentUser ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {participant.name}
                          {participant.isCurrentUser && <span className="ml-2 text-green-600">(You)</span>}
                        </p>
                        <p className="text-sm text-gray-600">
                          {participant.questionsAnswered} questions answered
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{participant.score}</p>
                      <p className="text-xs text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={onBack} className="bg-gradient-to-r from-blue-500 to-purple-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <Target className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </AppLayout>
    );
  }

  // Playing State
  return (
    <AppLayout>
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Game Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              challenge.type === 'speed' ? 'bg-red-500' :
              challenge.type === 'accuracy' ? 'bg-blue-500' :
              'bg-green-500'
            }`}>
              <Timer className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
              <p className="text-gray-600">Live Challenge</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${timeLeft <= 30 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-600">Time Left</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentQuestion + 1}/{challenge.questionCount}
              </div>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <p className="text-xs text-gray-600">Score</p>
            </div>
            {streak > 0 && (
              <div className="text-center">
                <div className={`text-2xl font-bold flex items-center space-x-1 ${getStreakColor(streak).split(' ')[0]}`}>
                  <Flame className="h-5 w-5" />
                  <span>{streak}</span>
                </div>
                <p className="text-xs text-gray-600">Streak</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / challenge.questionCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Question */}
        <div className="lg:col-span-2">
          <Card className={`mb-6 transition-all duration-300 ${
            showFeedback && selectedAnswer === currentQuestionData.correctAnswer ? 'border-green-500 bg-green-50' :
            showFeedback && selectedAnswer !== currentQuestionData.correctAnswer ? 'border-red-500 bg-red-50' :
            'border-gray-200'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {currentQuestionData.category}
                  </span>
                </div>
                {showFeedback && (
                  <div className="flex items-center space-x-2">
                    {selectedAnswer === currentQuestionData.correctAnswer ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestionData.question}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                        selectedAnswer === index
                          ? showFeedback && index === currentQuestionData.correctAnswer
                            ? 'border-green-500 bg-green-100'
                            : showFeedback
                              ? 'border-red-500 bg-red-100'
                              : 'border-blue-500 bg-blue-50'
                          : showFeedback && index === currentQuestionData.correctAnswer
                            ? 'border-green-500 bg-green-100'
                            : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm font-medium mb-2">
                    {selectedAnswer === currentQuestionData.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-blue-700 text-sm">{currentQuestionData.explanation}</p>
                </div>
              )}

              {!showFeedback && (
                <Button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Leaderboard */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Live Leaderboard</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {participants
                  .sort((a, b) => b.score - a.score)
                  .map((participant, index) => (
                    <div
                      key={participant.id}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                        participant.isCurrentUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6">
                          {getRankIcon(index + 1)}
                        </div>
                        <div className="text-xl">{participant.avatar}</div>
                        <div>
                          <p className={`font-medium text-sm ${
                            participant.isCurrentUser ? 'text-green-900' : 'text-gray-900'
                          }`}>
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {participant.questionsAnswered} answered
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{participant.score}</p>
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