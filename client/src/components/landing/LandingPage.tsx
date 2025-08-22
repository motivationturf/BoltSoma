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
import SubjectCatalog from '../subjects/SubjectCatalog';
import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import Header from './Header';

interface LandingPageProps {
  onGetStarted: (subjectId?: string) => void;
  onGuestMode: (subjectId?: string) => void;
  onLogin: (subjectId?: string) => void;
  onExploreSubject: (subjectId: string) => void;
  onNavigate: (view: string) => void;
  onExploreArcade: () => void;
}

// Mock contact data
const contactInfo = {
  email: "info@somasmart.com",
  phone: "+260 97 123 4567",
  address: "Plot 1234, Great East Road, Lusaka, Zambia",
  supportHours: "Mon-Fri 08:00–17:00 CAT",
  team: [
    {
      name: "Chisomo Banda",
      role: "Customer Support Lead",
      email: "chisomo.banda@somasmart.com",
      phone: "+260 97 234 5678"
    },
    {
      name: "Mwansa Phiri",
      role: "Technical Support",
      email: "mwansa.phiri@somasmart.com",
      phone: "+260 97 345 6789"
    }
  ],
  socials: [
    { name: "Facebook", url: "https://facebook.com/somasmart" },
    { name: "Twitter", url: "https://twitter.com/somasmart" },
    { name: "Instagram", url: "https://instagram.com/somasmart" }
  ]
};

// Mock help topics
const helpTopics = [
  {
    title: "Getting Started",
    summary: "How to sign up, log in, and begin using SomaSmart EduHub.",
    details: `
      1. Click 'Sign in' or 'Get Started Free' on the top right.
      2. Fill in your details and follow the prompts.
      3. Once signed up, you can access all free games and lessons from your dashboard.
    `
  },
  {
    title: "Using the Game Arcade",
    summary: "Tips for playing educational games and tracking your progress.",
    details: `
      - Navigate to the Arcade section from the dashboard or landing page.
      - Choose a game to play and follow the on-screen instructions.
      - Your achievements and badges will be saved to your profile.
    `
  },
  {
    title: "Profile & Progress",
    summary: "How to view and update your profile, and see your learning stats.",
    details: `
      - Click your avatar or name in the top navigation to access your profile.
      - Update your information, avatar, and learning goals.
      - View your progress, badges, and leaderboard rankings.
    `
  },
  {
    title: "Support & Feedback",
    summary: "How to get help or send feedback to the SomaSmart team.",
    details: `
      - Use the 'Contact' section in the footer to reach support.
      - For technical issues, email support@somasmart.com.
      - We welcome your feedback to improve the platform!
    `
  }
];

