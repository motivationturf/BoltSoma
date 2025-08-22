import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselSlide {
  id: number;
  headline: string;
  description: string;
  visual: string;
  bgGradient: string;
  textColor: string;
}

interface CarouselProps {
  onExploreArcade: () => void;
}

export function Carousel({ onExploreArcade }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      headline: "Mulungushi Quiz",
      description: "Test your strength of mind with solo challenges.",
      visual: "💪",
      bgGradient: "from-purple-600 via-blue-600 to-cyan-500",
      textColor: "text-white"
    },
    {
      id: 2,
      headline: "Luangwa Flip",
      description: "Flip through fast facts and sharpen your memory.",
      visual: "🔄",
      bgGradient: "from-green-500 via-emerald-500 to-teal-500",
      textColor: "text-white"
    },
    {
      id: 3,
      headline: "Zambezi Rush",
      description: "Beat the clock in this rapid-fire timed quiz.",
      visual: "⏱️",
      bgGradient: "from-orange-500 via-red-500 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 4,
      headline: "Kundalila Puzzles",
      description: "Unscramble clues and discover the missing pieces.",
      visual: "🧩",
      bgGradient: "from-indigo-500 via-purple-500 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 5,
      headline: "Kalambo Clash",
      description: "Compete with classmates in high-stakes brain duels.",
      visual: "⚔️",
      bgGradient: "from-yellow-500 via-orange-500 to-red-500",
      textColor: "text-white"
    },
    {
      id: 6,
      headline: "Zed Legacy",
      description: "Discover Zambia’s history, heroes, and culture.",
      visual: "🇿🇲",
      bgGradient: "from-green-600 via-orange-500 to-red-600",
      textColor: "text-white"
    },
    {
      id: 7,
      headline: "Chisomo AI Hub",
      description: "Your smart Academic assistant.",
      visual: "🤖",
      bgGradient: "from-blue-700 via-green-500 to-emerald-400",
      textColor: "text-white"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Section Header */}
      {/* Removed duplicate eagle and heading here */}

      {/* Carousel Container */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Feature carousel"
        tabIndex={0}
      >
        {/* Slide Content */}
        <div className={`relative bg-gradient-to-br ${currentSlideData.bgGradient} min-h-[400px] md:min-h-[350px] flex items-center justify-center overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 md:px-12 py-8">
            <div className="mb-6">
              <div className="text-6xl md:text-7xl mb-4 animate-bounce">
                {currentSlideData.visual}
              </div>
              <h3 className={`text-2xl md:text-4xl font-bold mb-4 ${currentSlideData.textColor} leading-tight`}>
                {currentSlideData.headline}
              </h3>
              <p className={`text-base md:text-lg ${currentSlideData.textColor} opacity-90 max-w-xl mx-auto leading-relaxed`}>
                {currentSlideData.description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white ml-0.5" />
            )}
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Accessibility Instructions */}
      <div className="mt-6 text-center text-xs md:text-sm text-gray-500">
        <p>Use arrow keys to navigate slides, spacebar to pause/play</p>
      </div>
    </div>
  );
}