import React, { useState } from 'react';
import { 
  Shuffle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle,
  XCircle,
  Lightbulb,
  Trophy,
  Target,
  Star,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import computerStudiesFlashcards from '../questions/Flashcards/ComputerStudiesFlashcards';
import mathematicsFlashcards from '../questions/Flashcards/MathematicsFlashcards';
import scienceFlashcards from '../questions/Flashcards/ScienceFlashcards';
import religiousEducationFlashcards from '../questions/Flashcards/ReligiousEducationFlashcards';
import Logo from '../../ui/Logo';

interface FlashcardsProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function Flashcards({ config, onBack, isGuest = false, onUpdateProgress }: FlashcardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<number>>(new Set());
  const [gameComplete, setGameComplete] = useState(false);

  // Modular subject-specific flashcard sets
  const flashcardSets = {
    'computer-studies': computerStudiesFlashcards,
    mathematics: mathematicsFlashcards,
    sciences: scienceFlashcards,
    'religious-education': religiousEducationFlashcards,
  };

  const cards = flashcardSets[config.subject as keyof typeof flashcardSets] || flashcardSets.mathematics;
  const currentCardData = cards[currentCard];

  // 1. Remove all uses of frontGradient, backGradient, backBorder, iconColor, categoryBg from card data.
  // 2. Define a fixed array of gradients inspired by the Carousel.
  const carouselGradients = [
    "from-purple-600 via-blue-600 to-cyan-500",
    "from-green-500 via-emerald-500 to-teal-500",
    "from-orange-500 via-red-500 to-pink-500",
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-yellow-500 via-orange-500 to-red-500",
    "from-green-600 via-orange-500 to-red-600"
  ];

  // 3. For each card, pick a gradient by index: gradients[currentCard % gradients.length]
  const frontGradient = carouselGradients[currentCard % carouselGradients.length];
  const backGradient = carouselGradients[(currentCard + 1) % carouselGradients.length];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard);
    setMasteredCards(newMastered);
    
    if (newMastered.size === cards.length) {
      setGameComplete(true);
      if (isGuest && onUpdateProgress) {
        onUpdateProgress({
          timeSpent: 10,
          pointsEarned: cards.length * 5
        });
      }
    } else {
      nextCard();
    }
  };

  const handleNeedReview = () => {
    const newReview = new Set(reviewCards);
    newReview.add(currentCard);
    setReviewCards(newReview);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setCurrentCard(0);
    }
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    } else {
      setCurrentCard(cards.length - 1);
    }
  };

  const resetGame = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setReviewCards(new Set());
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-8 text-white">
            <Logo className="text-6xl mb-4" />
            <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">All Cards Mastered!</h2>
            <p className="text-yellow-100">Chisomo the Eagle is impressed with your dedication!</p>
          </div>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{masteredCards.size}</div>
                <p className="text-green-700 font-medium">Cards Mastered</p>
                <Sparkles className="h-6 w-6 text-green-500 mx-auto mt-2" />
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{reviewCards.size}</div>
                <p className="text-yellow-700 font-medium">Need Review</p>
                <Star className="h-6 w-6 text-yellow-500 mx-auto mt-2" />
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{isGuest ? '0' : cards.length * 5}</div>
                <p className="text-purple-700 font-medium">Points Earned</p>
                <Trophy className="h-6 w-6 text-purple-500 mx-auto mt-2" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Logo className="text-4xl" />
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Wisdom</h4>
                  <p className="text-amber-800">
                    Excellent work! You've mastered all the flashcards. Regular review is the key to long-term retention. 
                    Like an eagle's keen eyesight, your knowledge will stay sharp with practice!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={onBack} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Arcade
              </Button>
              <Button variant="outline" onClick={resetGame} className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                <RotateCcw className="h-4 w-4 mr-2" />
                Study Again
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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Shuffle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Colorful Flashcards
              </h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentCard + 1}/{cards.length}
              </div>
              <p className="text-xs text-gray-600">Cards</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{masteredCards.size}</div>
              <p className="text-xs text-gray-600">Mastered</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{reviewCards.size}</div>
              <p className="text-xs text-gray-600">Review</p>
            </div>
          </div>
        </div>

        {/* Colorful Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(masteredCards.size / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Colorful Flashcard with Gradient Backgrounds */}
      <div className="mb-6 flashcard-3d" style={{ height: '24rem' }}>
        <div 
          className={`flashcard-inner${isFlipped ? ' flipped' : ''}`}
          onClick={handleFlip}
          style={{ height: '100%' }}
        >
          {/* Front of card */}
          <div className="flashcard-front">
            <Card className="h-full overflow-hidden z-20 shadow-2xl">
              <div className="bg-emerald-700 p-8 text-white relative overflow-hidden h-full">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-6">
                    <Target className="h-8 w-8 text-white" />
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
                      {currentCardData.category}
                    </span>
                  </div>
                  <div className="text-sm font-medium mb-4 text-white/90">Question</div>
                  <h3 className="text-2xl font-bold mb-8 leading-tight text-white">
                    {currentCardData.front}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm">Click to reveal answer</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          </div>
          {/* Back of card */}
          <div className="flashcard-back">
            <Card className="h-full overflow-hidden z-30 shadow-2xl border-4 border-yellow-400">
              <div className="bg-blue-800 p-8 h-full relative">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-lg border-2 border-gray-200">
                        <Lightbulb className="h-6 w-6 text-yellow-500" />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-100 mb-4">Answer</div>
                    <div className="text-lg text-white mb-6 whitespace-pre-line font-semibold leading-relaxed">
                      {currentCardData.back && currentCardData.back.trim() !== '' ? currentCardData.back : 'No answer provided for this card.'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            </div>
        </div>
      </div>

      {/* Eagle Tip with Gradient */}
      {isFlipped && (
        <Card className="mb-6 overflow-hidden border-2 border-amber-200">
          <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 p-6">
            <div className="flex items-start space-x-4">
              <Logo className="text-4xl" />
              <div className="text-white">
                <h4 className="font-bold text-lg mb-2">Chisomo Wisdom</h4>
                <p className="text-amber-100">{currentCardData.eagleTip}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Colorful Controls */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevCard}
          className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isFlipped && (
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleNeedReview} 
              className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 bg-gradient-to-r from-yellow-50 to-amber-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Need Review
            </Button>
            <Button 
              onClick={handleMastered} 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mastered
            </Button>
          </div>
        )}

        <Button 
          variant="outline" 
          onClick={nextCard}
          className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Colorful Card Status Indicators */}
      <div className="mt-6 flex justify-center space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentCard ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 scale-125 shadow-lg' :
              masteredCards.has(index) ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
              reviewCards.has(index) ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}