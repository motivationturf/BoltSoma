# replit.md

## Overview

SomaSmart EduHub is a full-stack gamified learning platform designed for Zambian students in grades 8-12. The application provides interactive educational content across four core subjects: Computer Studies/ICT, Mathematics, Sciences, and Religious Education. Built with modern web technologies, it features both authenticated user experiences and guest access capabilities.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and context (no external state management library)
- **UI Components**: Custom component library based on Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL via Neon Database service
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage

### Build and Development
- **Development**: Vite dev server with HMR and Express API
- **Production**: Static client build served by Express with API routes
- **TypeScript**: Shared type definitions across client/server boundary

## Key Components

### Authentication System
- Multi-modal registration/login (email or mobile number)
- Guest access with progress tracking
- Account upgrade flow for guest users
- Zambian mobile number validation (+260 format)

### Educational Content Delivery
- **Subjects**: Computer Studies/ICT, Mathematics, Sciences, Religious Education
- **Interactive Lessons**: Step-by-step content with multimedia support
- **Quiz System**: Multiple choice assessments with instant feedback
- **Game Arcade**: 5 different game modes for engaging learning

### Gamification Features
- **Achievement System**: Badges and progress tracking
- **Leaderboards**: Subject-specific and overall rankings
- **Challenges**: Weekly competitions and timed challenges
- **Progress Analytics**: Detailed learning statistics

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: ARIA compliance and keyboard navigation
- **Theme System**: CSS custom properties for consistent theming
- **Component Library**: Reusable UI components with consistent styling

## Data Flow

### User Authentication Flow
1. User chooses registration method (email/mobile)
2. Form validation on client-side
3. Server-side validation and user creation
4. Session establishment with secure cookies
5. Profile completion and onboarding

### Learning Progress Flow
1. User selects subject/lesson
2. Content fetched from lesson repository
3. Interactive elements track completion
4. Progress updates stored in user profile
5. Achievement system checks for unlocks
6. Statistics updated for leaderboards

### Guest User Flow
1. Guest access without registration
2. Local storage tracks temporary progress
3. Limited feature access with upgrade prompts
4. Option to convert to full account with progress migration

## External Dependencies

### Database and Storage
- **Neon Database**: PostgreSQL-compatible serverless database
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form handling with validation

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production
- **Replit Integration**: Development environment optimization

## Deployment Strategy

### Environment Configuration
- Database URL from environment variables
- Separate development and production configurations
- Replit-specific optimizations and error handling

### Build Process
1. Client-side Vite build generates static assets
2. Server-side ESBuild bundles Express application
3. Static files served from Express in production
4. Database migrations run via Drizzle Kit

### Production Setup
- Express server serves both API and static content
- PostgreSQL database with connection pooling
- Session management with database persistence
- Error handling and logging for production monitoring

## Changelog

```
Changelog:
- July 01, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```