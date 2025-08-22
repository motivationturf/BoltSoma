import React, { useState, useEffect } from 'react';
import { 
  Shuffle, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Trophy,
  Target,
  RotateCcw,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import mathematicsJumbleMaster from '../questions/JumbleMaster/MathematicsJumbleMaster';
import computerStudiesJumbleMaster from '../questions/JumbleMaster/ComputerStudiesJumbleMaster';
import scienceJumbleMaster from '../questions/JumbleMaster/ScienceJumbleMaster';
import religiousEducationJumbleMaster from '../questions/JumbleMaster/ReligiousEducationJumbleMaster';
import Logo from '../../ui/Logo';

interface JumbleMasterProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function JumbleMaster({ config, onBack, isGuest = false, onUpdateProgress }: JumbleMasterProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Subject-specific jumble puzzles
  const puzzleSets = {
    mathematics: mathematicsJumbleMaster,
    'computer-studies': computerStudiesJumbleMaster,
    sciences: scienceJumbleMaster,
    'religious-education': religiousEducationJumbleMaster,
  };

  const currentPuzzles = puzzleSets[config.subject as keyof typeof puzzleSets] || puzzleSets.mathematics;
  const currentPuzzleData = currentPuzzles[currentPuzzle % currentPuzzles.length];

  const checkAnswer = () => {
    const isCorrect = userAnswer.toUpperCase() === currentPuzzleData.answer.toUpperCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + Math.max(10 - attempts, 1)); // Fewer attempts = more points
    }
    
    setTimeout(() => {
      if (isCorrect) {
        nextPuzzle();
      } else {
        setFeedback(null);
      }
    }, 2000);
  };

  const nextPuzzle = () => {
    if (currentPuzzle + 1 >= config.questionCount) {
      setGameState('completed');
      if (isGuest && onUpdateProgress) {
        onUpdateProgress({
          timeSpent: 5,
          pointsEarned: score
        });
      }
    } else {
      setCurrentPuzzle(currentPuzzle + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setAttempts(0);
    }
  };

  const shuffleWord = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setUserAnswer('');
    setGameState('playing');
    setScore(0);
    setShowHint(false);
    setFeedback(null);
    setAttempts(0);
  };

  if (gameState === 'completed') {
    const accuracy = Math.round((score / (config.questionCount * 10)) * 100);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <Logo className="text-6xl mb-4" />
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Jumble Master Complete!</h2>
              <p className="text-gray-600">Chisomo the Eagle applauds your word-solving skills!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-green-600">{score}</h3>
                <p className="text-green-700">Total Score</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-blue-600">{config.questionCount}</h3>
                <p className="text-blue-700">Puzzles Solved</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-purple-600">{accuracy}%</h3>
                <p className="text-purple-700">Efficiency</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Logo className="text-3xl" />
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Word Wisdom</h4>
                  <p className="text-amber-800">
                    {score >= 80 
                      ? "Outstanding! Your word-unscrambling skills are as sharp as an eagle's talons!"
                      : score >= 50
                      ? "Well done! With practice, you'll untangle any word puzzle that comes your way!"
                      : "Every puzzle master started somewhere! Keep practicing and your skills will soar!"
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
            <Shuffle className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jumble Master</h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentPuzzle + 1}/{config.questionCount}
              </div>
              <p className="text-xs text-gray-600">Puzzles</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{score}</div>
              <p className="text-xs text-gray-600">Score</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{attempts}</div>
              <p className="text-xs text-gray-600">Attempts</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPuzzle + 1) / config.questionCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Puzzle Card */}
      <Card className={`mb-6 transition-all duration-300 ${
        feedback === 'correct' ? 'border-green-500 bg-green-50' :
        feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
        'border-gray-200'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Puzzle {currentPuzzle + 1}</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {currentPuzzleData.category}
              </span>
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
                  {feedback === 'correct' ? 'Correct!' : 'Try again!'}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <h3 className="text-sm text-gray-600 mb-4">Unscramble this word:</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6 tracking-wider">
              {currentPuzzleData.scrambled}
            </div>
            
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full px-4 py-3 text-xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                disabled={feedback !== null}
              />
            </div>
          </div>

          {/* Hint Section */}
          {showHint && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Hint</h4>
                  <p className="text-blue-800 text-sm">{currentPuzzleData.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Eagle Tip (shown after feedback) */}
          {feedback === 'correct' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Logo className="text-2xl" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Chisomo Wisdom</h4>
                  <p className="text-amber-800 text-sm">{currentPuzzleData.eagleTip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {!showHint && feedback !== 'correct' && (
              <Button
                variant="outline"
                onClick={() => setShowHint(true)}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Show Hint
              </Button>
            )}
            
            {feedback !== 'correct' && (
              <Button
                onClick={checkAnswer}
                disabled={!userAnswer.trim() || feedback !== null}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Check Answer
              </Button>
            )}

            {feedback === 'correct' && (
              <Button onClick={nextPuzzle}>
                {currentPuzzle + 1 >= config.questionCount ? 'Finish Game' : 'Next Puzzle'}
                <Zap className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scramble Helper */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-medium text-gray-900 mb-2">Need a different scramble?</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Re-scramble the word
                const rescrambled = shuffleWord(currentPuzzleData.answer);
                // This would update the scrambled version
              }}
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle Letters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}