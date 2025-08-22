import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Trophy,
  Target,
  Lightbulb,
  RotateCcw,
  User,
  Star,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import mathematicsBrainBuster from '../questions/BrainBuster/MathematicsBrainBuster';
import computerStudiesBrainBuster from '../questions/BrainBuster/ComputerStudiesBrainBuster';
import scienceBrainBuster from '../questions/BrainBuster/ScienceBrainBuster';
import religiousEducationBrainBuster from '../questions/BrainBuster/ReligiousEducationBrainBuster';
import { trackEvent } from '../../../utils/analytics';
import Logo from '../../ui/Logo';

interface BrainBusterProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
    timeLimit: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function BrainBuster({ config, onBack, isGuest = false, onUpdateProgress }: BrainBusterProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showMathTips, setShowMathTips] = useState(false);

  // Subject-specific questions
  const questionSets = {
    mathematics: mathematicsBrainBuster,
    'computer-studies': computerStudiesBrainBuster,
    sciences: scienceBrainBuster,
    'religious-education': religiousEducationBrainBuster,
  };

  const currentQuestions = questionSets[config.subject as keyof typeof questionSets] || questionSets.mathematics;
  const currentQuestionData = currentQuestions[currentQuestion % currentQuestions.length];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleGameComplete();
    }
  }, [timeLeft, gameState]);

  // Branching: Show math tips if user selects Math
  useEffect(() => {
    if (config.subject === 'mathematics') {
      setShowMathTips(true);
    } else {
      setShowMathTips(false);
    }
  }, [config.subject]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);
      setShowFeedback(true);
      
      // Update score
      if (selectedAnswer === currentQuestionData.correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 >= config.questionCount) {
      handleGameComplete();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleGameComplete = () => {
    setGameState('completed');
    
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        timeSpent: Math.floor((config.timeLimit - timeLeft) / 60),
        pointsEarned: score * 10
      });
    }
    trackEvent('game_completed', {
      game: 'BrainBuster',
      score,
      timeSpent: config.timeLimit - timeLeft
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateFinalScore = () => {
    const correctAnswers = Object.values(answers).filter((answer, index) => 
      answer === currentQuestions[index % currentQuestions.length].correct
    ).length;
    return Math.round((correctAnswers / config.questionCount) * 100);
  };

  if (gameState === 'completed') {
    const finalScore = calculateFinalScore();
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <Logo className="text-6xl mb-4" />
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Brain Buster Complete!</h2>
              <p className="text-gray-600">Chisomo the Eagle is proud of your effort!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-green-600">{finalScore}%</h3>
                <p className="text-green-700">Final Score</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-blue-600">{score}/{config.questionCount}</h3>
                <p className="text-blue-700">Correct Answers</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-purple-600">{isGuest ? '0' : score * 10}</h3>
                <p className="text-purple-700">Points Earned</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Logo className="text-3xl" />
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Wisdom</h4>
                  <p className="text-amber-800">
                    {finalScore >= 80 
                      ? "Excellent work! You're soaring high like an eagle. Keep up this momentum!"
                      : finalScore >= 60
                      ? "Good effort! With more practice, you'll reach new heights. Eagles don't give up!"
                      : "Every expert was once a beginner. Keep practicing and you'll spread your wings soon!"
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
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brain Buster</h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                <Clock className="h-4 w-4 inline mr-1" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-600">Time Left</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentQuestion + 1}/{config.questionCount}
              </div>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{score}</div>
              <p className="text-xs text-gray-600">Correct</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / config.questionCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Target className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg text-gray-900 mb-6">{currentQuestionData.question}</p>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="text-purple-600"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Feedback */}
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === currentQuestionData.correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {selectedAnswer === currentQuestionData.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${
                    selectedAnswer === currentQuestionData.correct ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {selectedAnswer === currentQuestionData.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className={`text-sm ${
                  selectedAnswer === currentQuestionData.correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {currentQuestionData.explanation}
                </p>
              </div>

              {/* Eagle Tip */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Logo className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">Chisomo Wisdom</h4>
                    <p className="text-amber-800 text-sm">{currentQuestionData.eagleTip}</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleNextQuestion} className="w-full">
                {currentQuestion + 1 >= config.questionCount ? 'Finish Game' : 'Next Question'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}