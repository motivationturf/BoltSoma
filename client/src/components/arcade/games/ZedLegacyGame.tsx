import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Trophy, ArrowLeft, ArrowRight, CheckCircle, XCircle, Star, Clock, Award } from 'lucide-react';

// Zambia SVG logo (assume /logo.svg in public)
const ZambiaLogo = () => (
  <img src="/logo.svg" alt="SomaSmart Zambia Logo" className="h-12 w-12 mx-auto mb-2" />
);

// Zambian general knowledge questions
const zedLegacyQuestions = [
  {
    question: 'Who was the first President of Zambia?',
    options: ['Levy Mwanawasa', 'Kenneth Kaunda', 'Frederick Chiluba', 'Michael Sata'],
    correct: 1,
    zedNugget: 'Kenneth Kaunda, fondly known as KK, led Zambia to independence in 1964 and served as president until 1991.'
  },
  {
    question: 'What is the capital city of Zambia?',
    options: ['Ndola', 'Kitwe', 'Lusaka', 'Livingstone'],
    correct: 2,
    zedNugget: 'Lusaka became the capital of Zambia in 1935, replacing Livingstone.'
  },
  {
    question: 'Which river forms the border between Zambia and Zimbabwe?',
    options: ['Luangwa', 'Zambezi', 'Kafue', 'Chambeshi'],
    correct: 1,
    zedNugget: 'The Zambezi River is the fourth-longest river in Africa and is home to the famous Victoria Falls.'
  },
  {
    question: 'What is Zambia’s official language?',
    options: ['Bemba', 'Nyanja', 'English', 'Tonga'],
    correct: 2,
    zedNugget: 'While Zambia has over 70 languages, English is the official language used in government and education.'
  },
  {
    question: 'Which mineral is Zambia most famous for producing?',
    options: ['Gold', 'Copper', 'Emeralds', 'Cobalt'],
    correct: 1,
    zedNugget: 'Zambia is one of the world’s largest producers of copper, earning it the nickname "the Copperbelt".'
  },
  {
    question: 'What is the name of Zambia’s largest national park?',
    options: ['Kafue', 'South Luangwa', 'Lower Zambezi', 'Liuwa Plain'],
    correct: 0,
    zedNugget: 'Kafue National Park is one of the largest in Africa, covering about 22,400 square kilometers.'
  },
  {
    question: 'Which Zambian city is known as the country’s industrial and commercial hub?',
    options: ['Kitwe', 'Ndola', 'Lusaka', 'Chingola'],
    correct: 1,
    zedNugget: 'Ndola is a major industrial center and the capital of the Copperbelt Province.'
  },
  {
    question: 'What is the traditional ceremony of the Lozi people called?',
    options: ['Nc’wala', 'Kuomboka', 'Likumbi Lya Mize', 'Chisemwa Cha Lunda'],
    correct: 1,
    zedNugget: 'Kuomboka is a spectacular annual ceremony marking the movement of the Lozi king from the floodplains to higher ground.'
  },
  {
    question: 'Who composed the Zambian national anthem?',
    options: ['Enoch Sontonga', 'Rikki Ililonga', 'Musi-o-Tunya', 'Stephen Mpashi'],
    correct: 0,
    zedNugget: 'The anthem "Stand and Sing of Zambia, Proud and Free" uses the tune of "Nkosi Sikelel’ iAfrika" by Enoch Sontonga.'
  },
  {
    question: 'Which UNESCO World Heritage Site is located in Zambia?',
    options: ['Victoria Falls', 'Lake Tanganyika', 'Lake Kariba', 'Bangweulu Wetlands'],
    correct: 0,
    zedNugget: 'Victoria Falls, known locally as Mosi-oa-Tunya ("The Smoke That Thunders"), is a UNESCO World Heritage Site.'
  }
];

const badgeLevels = [
  { min: 9, label: 'Zambia Gold', color: 'bg-yellow-400', icon: <Award className="inline h-6 w-6 text-yellow-600" /> },
  { min: 7, label: 'Zambia Silver', color: 'bg-gray-300', icon: <Award className="inline h-6 w-6 text-gray-500" /> },
  { min: 5, label: 'Zambia Bronze', color: 'bg-orange-300', icon: <Award className="inline h-6 w-6 text-orange-500" /> },
  { min: 0, label: 'Zed Explorer', color: 'bg-green-200', icon: <Star className="inline h-6 w-6 text-green-600" /> },
];

interface ZedLegacyGameProps {
  onBack: () => void;
}

export function ZedLegacyGame({ onBack }: ZedLegacyGameProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const [timeLeft, setTimeLeft] = useState(120); // 2 min timer
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinish();
    }
  }, [timeLeft, gameState]);

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowFeedback(true);
    setAnswers([...answers, selected]);
    if (selected === zedLegacyQuestions[current].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    if (current + 1 >= zedLegacyQuestions.length) {
      handleFinish();
    } else {
      setCurrent(current + 1);
    }
  };

  const handleFinish = () => {
    setGameState('completed');
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2500);
  };

  const getBadge = () => {
    for (const badge of badgeLevels) {
      if (score >= badge.min) return badge;
    }
    return badgeLevels[badgeLevels.length - 1];
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Confetti celebration (simple SVG burst)
  const Confetti = () => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <svg width="200" height="200">
        <g>
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={100 + 80 * Math.cos((i * 2 * Math.PI) / 20)}
              cy={100 + 80 * Math.sin((i * 2 * Math.PI) / 20)}
              r={6}
              fill={['#008751', '#EF2B2D', '#F7D116', '#fff'][i % 4]}
              opacity="0.8"
            />
          ))}
        </g>
      </svg>
    </div>
  );

  if (gameState === 'completed') {
    const badge = getBadge();
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>
        {showCelebration && <Confetti />}
        <Card className="text-center">
          <CardContent className="p-8">
            <ZambiaLogo />
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Zed Legacy Complete!</h2>
            <p className="text-gray-600 mb-4">You scored <span className="font-bold text-green-700">{score}/{zedLegacyQuestions.length}</span>!</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-lg mb-6 ${badge.color}`}>{badge.icon}<span className="ml-2">{badge.label}</span></div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-green-900 mb-2">Zed Nugget</h4>
              <p className="text-green-800">{score === zedLegacyQuestions.length ? 'Perfect! You are a true Zambian legend!' : 'Keep exploring Zambia’s rich heritage and history!'}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Arcade
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = zedLegacyQuestions[current];
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Arcade
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ZambiaLogo />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zed Legacy</h1>
                <p className="text-gray-600">Zambian General Knowledge</p>
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
                  {current + 1}/{zedLegacyQuestions.length}
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
                className="bg-gradient-to-r from-green-600 via-yellow-400 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / zedLegacyQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg text-gray-900 mb-6 font-semibold">{q.question}</p>
            <div className="space-y-3">
              {q.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selected === idx
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={idx}
                    checked={selected === idx}
                    onChange={() => handleSelect(idx)}
                    className="text-green-600"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>
          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={selected === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Feedback */}
              <div className={`p-4 rounded-lg border ${
                selected === q.correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {selected === q.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${
                    selected === q.correct ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {selected === q.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className={`text-sm ${
                  selected === q.correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {q.zedNugget}
                </p>
              </div>
              <Button onClick={handleNext} className="w-full">
                {current + 1 >= zedLegacyQuestions.length ? 'Finish Game' : 'Next Question'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 