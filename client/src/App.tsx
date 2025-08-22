import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProviderV2 } from './context/AuthContextV2';
import { AuthGuard, ProtectedRoute, GuestOnlyRoute, UserOnlyRoute } from './components/auth/AuthGuard';
import { Navigation } from './components/layout/Navigation';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import SupabaseApp from './components/SupabaseApp';
import './index.css';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const GuestPage = lazy(() => import('./pages/GuestPage'));
const GuestUpgradePage = lazy(() => import('./pages/GuestUpgradePage'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SubjectsPage = lazy(() => import('./pages/SubjectsPage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));
const LeaderboardsPage = lazy(() => import('./pages/LeaderboardsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ArcadePage = lazy(() => import('./pages/ArcadePage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const AiHubPage = lazy(() => import('./pages/AiHubPage'));
const ChisomoChatPage = lazy(() => import('./pages/ChisomoChatPage'));
const StudyPlannerPage = lazy(() => import('./pages/StudyPlannerPage'));
const LearningInsightsPage = lazy(() => import('./pages/LearningInsightsPage'));
const ContentStudioPage = lazy(() => import('./pages/ContentStudioPage'));
const TeacherDashboardPage = lazy(() => import('./pages/TeacherDashboardPage'));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}

export default function App() {
  return (
    <AuthProviderV2>
      <div className="min-h-screen bg-gray-50">
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/guest" element={<GuestPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/supabase" element={<SupabaseApp />} />

              {/* Guest upgrade route */}
              <Route 
                path="/guest/upgrade" 
                element={
                  <GuestOnlyRoute>
                    <GuestUpgradePage />
                  </GuestOnlyRoute>
                } 
              />
              
              {/* Protected routes - Allow guests with limited access */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subjects" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <SubjectsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subjects/:subjectId/topics" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <SubjectsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/challenges" 
                element={
                  <ProtectedRoute>
                    <ChallengesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leaderboards" 
                element={
                  <ProtectedRoute>
                    <LeaderboardsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <UserOnlyRoute>
                    <ProfilePage />
                  </UserOnlyRoute>
                } 
              />
              <Route 
                path="/arcade" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <ArcadePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lesson" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <LessonPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lesson/:lessonId" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <LessonPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/quiz" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <QuizPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/quiz/:quizId" 
                element={
                  <ProtectedRoute guestAllowed={true}>
                    <QuizPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-hub" 
                element={
                  <ProtectedRoute>
                    <AiHubPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-chisomo" 
                element={
                  <ProtectedRoute>
                    <ChisomoChatPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-planner" 
                element={
                  <ProtectedRoute>
                    <StudyPlannerPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-insights" 
                element={
                  <ProtectedRoute>
                    <LearningInsightsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-content-studio" 
                element={
                  <ProtectedRoute>
                    <ContentStudioPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Teacher routes */}
              <Route 
                path="/teacher-dashboard" 
                element={
                  <ProtectedRoute>
                    <TeacherDashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProviderV2>
  );
}