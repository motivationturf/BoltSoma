import React, { useState, useEffect, useRef } from 'react';
import { testimonials } from './testimonialsData';
import { ChevronLeft, ChevronRight, Quote, X } from 'lucide-react';

interface TestimonialCarouselProps {
  onClose: () => void;
}

export default function TestimonialCarousel({ onClose }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        next();
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, isPaused]);

  const t = testimonials[index];

  return (
    <div
      className="fixed bottom-8 right-8 z-50 max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ minWidth: 320 }}
    >
      <button
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
        onClick={onClose}
        title="Close"
      >
        <X className="h-5 w-5 text-gray-600" />
      </button>
      <div className="flex justify-center mb-4">
        <span className="bg-green-100 rounded-full p-2">
          <Quote className="h-8 w-8 text-green-500" />
        </span>
      </div>
      <p className="text-xl text-gray-800 mb-6 text-center">"{t.text}"</p>
      <div className="flex justify-center mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">★</span>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        <img src={t.student.avatar} alt={t.student.name} className="w-12 h-12 rounded-full border-2 border-green-500" />
        <div className="text-left">
          <div className="font-semibold">{t.student.name}</div>
          <div className="text-sm text-gray-500">{t.student.grade} • {t.student.location}</div>
          <div className="flex gap-2 mt-1">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{t.subject}</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{t.improvement}</span>
          </div>
        </div>
      </div>
      {/* Carousel Controls */}
      <div className="flex justify-between w-full mt-2">
        <button onClick={prev} className="bg-gray-100 hover:bg-green-100 p-2 rounded-full" title="Previous">
          <ChevronLeft className="h-5 w-5 text-green-500" />
        </button>
        <button onClick={next} className="bg-gray-100 hover:bg-green-100 p-2 rounded-full" title="Next">
          <ChevronRight className="h-5 w-5 text-green-500" />
        </button>
      </div>
      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-green-500' : 'bg-gray-300'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            title={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 