export function LandingPage() {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showArcadeModal, setShowArcadeModal] = useState(false);
  const [showFeaturesBox, setShowFeaturesBox] = useState(false);
  const [showPricingBox, setShowPricingBox] = useState(false); // NEW STATE
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContactBox, setShowContactBox] = useState(false);
  const [showHelpBox, setShowHelpBox] = useState(false);
  const [expandedHelp, setExpandedHelp] = useState<number | null>(null);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const subjects = [
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: '💻',
      description: 'Programming, web development, and digital literacy',
      color: 'from-green-600 via-emerald-500 to-amber-500'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '📊',
      description: 'Algebra, geometry, calculus, and problem-solving',
      color: 'from-amber-500 via-orange-500 to-yellow-500'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: '🔬',
      description: 'Physics, chemistry, biology, and experiments',
      color: 'from-emerald-600 via-green-500 to-teal-500'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: '📚',
      description: 'World religions, ethics, and moral philosophy',
      color: 'from-orange-500 via-amber-500 to-yellow-500'
    }
  ];

  const subjectRouteMap: Record<string, string> = {
    'computer-studies': '/subjects/computer-studies/topics',
    'mathematics': '/subjects/mathematics/topics',
    'sciences': '/subjects/science/topics',
    'religious-education': '/subjects/religious-education/topics',
  };

  const handleArcadeAccess = (accessType: 'guest' | 'signup' | 'login') => {
    setShowArcadeModal(false);

    switch (accessType) {
      case 'guest':
        navigate('/arcade');
        break;
      case 'signup':
        navigate('/register');
        break;
      case 'login':
        navigate('/login');
        break;
    }
  };

  const handleExploreArcadeClick = () => {
    setShowArcadeModal(true);
  };

  const handleShowSubjectsModal = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setShowSubjectsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onShowFeatures={() => setShowFeaturesBox(true)}
        onShowPricing={() => setShowPricingBox(true)}
      />
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center py-10 md:py-16">
        <img src="/logo.svg" alt="SomaSmart EduHub Logo" className="h-48 w-48 mx-auto mb-6 mt-4 drop-shadow-xl" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Experience Learning Like Never Before
          </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Discover the exciting features that make SomaSmart EduHub the perfect learning companion for Zambian students.
          </p>

          {/* Featured Carousel */}
          <div className={`mb-12 ${isLoaded ? 'animate-slide-from-bottom animation-delay-04' : 'opacity-0'}`}>
            <Carousel onExploreArcade={() => navigate('/arcade')} />
          </div>

          {/* Call to Action */}
          <div className={`${isLoaded ? 'animate-slide-from-bottom animation-delay-06' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Adventure?</h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join thousands of Zambian students who are already experiencing the future of 
              learning with our interactive game arcade.
            </p>

            <Button
              onClick={handleExploreArcadeClick}
              size="lg"
              variant="zambian-primary"
              className="px-8 py-4 text-lg font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
            >
              <Gamepad2 className="h-5 w-5 mr-2" />
              Explore the Arcade
            </Button>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                Free to Start
              </div>
              <div className="flex items-center">
                <X className="h-4 w-4 text-green-600 mr-1" />
                No Downloads
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-green-600 mr-1" />
                Works on All Devices
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Use arrow keys to navigate slides; spacebar to pause/play
            </p>
          </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Students Love SomaSmart EduHub
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engaging, social, and effective learning designed specifically for Zambian high school students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Gamepad2,
                title: 'Interactive Games',
                description: 'Learn through engaging educational games and challenges',
                color: 'text-white',
                bg: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500',
                cardBg: 'bg-green-50'
              },
              {
                icon: Trophy,
                title: 'Achievements & Badges',
                description: 'Earn rewards and track your progress with gamification',
                color: 'text-white',
                bg: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500',
                cardBg: 'bg-yellow-50'
              },
              {
                icon: Users,
                title: 'Social Learning',
                description: 'Compete with friends and learn together in challenges',
                color: 'text-white',
                bg: 'bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500',
                cardBg: 'bg-cyan-50'
              },
              {
                icon: Target,
                title: 'Curriculum Aligned',
                description: 'Content designed specifically for Zambian high school students',
                color: 'text-white',
                bg: 'bg-gradient-to-r from-orange-400 via-pink-500 to-red-500',
                cardBg: 'bg-orange-50'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className={`card-3d hover-lift text-center shadow-lg rounded-2xl ${feature.cardBg}`}>
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

      {/* Subjects Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Master All Your Subjects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning materials and games for all high school subjects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id} 
                className="card-3d hover-lift cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl`}>
                    {subject.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{subject.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(subjectRouteMap[subject.id])}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 header-zambian">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning Experience?
          </h3>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of Zambian students who are already excelling with SomaSmart EduHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 font-bold"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
            <Button
              onClick={handleExploreArcadeClick}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 font-bold"
            >
              <Gamepad2 className="h-5 w-5 mr-2" />
              Try the Arcade
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Features Box */}
      {showFeaturesBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-12 animate-fade-in min-h-[320px] max-h-[80vh] flex flex-col items-center overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white w-full flex items-center justify-center border-b border-gray-100 pb-2 mb-4 min-h-56">
              <h2 className="text-3xl font-bold text-center text-green-700 flex-1">Platform Features</h2>
              <button
                className="absolute right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none top-12"
                onClick={() => setShowFeaturesBox(false)}
                aria-label="Close features box"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full pt-16">
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col items-center card-3d">
                <span className="text-4xl mb-2">🎮</span>
                <span className="font-semibold text-lg mb-1">Interactive Game Arcade</span>
                <span className="text-gray-500 text-sm text-center">Play educational games and challenges to learn while having fun.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col items-center card-3d">
                <span className="text-4xl mb-2">🏆</span>
                <span className="font-semibold text-lg mb-1">Achievements & Badges</span>
                <span className="text-gray-500 text-sm text-center">Earn rewards and track your progress with gamification.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col items-center card-3d">
                <span className="text-4xl mb-2">👥</span>
                <span className="font-semibold text-lg mb-1">Social Learning & Leaderboards</span>
                <span className="text-gray-500 text-sm text-center">Compete with friends and see your ranking on leaderboards.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col items-center card-3d">
                <span className="text-4xl mb-2">🎯</span>
                <span className="font-semibold text-lg mb-1">Curriculum-Aligned Content</span>
                <span className="text-gray-500 text-sm text-center">Content designed specifically for Zambian high school students.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col items-center card-3d">
                <span className="text-4xl mb-2">📱</span>
                <span className="font-semibold text-lg mb-1">Mobile & Desktop Friendly</span>
                <span className="text-gray-500 text-sm text-center">Enjoy a seamless experience on any device, anywhere.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col items-center card-3d">
                <span className="text-4xl mb-2">🔒</span>
                <span className="font-semibold text-lg mb-1">Safe & Secure for Students</span>
                <span className="text-gray-500 text-sm text-center">Your privacy and safety are our top priorities.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pricing Box */}
      {showPricingBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-12 animate-fade-in min-h-[480px] flex flex-col items-center">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
              onClick={() => setShowPricingBox(false)}
              aria-label="Close pricing box"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Free Tier */}
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-8 flex flex-col items-center border-2 border-green-400 card-3d">
                <span className="text-4xl mb-2">🆓</span>
                <span className="font-semibold text-xl mb-1 text-green-700">Free Tier</span>
                <span className="text-3xl font-bold mb-2 text-green-600">K0</span>
                <ul className="text-gray-600 text-sm mb-4 space-y-2 text-center">
                  <li>✔️ Access to all games</li>
                  <li>✔️ Access to all lessons</li>
                  <li>✔️ Social features</li>
                  <li>✔️ Achievements & badges</li>
                  <li>✔️ Mobile & desktop support</li>
                </ul>
                <span className="text-xs text-gray-400 text-center">All games and lessons are currently free for all signed up users.</span>
              </div>
              {/* Paid Tier */}
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-8 flex flex-col items-center border-2 border-amber-400 card-3d">
                <span className="text-4xl mb-2">💎</span>
                <span className="font-semibold text-xl mb-1 text-amber-700">Premium Tier</span>
                <span className="text-3xl font-bold mb-2 text-amber-600">K49.00</span>
                <ul className="text-gray-600 text-sm mb-4 space-y-2 text-center">
                  <li>⭐ Early access to new games</li>
                  <li>⭐ Advanced analytics & progress tracking</li>
                  <li>⭐ Personalized learning paths</li>
                  <li>⭐ Exclusive badges & avatars</li>
                  <li>⭐ Priority support</li>
                  <li>⭐ Ad-free experience</li>
                  <li className="text-xs text-gray-400">(Coming soon as the app grows!)</li>
                </ul>
                <span className="text-xs text-gray-400 text-center">All premium features are planned for future updates.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Modal */}
      {showTestimonials && (
        <TestimonialCarousel onClose={() => setShowTestimonials(false)} />
      )}

      {/* Arcade Access Modal */}
      {showArcadeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowArcadeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close arcade access modal"
              title="Close arcade access modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="header-zambian w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <Star className="h-4 w-4 mr-2" />
                Sign Up & Play (Recommended)
              </Button>

              <Button
                onClick={() => handleArcadeAccess('login')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign In to Continue
              </Button>

              <Button
                onClick={() => handleArcadeAccess('guest')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <Users className="h-4 w-4 mr-2" />
                Try as Guest (Full Access)
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Guest mode includes 3 sample games. Create an account for full access!
            </p>
          </div>
        </div>
      )}

      {/* Subjects Access Modal */}
      {showSubjectsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowSubjectsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close subjects access modal"
              title="Close subjects access modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="header-zambian w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Access Subjects
              </h3>
              {selectedSubjectId && (
                <p className="text-gray-600 font-semibold mb-2">
                  You are exploring: <span className="text-blue-700">{subjects.find(s => s.id === selectedSubjectId)?.name || selectedSubjectId}</span>
                </p>
              )}
              <p className="text-gray-600">
                Choose how you'd like to access our learning subjects
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => { setShowSubjectsModal(false); navigate('/register'); }}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <Star className="h-4 w-4 mr-2" />
                Sign Up & Explore
              </Button>

              <Button
                onClick={() => { setShowSubjectsModal(false); navigate('/login'); }}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign In to Continue
              </Button>

              <Button
                onClick={() => { setShowSubjectsModal(false); navigate('/arcade'); }}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <Users className="h-4 w-4 mr-2" />
                Try as Guest (Full Access)
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Guest mode includes 4 sample topics per subject. Create an account for full access!
            </p>
          </div>
        </div>
      )}

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-gray-200 mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-400">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setShowContactBox(true)} className="hover:underline text-green-300 text-left w-full">View Contact Details</button></li>
              <li>Email: <a href={`mailto:${contactInfo.email}`} className="hover:underline text-green-300">{contactInfo.email}</a></li>
              <li>Phone: <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:underline text-green-300">{contactInfo.phone}</a></li>
              <li>Address: {contactInfo.address}</li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-400">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setShowHelpBox(true)} className="hover:underline text-green-300 text-left w-full">View Help Topics</button></li>
              <li><a href="#" className="hover:underline">Support Center</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Community</a></li>
              <li><a href="#" className="hover:underline">Feedback</a></li>
            </ul>
          </div>
          {/* ... other footer columns ... */}
        </div>
      </footer>
      {/* Contact Modal */}
      {showContactBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-fade-in min-h-[320px] max-h-[80vh] flex flex-col items-center overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white w-full flex items-center justify-center border-b border-gray-100 pb-2 mb-4" style={{minHeight: '56px'}}>
              <h2 className="text-2xl font-bold text-center text-green-700 flex-1">Contact Details</h2>
              <button
                className="absolute right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
                onClick={() => setShowContactBox(false)}
                aria-label="Close contact box"
                style={{top: '12px'}}
              >
                ×
              </button>
            </div>
            <div className="w-full pt-8 space-y-4">
              <div>
                <div className="font-semibold text-gray-700">Email:</div>
                <a href={`mailto:${contactInfo.email}`} className="text-green-600 hover:underline">{contactInfo.email}</a>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Phone:</div>
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-green-600 hover:underline">{contactInfo.phone}</a>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Address:</div>
                <div>{contactInfo.address}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Support Hours:</div>
                <div>{contactInfo.supportHours}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">Team:</div>
                <ul className="space-y-2">
                  {contactInfo.team.map((member, idx) => (
                    <li key={idx} className="bg-gray-50 rounded-lg p-3 shadow flex flex-col md:flex-row md:items-center md:space-x-4">
                      <div className="font-bold text-green-700">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                      <div className="text-xs"><a href={`mailto:${member.email}`} className="text-green-600 hover:underline">{member.email}</a></div>
                      <div className="text-xs"><a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="text-green-600 hover:underline">{member.phone}</a></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">Socials:</div>
                <div className="flex space-x-4">
                  {contactInfo.socials.map((social, idx) => (
                    <a key={idx} href={social.url} target="_blank" rel="noopener" className="text-green-600 hover:text-green-800 underline">{social.name}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Help Modal */}
      {showHelpBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-fade-in min-h-[320px] max-h-[80vh] flex flex-col items-center overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white w-full flex items-center justify-center border-b border-gray-100 pb-2 mb-4" style={{minHeight: '56px'}}>
              <h2 className="text-2xl font-bold text-center text-green-700 flex-1">Help & Support</h2>
              <button
                className="absolute right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
                onClick={() => setShowHelpBox(false)}
                aria-label="Close help box"
                style={{top: '12px'}}
              >
                ×
              </button>
            </div>
            <div className="w-full pt-8 space-y-4">
              {helpTopics.map((topic, idx) => (
                <div key={idx} className="border rounded-xl shadow-sm bg-gray-50">
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-green-700 focus:outline-none focus:ring"
                    onClick={() => setExpandedHelp(expandedHelp === idx ? null : idx)}

                    aria-controls={`help-topic-${idx}`}
                  >
                    <span>{topic.title}</span>
                    <span className={`ml-2 transition-transform ${expandedHelp === idx ? 'rotate-90' : ''}`}>▶</span>
                  </button>
                  <div
                    id={`help-topic-${idx}`}
                    className={`px-4 pb-4 text-gray-700 text-sm transition-all duration-300 ${expandedHelp === idx ? 'block' : 'hidden'}`}
                  >
                    <div className="mb-2 italic text-gray-500">{topic.summary}</div>
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 bg-white rounded p-2 border border-gray-100">{topic.details}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!showSubjectsModal && selectedSubjectId && (
        <SubjectCatalog
          initialSubjectId={selectedSubjectId}
          // pass other necessary props
        />
      )}
    </div>
  );
}