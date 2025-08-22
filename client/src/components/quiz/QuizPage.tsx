import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  RotateCcw,
  Lock,
  UserPlus
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AppLayout } from '../layout/AppLayout';

export function QuizPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isGuest = !user;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Sample quiz data
  const quiz = {
    title: "Sample Quiz",
    subject: "Mathematics",
    questions: [
      {
        id: 1,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "2 + 2 = 4"
      },
      {
        id: 2,
        question: "What is 5 × 6?",
        options: ["25", "30", "35", "40"],
        correctAnswer: 1,
        explanation: "5 × 6 = 30"
      }
    ]
  };

  const availableQuestions = isGuest ? quiz.questions.slice(0, 2) : quiz.questions;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < availableQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    availableQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / availableQuestions.length) * 100);
  };

  const handleUpgrade = () => {
    navigate('/register');
  };

  const currentQuestionData = availableQuestions[currentQuestion];

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">Your final score: {score}%</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-blue-600">{score}%</h3>
                  <p className="text-blue-700">Final Score</p>
              </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-green-600">{availableQuestions.length}</h3>
                  <p className="text-green-700">Questions</p>
            </div>
              </div>

            <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Review Your Answers</h3>
                {availableQuestions.map((question, index) => (
                  <div key={question.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{question.question}</p>
                    <div className="space-y-1">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 text-green-800'
                              : optionIndex === selectedAnswers[index]
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="h-4 w-4 inline ml-2" />
                          )}
                          {optionIndex === selectedAnswers[index] && optionIndex !== question.correctAnswer && (
                            <XCircle className="h-4 w-4 inline ml-2" />
                          )}
                      </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                  </div>
                ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => navigate('/subjects')}>
                Back to Subjects
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </AppLayout>
    );
  }

  if (!currentQuestionData) {
    return (
      <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Available</h2>
            <p className="text-gray-600 mb-6">
              This quiz is not available in guest mode. Create an account to access all quizzes.
            </p>
            <Button onClick={handleUpgrade}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Free Account
            </Button>
          </CardContent>
        </Card>
      </div>
      </AppLayout>
    );
  }

  const progress = ((currentQuestion + 1) / availableQuestions.length) * 100;

  return (
    <AppLayout>
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/subjects')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Subjects
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">
              {quiz.subject} {isGuest && '(Sample Quiz)'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-gray-600">Time Left</p>
              </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentQuestion + 1}/{availableQuestions.length}
              </div>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

        {/* Question */}
        <Card className="mb-6">
          <CardContent className="p-6">
              <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Question {currentQuestion + 1} of {availableQuestions.length}
              </h2>
              <p className="text-lg text-gray-700">{currentQuestionData.question}</p>
            </div>

            {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                <button
                      key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
                  ))}
                </div>
          </CardContent>
        </Card>

              {/* Navigation */}
        <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex space-x-2">
            {currentQuestion < availableQuestions.length - 1 ? (
                    <Button onClick={nextQuestion}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
            ) : (
              <Button onClick={submitQuiz} className="bg-green-600 hover:bg-green-700">
                <Flag className="h-4 w-4 mr-2" />
                Submit Quiz
                    </Button>
                  )}
                </div>
        </div>
      </div>
    </AppLayout>
  );
}