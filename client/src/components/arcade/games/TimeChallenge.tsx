import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  ArrowLeft, 
  Zap, 
  Trophy, 
  Target,
  CheckCircle,
  XCircle,
  RotateCcw,
  Flame
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import mathematicsTimeChallenge from '../questions/TimeChallenge/MathematicsTimeChallenge';
import computerStudiesTimeChallenge from '../questions/TimeChallenge/ComputerStudiesTimeChallenge';
import scienceTimeChallenge from '../questions/TimeChallenge/ScienceTimeChallenge';
import religiousEducationTimeChallenge from '../questions/TimeChallenge/ReligiousEducationTimeChallenge';
import Logo from '../../ui/Logo';

interface TimeChallengeProps {
  config: {
    subject: string;
    topic: string;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function TimeChallenge({ config, onBack, isGuest = false, onUpdateProgress }: TimeChallengeProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [multiplier, setMultiplier] = useState(1);

  // Subject-specific quick-fire questions
  const questionSets = {
    mathematics: mathematicsTimeChallenge,
    'computer-studies': computerStudiesTimeChallenge,
    sciences: scienceTimeChallenge,
    'religious-education': religiousEducationTimeChallenge,
  };

  const questionSet = questionSets[config.subject as keyof typeof questionSets] || questionSets.mathematics;
  const currentQuestionData = questionSet[currentQuestion % questionSet.length];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
      if (isGuest && onUpdateProgress) {
        onUpdateProgress({
          timeSpent: 1,
          pointsEarned: score
        });
      }
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(0);
    setMultiplier(1);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestionData.correct;
    
    if (isCorrect) {
      setFeedback('correct');
      const points = 10 * multiplier;
      setScore(score + points);
      setStreak(streak + 1);
      
      // Increase multiplier every 5 correct answers
      if ((streak + 1) % 5 === 0) {
        setMultiplier(Math.min(multiplier + 1, 5));
      }
    } else {
      setFeedback('incorrect');
      setStreak(0);
      setMultiplier(1);
    }

    // Quick feedback then next question
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 800);
  };

  const resetGame = () => {
    setGameState('ready');
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(0);
    setMultiplier(1);
    setFeedback(null);
    setSelectedAnswer(null);
  };

  if (gameState === 'finished') {
    const questionsAnswered = currentQuestion;
    const accuracy = questionsAnswered > 0 ? Math.round((score / (questionsAnswered * 10)) * 100) : 0;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <Logo className="h-16 w-16 mx-auto mb-4" />
              <Timer className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Time's Up!</h2>
              <p className="text-gray-600">Chisomo the Eagle is impressed with your speed!</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-blue-600">{score}</h3>
                <p className="text-blue-700">Final Score</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-green-600">{questionsAnswered}</h3>
                <p className="text-green-700">Questions</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-purple-600">{accuracy}%</h3>
                <p className="text-purple-700">Accuracy</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-orange-600">{Math.max(...[streak])}</h3>
                <p className="text-orange-700">Best Streak</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Logo className="text-3xl" />
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Speed Wisdom</h4>
                  <p className="text-amber-800">
                    {score >= 100 
                      ? "Lightning fast! Your quick thinking rivals an eagle's swift dive!"
                      : score >= 50
                      ? "Good speed! With practice, you'll soar even faster through questions!"
                      : "Speed comes with practice! Even eagles had to learn to fly quickly!"
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Arcade
              </Button>
              <Button variant="outline" onClick={resetGame}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'ready') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>

        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-8">
              <Timer className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Time Challenge</h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Answer as many questions as possible in 60 seconds!
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <Logo className="text-3xl" />
                  <div className="text-left">
                    <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Speed Tips</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• Trust your first instinct - eagles strike fast!</li>
                      <li>• Build streaks for bonus multipliers</li>
                      <li>• Every 5 correct answers increases your multiplier</li>
                      <li>• Speed matters, but accuracy builds your score</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <Timer className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-900">60 Seconds</h3>
                <p className="text-red-700 text-sm">Lightning fast gameplay</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Quick Questions</h3>
                <p className="text-blue-700 text-sm">Rapid-fire format</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <Flame className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Streak Bonus</h3>
                <p className="text-purple-700 text-sm">Multiplier rewards</p>
              </div>
            </div>

            <Button size="lg" onClick={startGame} className="px-12 py-4 text-lg">
              <Zap className="h-5 w-5 mr-2" />
              Start Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Game Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Timer className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Time Challenge</h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-red-600'}`}>
                {timeLeft}
              </div>
              <p className="text-xs text-gray-600">Seconds</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <p className="text-xs text-gray-600">Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{streak}</div>
              <p className="text-xs text-gray-600">Streak</p>
            </div>
            {multiplier > 1 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">×{multiplier}</div>
                <p className="text-xs text-gray-600">Multiplier</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                timeLeft <= 10 ? 'bg-red-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className={`mb-6 transition-all duration-300 ${
        feedback === 'correct' ? 'border-green-500 bg-green-50' :
        feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
        'border-gray-200'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
            </div>
            {feedback && (
              <div className="flex items-center space-x-2">
                {feedback === 'correct' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <span className={`font-medium ${
                  feedback === 'correct' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {feedback === 'correct' ? `+${10 * multiplier} points` : 'Incorrect'}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              {currentQuestionData.q}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !feedback && handleAnswer(index)}
                  disabled={feedback !== null}
                  className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                    selectedAnswer === index
                      ? feedback === 'correct'
                        ? 'border-green-500 bg-green-100'
                        : feedback === 'incorrect'
                          ? 'border-red-500 bg-red-100'
                          : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  } ${feedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Indicator */}
      {streak >= 3 && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
            <Flame className="h-4 w-4" />
            <span className="font-medium">🔥 {streak} Streak! Keep going!</span>
          </div>
        </div>
      )}
    </div>
  );
}