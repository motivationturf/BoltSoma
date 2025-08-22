import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Zap, 
  Star,
  ChevronRight,
  Play,
  UserPlus,
  X,
  CheckCircle,
  Clock,
  Award,
  Gamepad2,
  Sparkles,
  Rocket,
  Brain,
  Globe,
  Heart
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Carousel } from './Carousel';
import TestimonialCarousel from './TestimonialCarousel';
import Logo from '../ui/Logo';

interface LandingPageProps {
  onGetStarted: () => void;
  onGuestMode: () => void;
  onLogin: () => void;
  onExploreSubject: (subjectId: string) => void;
  onNavigate: (view: string) => void;
  onExploreArcade: () => void;
}

export function LandingPage({ 
  onGetStarted, 
  onGuestMode, 
  onLogin, 
  onExploreSubject, 
  onNavigate,
  onExploreArcade 
}: LandingPageProps) {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showArcadeModal, setShowArcadeModal] = useState(false);

  const subjects = [
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: '💻',
      description: 'Programming, web development, and digital literacy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '📊',
      description: 'Algebra, geometry, calculus, and problem-solving',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: '🔬',
      description: 'Physics, chemistry, biology, and experiments',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: '📚',
      description: 'World religions, ethics, and moral philosophy',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      icon: Gamepad2,
      title: 'Interactive Games',
      description: 'Learn through engaging educational games and challenges',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: Trophy,
      title: 'Achievements & Badges',
      description: 'Earn rewards and track your progress with gamification',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      icon: Users,
      title: 'Social Learning',
      description: 'Compete with friends and learn together in challenges',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: Target,
      title: 'Curriculum Aligned',
      description: 'Content designed specifically for Zambian high school students',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '500+', label: 'Interactive Lessons' },
    { number: '50+', label: 'Learning Games' },
    { number: '95%', label: 'Student Satisfaction' }
  ];

  const handleArcadeAccess = (accessType: 'guest' | 'signup' | 'login') => {
    setShowArcadeModal(false);
    
    switch (accessType) {
      case 'guest':
        // Call the onExploreArcade function which should set up guest mode and navigate to arcade
        onExploreArcade();
        break;
      case 'signup':
        onGetStarted();
        break;
      case 'login':
        onLogin();
        break;
    }
  };

  const handleExploreArcadeClick = () => {
    setShowArcadeModal(true);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen parallax-bg relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-icon absolute top-20 left-10 text-6xl opacity-20" style={{ color: 'var(--zambian-green)' }}>📚</div>
        <div className="floating-icon absolute top-40 right-20 text-5xl opacity-20" style={{ color: 'var(--sunset-orange)' }}>🎯</div>
        <div className="floating-icon absolute bottom-40 left-1/4 text-4xl opacity-20" style={{ color: 'var(--zambian-red)' }}>🏆</div>
        <div className="floating-icon absolute bottom-20 right-1/3 text-7xl opacity-20" style={{ color: 'var(--emerald-light)' }}>⚡</div>
        <div className="floating-icon absolute top-1/2 left-10 text-5xl opacity-20" style={{ color: 'var(--copper-light)' }}>🌟</div>
      </div>

      {/* Dynamic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className={`space-y-8 ${isLoaded ? 'animate-slide-from-left' : 'opacity-0'}`}>
              {/* Dynamic Logo */}
              <div className="flex items-center mb-8">
                <div className="header-zambian w-20 h-20 rounded-2xl flex items-center justify-center mr-4 shadow-2xl animate-glow-pulse">
                  <Logo className="h-12 w-12" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold hero-title">
                    SomaSmart EduHub
                  </h1>
                  <p className="text-amber-700 font-medium">Zambia's Premier Learning Platform</p>
                </div>
              </div>

              {/* Dynamic Headline */}
              <div className="space-y-4">
                <h2 className="text-6xl md:text-8xl font-black leading-none">
                  <span className="block hero-title animate-slide-up">Learn.</span>
                  <span className="block hero-title animate-slide-up" style={{ animationDelay: '0.2s' }}>Play.</span>
                  <span className="block hero-title animate-slide-up" style={{ animationDelay: '0.4s' }}>Soar.</span>
                </h2>
                
                {/* Eagle Mascot Integration */}
                <div className="relative">
                  <Logo className="h-32 w-32" />
                </div>
              </div>

              <p className={`text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl ${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                The first gamified learning platform designed specifically for Zambian high school students. 
                Master your curriculum through interactive games, challenges, and social learning with 
                <span className="font-bold text-green-600"> Chisomo the Eagle</span> as your guide.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-6 ${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                <Button
                  onClick={onGetStarted}
                  variant="zambian-primary"
                  size="lg"
                  className="btn-magnetic px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl"
                >
                  <Rocket className="h-6 w-6 mr-3" />
                  Start Your Journey
                  <Sparkles className="h-5 w-5 ml-2" />
                </Button>
                
                <Button
                  onClick={handleExploreArcadeClick}
                  variant="zambian-secondary"
                  size="lg"
                  className="btn-magnetic px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl"
                >
                  <Gamepad2 className="h-6 w-6 mr-3" />
                  Game Arcade
                  <Play className="h-5 w-5 ml-2" />
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className={`flex flex-wrap gap-6 pt-8 ${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
                {[
                  { icon: CheckCircle, text: "100% Free to Start", color: "text-green-600" },
                  { icon: Heart, text: "Made for Zambians", color: "text-red-500" },
                  { icon: Globe, text: "Curriculum Aligned", color: "text-blue-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover-lift">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-medium text-gray-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interactive Visual */}
            <div className={`relative ${isLoaded ? 'animate-slide-from-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* 3D Card Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {subjects.map((subject, index) => (
                    <Card 
                      key={subject.id}
                      className={`card-3d hover-lift cursor-pointer animate-slide-from-bottom`}
                      style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                      onClick={() => onExploreSubject(subject.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${subject.color.replace('from-', 'from-').replace('to-', 'to-')} flex items-center justify-center text-3xl shadow-lg`}>
                          {subject.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Central Interactive Element */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 header-zambian rounded-full flex items-center justify-center shadow-2xl animate-float-complex">
                    <Brain className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Students Love SomaSmart EduHub
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've reimagined learning to be engaging, social, and effective for the modern Zambian student.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Carousel Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <Carousel onExploreArcade={onExploreArcade} />
      </section>

      {/* Subjects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Master All Your Subjects
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive lessons and games across the complete Zambian high school curriculum.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id} 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={() => onExploreSubject(subject.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl`}>
                    {subject.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{subject.name}</h4>
                  <p className="text-gray-600 text-sm">{subject.description}</p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Explore Subject
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Experience?
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Zambian students who are already excelling with SomaSmart EduHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
            <Button
              onClick={() => setShowTestimonials(true)}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg"
            >
              <Star className="h-5 w-5 mr-2" />
              Student Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Modal */}
      {showTestimonials && (
        <TestimonialCarousel onClose={() => setShowTestimonials(false)} />
      )}

      {/* Arcade Access Modal */}
      {showArcadeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <button
                onClick={() => setShowArcadeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Access Game Arcade
              </h3>
              <p className="text-gray-600">
                Choose how you'd like to access our learning games
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => handleArcadeAccess('signup')}
                className="w-full py-3"
              >
                <Star className="h-4 w-4 mr-2" />
                Sign Up & Play (Recommended)
              </Button>
              <Button
                onClick={() => handleArcadeAccess('login')}
                variant="outline"
                className="w-full py-3"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign In to Continue
              </Button>
              <Button
                onClick={() => handleArcadeAccess('guest')}
                variant="ghost"
                className="w-full py-3 text-gray-600"
              >
                <Users className="h-4 w-4 mr-2" />
                Try as Guest (Limited Access)
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Guest mode includes 3 sample games. Create an account for full access!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}