import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Computer, Calculator, Microscope, BookOpen, ChevronRight, Clock, Trophy, Lock, UserPlus, Play, ArrowRight, Star, Target, X, Users } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import mathematicsTopics from './topics/MathematicsTopics';
import scienceTopics from './topics/ScienceTopics';
import computerStudiesTopics from './topics/ComputerStudiesTopics';
import religiousEducationTopics from './topics/ReligiousEducationTopics';
import Logo from '../ui/Logo';
import { AppLayout } from '../layout/AppLayout';
import { useAuthContextV2 } from '../../context/AuthContextV2';

interface SubjectCatalogProps {
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
  initialSubjectId?: string;
  onShowSubjectsModal?: (subjectId: string) => void;
}

export function SubjectCatalog({ isGuest: propIsGuest, onUpdateProgress, initialSubjectId, onShowSubjectsModal }: SubjectCatalogProps) {
  const navigate = useNavigate();
  const { isGuest: authIsGuest, isAuthenticated } = useAuthContextV2();
  
  // Use auth context guest status if available, otherwise fall back to prop
  const isGuest = isAuthenticated ? authIsGuest : (propIsGuest ?? false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(initialSubjectId || null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [pendingSubjectId, setPendingSubjectId] = useState<string | null>(null);
  const subjectHeaderRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (initialSubjectId) setSelectedSubject(initialSubjectId);
  }, [initialSubjectId]);
  useEffect(() => {
    if (selectedSubject && subjectHeaderRef.current) {
      subjectHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedSubject]);

  const subjects = [
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: Computer,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Master programming, digital literacy, and technology skills essential for the modern world.',
      progress: isGuest ? 0 : 65,
      totalLessons: 24,
      completedLessons: isGuest ? 0 : 16,
      estimatedTime: '8 weeks',
      difficulty: 'Intermediate',
      topics: computerStudiesTopics,
      nextLesson: 'Introduction to Python Programming',
      guestAvailable: true,
      guestLessons: 4,
      mascotAdvice: "SomaSmart says: Technology is the future! Start with Programming Basics—it's like learning a new language that computers understand!"
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Develop problem-solving skills through algebra, geometry, calculus, and statistical analysis.',
      progress: isGuest ? 0 : 78,
      totalLessons: 32,
      completedLessons: isGuest ? 0 : 25,
      estimatedTime: '12 weeks',
      difficulty: 'Advanced',
      topics: mathematicsTopics,
      nextLesson: 'Quadratic Equations and Functions',
      guestAvailable: true,
      guestLessons: 4,
      mascotAdvice: "SomaSmart says: Math is everywhere! Like a great problem solver, you'll learn to tackle real-world challenges!"
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: Microscope,
      color: 'bg-gradient-to-r from-purple-500 to-violet-500',
      gradient: 'from-purple-500 to-violet-500',
      description: 'Explore the natural world through physics, chemistry, biology, and hands-on experiments.',
      progress: isGuest ? 0 : 52,
      totalLessons: 36,
      completedLessons: isGuest ? 0 : 19,
      estimatedTime: '14 weeks',
      difficulty: 'Intermediate',
      topics: scienceTopics,
      nextLesson: 'Scientific Method',
      guestAvailable: true,
      guestLessons: 4,
      mascotAdvice: "SomaSmart says: Science is discovery! Explore the wonders of the world and unlock your curiosity!"
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Explore beliefs, values, and traditions from around the world.',
      progress: isGuest ? 0 : 40,
      totalLessons: 20,
      completedLessons: isGuest ? 0 : 8,
      estimatedTime: '6 weeks',
      difficulty: 'Beginner',
      topics: religiousEducationTopics,
      nextLesson: 'Introduction to Religion',
      guestAvailable: true,
      guestLessons: 4,
      mascotAdvice: "SomaSmart says: Wisdom comes from understanding different perspectives! Explore diverse viewpoints and grow your mind!"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 border-green-200';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Advanced': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleUpgrade = () => {
    navigate('/guest-to-account');
  };

  // Replace handleSubjectSelect logic for subject card click
  const handleSubjectCardClick = (subjectId: string, available: boolean) => {
    if (!available) return;
    setPendingSubjectId(subjectId);
    setShowAccessModal(true);
  };

  // Called after user chooses access method in modal
  const handleAccessChoice = (mode: 'signup' | 'login' | 'guest') => {
    setShowAccessModal(false);
    if (!pendingSubjectId) return;
    if (mode === 'signup') {
      navigate('/signup');
    } else if (mode === 'login') {
      navigate('/login');
    } else if (mode === 'guest') {
      setSelectedSubject(pendingSubjectId);
    }
    setPendingSubjectId(null);
  };

  const handleTopicClick = (subjectId: string, topicId: string, available: boolean) => {
    if (!available) {
      handleUpgrade();
      return;
    }
    
    // Track topic exploration for guests
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        timeSpent: 3
      });
    }
    
    // Navigate directly to the specific topic lesson
    navigate('lesson', { state: { subjectId, topicId } });
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  // If a subject is selected, show its topics
  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    const Icon = subject.icon;
    const isLocked = isGuest && !subject.guestAvailable;

    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackToSubjects}
          className="mb-6"
        >
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
          Back to All Subjects
        </Button>

        {/* Subject Header */}
        <div ref={subjectHeaderRef} className={`bg-gradient-to-r ${subject.gradient} rounded-2xl p-8 text-white mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Explore {subject.name}</h1>
                <p className="text-white/90 text-lg">{subject.description}</p>
              </div>
            </div>
            
            {!isGuest && (
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">{subject.progress}%</div>
                <div className="text-white/80">Complete</div>
              </div>
            )}
          </div>

          {/* Progress Bar for logged-in users */}
          {!isGuest && (
            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Eagle's Advice */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Logo className="text-5xl" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-900 mb-3">SomaSmart's Learning Guidance</h3>
                <p className="text-amber-800 text-lg leading-relaxed">{subject.mascotAdvice}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-amber-700">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Estimated: {subject.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4" />
                    <span>{subject.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{subject.difficulty} level</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topics Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose Your Learning Path
            {isGuest && <span className="text-lg text-orange-600 ml-3">(Full Access Available)</span>}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.topics.map((topic, index) => {
              const isTopicLocked = isGuest && !topic.guestAllowed;
              
              return (
                <Card
                  key={topic.id}
                  className={`transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden ${
                    isTopicLocked 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:shadow-xl hover:-translate-y-2 cursor-pointer'
                  }`}
                  onClick={() => !isTopicLocked && handleTopicClick(subject.id, topic.id, !isTopicLocked)}
                >
                  {isTopicLocked && (
                    <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center">
                      <div className="text-center bg-white p-4 rounded-lg shadow-lg border">
                        <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Create Account</p>
                        <p className="text-xs text-gray-600">to unlock</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Topic Header */}
                  <div className={`bg-gradient-to-r ${subject.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{topic.icon}</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{index + 1}</div>
                        <div className="text-xs opacity-80">Topic</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                    <p className="text-white/90 text-sm">{topic.description}</p>
                  </div>

                  <CardContent className="p-6">
                    {/* Topic Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{topic.lessons}</div>
                        <div className="text-xs text-gray-600">Lessons</div>
                      </div>
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Guest Access Indicator */}
                    {isGuest && topic.guestAllowed && (
                      <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-center">
                        <span className="text-green-700 text-sm font-medium">✨ Try Free Sample</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full"
                      disabled={isTopicLocked}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isTopicLocked) handleTopicClick(subject.id, topic.id, true);
                      }}
                    >
                      {isTopicLocked ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {isGuest ? 'Try Sample' : 'Start Learning'}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Guest Upgrade Prompt */}
        {isGuest && (
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <Logo className="text-5xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Save Your Progress?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                You've explored our learning platform! Create an account to save your progress, 
                track your achievements, and unlock premium features.
              </p>
              <Button onClick={handleUpgrade} size="lg" className="px-8">
                <UserPlus className="h-5 w-5 mr-2" />
                Create Free Account
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Main subjects view
  return (
    <AppLayout>
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Eagle Welcome */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <Logo className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Learning Journey!</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm SomaSmart, your learning companion! Choose a subject below to explore topics designed specifically for Zambian students.
          </p>
        </div>
        
        {isGuest && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <Logo className="text-3xl" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">SomaSmart's Guest Mode</h3>
                  <p className="text-amber-800">
                    Explore all subjects and topics! Create an account to save your progress and unlock premium features with SomaSmart!
                  </p>
                </div>
              </div>
              <Button
                onClick={handleUpgrade}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Join the Flight
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Subjects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isLocked = isGuest && !subject.guestAvailable;
          return (
            <Card key={subject.id} className="overflow-hidden">
              <div className={`p-6 ${subject.color} text-white rounded-t-xl flex items-center space-x-4`}>
                <Icon className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">{subject.name}</h2>
                  <p className="text-white/90 text-sm">{subject.description}</p>
                </div>
              </div>
              <CardContent className="p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{subject.completedLessons}/{subject.totalLessons}</div>
                    <div className="text-xs text-gray-600">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{subject.estimatedTime}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{subject.topics.length}</div>
                    <div className="text-xs text-gray-600">Topics</div>
                  </div>
                </div>
                <Button
                  className={`w-full mt-4 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLocked}
                  onClick={() => {
                    if (!isLocked) setSelectedSubject(subject.id);
                  }}
                >
                        <Play className="h-4 w-4 mr-2" />
                        Explore Topics
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Access Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowAccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
              title="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg bg-gradient-to-r from-green-600 to-blue-600">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Access Subjects
              </h3>
              <p className="text-gray-600">
                Choose how you'd like to access our learning subjects
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => handleAccessChoice('signup')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <Star className="h-4 w-4 mr-2" />
                Sign Up & Play (Recommended)
              </Button>
              <Button
                onClick={() => handleAccessChoice('login')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign In to Continue
              </Button>
              <Button
                onClick={() => handleAccessChoice('guest')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-lg transition-all duration-300"
                variant="zambian-primary"
              >
                <Users className="h-4 w-4 mr-2" />
                Try as Guest (Limited Access)
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Guest mode includes 4 sample topics per subject. Create an account for full access!
            </p>
          </div>
        </div>
      )}
      {/* Eagle's Motivational Message */}
      <Card className="mt-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white overflow-hidden">
        <CardContent className="p-8 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative z-10 text-center">
            <Logo className="text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-4">SomaSmart's Learning Philosophy</h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              "Like an eagle that soars high above the mountains, learning takes you to new heights! 
              Each subject is a different wind current that will help you fly further. 
              Choose your path, spread your wings, and let's explore the world of knowledge together!"
            </p>
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>Curriculum-Aligned</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>Gamified Learning</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Zambian Context</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </AppLayout>
  );
}

export default SubjectCatalog;