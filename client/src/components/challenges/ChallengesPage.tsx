import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  Filter,
  Search,
  Zap,
  Award,
  Lock,
  UserPlus,
  Plus,
  TrendingUp,
  Play
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AppLayout } from '../layout/AppLayout';
import { Mascot } from '../mascot';
import { ChallengeCard } from './ChallengeCard';
import { ChallengeFilters } from './ChallengeFilters';
import { ChallengeStats } from './ChallengeStats';
import { ChallengeDetail } from './ChallengeDetail';
import { ChallengeMode } from './ChallengeMode';

interface ChallengesPageProps {
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function ChallengesPage({ isGuest = false, onUpdateProgress }: ChallengesPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'upcoming'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [challengeMode, setChallengeMode] = useState<number | null>(null);

  const userStats = {
    totalChallenges: isGuest ? 0 : 15,
    activeChallenges: isGuest ? 0 : 3,
    completedChallenges: isGuest ? 0 : 8,
    totalPoints: isGuest ? 0 : 2450,
    currentRank: isGuest ? 0 : 12,
    winRate: isGuest ? 0 : 75
  };

  const challenges = {
    active: [
      {
        id: 1,
        title: 'Math Speed Challenge',
        subject: 'Mathematics',
        description: 'Answer as many math questions as possible in 5 minutes! Test your speed and accuracy.',
        difficulty: 'Medium' as const,
        participants: 45,
        timeLeft: '2 days',
        points: 500,
        progress: isGuest ? 0 : 60,
        type: 'speed' as const,
        guestAllowed: true,
        status: 'active' as const,
        requirements: ['Basic Arithmetic', 'Algebra Fundamentals'],
        rewards: ['Speed Demon Badge', '500 Points', 'Leaderboard Recognition']
      },
      {
        id: 2,
        title: 'Science Knowledge Battle',
        subject: 'Sciences',
        description: 'Precision-based science quiz testing your knowledge across physics, chemistry, and biology.',
        difficulty: 'Hard' as const,
        participants: 32,
        timeLeft: '5 days',
        points: 750,
        progress: isGuest ? 0 : 25,
        type: 'accuracy' as const,
        guestAllowed: true,
        status: 'active' as const,
        requirements: ['Science Fundamentals', 'Lab Safety Training'],
        rewards: ['Science Master Badge', '750 Points', 'Lab Access']
      },
      {
        id: 3,
        title: 'Programming Marathon',
        subject: 'Computer Studies',
        description: 'Extended coding challenge testing endurance and problem-solving skills over 30 minutes.',
        difficulty: 'Hard' as const,
        participants: 28,
        timeLeft: '3 days',
        points: 1000,
        progress: isGuest ? 0 : 80,
        type: 'endurance' as const,
        guestAllowed: false,
        status: 'active' as const,
        requirements: ['Python Basics', 'Programming Logic'],
        rewards: ['Code Marathon Badge', '1000 Points', 'Advanced Course Access']
      }
    ],
    upcoming: [
      {
        id: 4,
        title: 'Ultimate Knowledge Tournament',
        subject: 'All Subjects',
        description: 'Multi-round tournament covering all subjects with elimination rounds.',
        difficulty: 'Hard' as const,
        participants: 0,
        startsIn: '3 days',
        points: 2000,
        type: 'tournament' as const,
        guestAllowed: false,
        status: 'upcoming' as const,
        requirements: ['Complete 5 challenges', 'Top 50 ranking', 'All subjects unlocked'],
        rewards: ['Tournament Champion', '2000 Points', 'Exclusive Badge', 'Certificate']
      },
      {
        id: 5,
        title: 'Religious Studies Debate',
        subject: 'Religious Education',
        description: 'Structured debate challenge on contemporary ethical and moral topics.',
        difficulty: 'Medium' as const,
        participants: 0,
        startsIn: '1 week',
        points: 600,
        type: 'debate' as const,
        guestAllowed: false,
        status: 'upcoming' as const,
        requirements: ['Ethics Module', 'Discussion Participation', 'Research Skills'],
        rewards: ['Debate Champion', '600 Points', 'Critical Thinking Badge']
      }
    ],
    completed: [
      {
        id: 6,
        title: 'Basic Math Sprint',
        subject: 'Mathematics',
        description: 'Quick-fire arithmetic challenge for beginners.',
        difficulty: 'Easy' as const,
        participants: 42,
        completedOn: '1 week ago',
        points: 250,
        rank: isGuest ? undefined : 8,
        type: 'speed' as const,
        guestAllowed: true,
        status: 'completed' as const,
        requirements: ['Basic Arithmetic'],
        rewards: ['Math Sprinter Badge', '250 Points']
      },
      {
        id: 7,
        title: 'Chemistry Lab Quiz',
        subject: 'Sciences',
        description: 'Test your knowledge of chemical reactions and lab procedures.',
        difficulty: 'Medium' as const,
        participants: 35,
        completedOn: '2 weeks ago',
        points: 400,
        rank: isGuest ? undefined : 5,
        type: 'accuracy' as const,
        guestAllowed: false,
        status: 'completed' as const,
        requirements: ['Chemistry Basics', 'Lab Safety'],
        rewards: ['Lab Expert Badge', '400 Points']
      }
    ]
  };

  const handleUpgrade = () => {
    navigate('/guest-to-account');
  };

  const handleChallengeClick = (challengeId: number) => {
    setSelectedChallenge(challengeId);
  };

  const handleStartChallenge = (challengeId: number) => {
    setChallengeMode(challengeId);
  };

  const handleJoinChallenge = (challengeId: number) => {
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        challengesTried: [challengeId.toString()],
        timeSpent: 5
      });
    }
    handleStartChallenge(challengeId);
  };

  const handleContinueChallenge = (challengeId: number) => {
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        challengesTried: [challengeId.toString()],
        timeSpent: 3
      });
    }
    handleStartChallenge(challengeId);
  };

  const handleViewResults = (challengeId: number) => {
    // TODO: Implement challenge results view
    alert(`Viewing results for challenge: ${challengeId}`);
  };

  // Filter challenges based on current filters
  const filterChallenges = (challengeList: any[]) => {
    return challengeList.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || challenge.subject.toLowerCase().includes(selectedSubject.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesType = selectedType === 'all' || challenge.type === selectedType;
      
      return matchesSearch && matchesSubject && matchesDifficulty && matchesType;
    });
  };

  const filteredChallenges = filterChallenges(challenges[activeTab]);

  // Challenge Mode View
  if (challengeMode) {
    return (
      <ChallengeMode
        challengeId={challengeMode}
        onBack={() => setChallengeMode(null)}
        isGuest={isGuest}
        onUpdateProgress={onUpdateProgress}
      />
    );
  }

  // Challenge Detail View
  if (selectedChallenge) {
    return (
      <ChallengeDetail
        challengeId={selectedChallenge}
        onBack={() => setSelectedChallenge(null)}
        onJoin={() => handleJoinChallenge(selectedChallenge)}
        onStart={() => handleStartChallenge(selectedChallenge)}
        isGuest={isGuest}
        onUpgrade={handleUpgrade}
      />
    );
  }

  return (
    <AppLayout>
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Challenges</h1>
            <p className="text-lg text-gray-600">
              Test your knowledge, compete with classmates, and earn points through exciting challenges.
            </p>
          </div>
          
          {!isGuest && (
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          )}
        </div>
        
        {isGuest && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                  <h3 className="font-medium text-blue-900">Guest Mode - Full Access</h3>
                  <p className="text-sm text-blue-700">Try all challenges! Create an account to save your progress and unlock premium features.</p>
              </div>
              <Button
                onClick={handleUpgrade}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <ChallengeStats isGuest={isGuest} stats={userStats} />

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {(['active', 'upcoming', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab} ({challenges[tab].length})
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <ChallengeFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {/* Challenge Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} onClick={() => handleChallengeClick(challenge.id)}>
            <ChallengeCard
              challenge={challenge}
              isGuest={isGuest}
              onJoin={handleJoinChallenge}
              onContinue={handleContinueChallenge}
              onViewResults={handleViewResults}
              onUpgrade={handleUpgrade}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <Mascot size="lg" mood="encouraging" showBubble={false} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No challenges found</h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' && "No active challenges match your filters. Try adjusting your search criteria."}
              {activeTab === 'upcoming' && "No upcoming challenges match your filters. Check back soon for new challenges!"}
              {activeTab === 'completed' && "No completed challenges match your filters. Complete some challenges to see them here!"}
            </p>
            
            {searchTerm || selectedSubject !== 'all' || selectedDifficulty !== 'all' || selectedType !== 'all' ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('all');
                  setSelectedDifficulty('all');
                  setSelectedType('all');
                }}
              >
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => setActiveTab('active')}>
                View Active Challenges
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Featured Challenges Section */}
      {activeTab === 'active' && filteredChallenges.length > 0 && (
        <div className="mt-12">
          <Card className="gradient bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden shadow-2xl border-0">
            <CardContent className="p-8 relative">
              {/* Background overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10 pointer-events-none"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-sm">🏆 Featured Challenge</h3>
                  <p className="text-white/95 mb-4 drop-shadow-sm font-medium">
                    Join our most popular challenge this week and compete for exclusive rewards!
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-white/90 font-medium">
                    <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Users className="h-4 w-4" />
                      <span>45+ participants</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Trophy className="h-4 w-4" />
                      <span>500 points</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span>2 days left</span>
                    </div>
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <Button 
                    className="bg-white text-indigo-600 hover:bg-gray-50 border-2 border-white/20 shadow-lg font-semibold px-8 py-300"
                    onClick={() => handleStartChallenge(1)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isGuest ? 'Try Sample' : 'Join Now'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </AppLayout>
  );
}