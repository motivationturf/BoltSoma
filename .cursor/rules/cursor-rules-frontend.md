# SomaSmart EduHub - Frontend Rules (.cursorrules-frontend)

## Project Overview

Frontend for SomaSmart EduHub educational platform built with React (TypeScript), Tailwind CSS, and Vite. Focus on creating exceptional user experiences with modern design patterns and accessibility-first development.

## Core Frontend Principles

### 1. React + TypeScript Standards

- **Components**: Use functional components with hooks exclusively
- **TypeScript**: Strict type checking with comprehensive interfaces
- **Props**: Always define proper TypeScript interfaces for all props
- **State Management**: useState for local, TanStack Query for server state, Zustand for global state
- **Error Boundaries**: Implement error boundaries for robust error handling

### 2. Component Architecture

#### Component Structure

```typescript
// Standard component template
interface ComponentProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Component: React.FC<ComponentProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  // Component implementation with proper TypeScript
};

export default Component;
```

#### Component Guidelines

- **Compound Components**: Use for complex UI elements (Accordion, Dropdown, etc.)
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Memoization**: Use React.memo() for performance optimization
- **Prop Drilling**: Avoid deep prop drilling - use Context or state management

### 3. Tailwind CSS & Design System

#### Styling Philosophy

- **Utility-First**: Prefer Tailwind utilities over custom CSS
- **Consistent Spacing**: Use Tailwind's spacing scale (4px base unit)
- **Responsive Design**: Mobile-first approach with all breakpoints
- **Dark Mode**: Implement with `dark:` prefix and system preference detection

#### Design Tokens

```typescript
// Design system configuration
const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      500: '#64748b',
      900: '#0f172a',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};
```

#### Responsive Breakpoints

- `sm:` - 640px and up (tablet)
- `md:` - 768px and up (desktop)
- `lg:` - 1024px and up (large desktop)
- `xl:` - 1280px and up (extra large)
- `2xl:` - 1536px and up (ultra wide)

### 4. UI/UX Excellence

#### Visual Design Patterns

- **Typography**: Clear hierarchy using Tailwind's font utilities
- **Color System**: Semantic colors with proper contrast ratios
- **Shadows**: Subtle elevation using Tailwind's shadow utilities
- **Borders**: Consistent border radius and stroke weights
- **Spacing**: Logical spacing patterns throughout the interface

#### Interactive Elements

```typescript
// Button component example
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  children,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};
```

#### User Experience Patterns

- **Loading States**: Skeleton screens, spinners, and progressive loading
- **Empty States**: Helpful illustrations and clear calls-to-action
- **Error States**: Clear error messages with recovery options
- **Success States**: Confirmation messages and visual feedback
- **Form Validation**: Real-time validation with helpful error messages

### 5. Forms & Validation

#### Form Implementation

```typescript
// Use react-hook-form with Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const UserForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      {/* Additional form fields */}
    </form>
  );
};
```

### 6. Accessibility Standards

#### WCAG 2.1 AA Compliance

- **Semantic HTML**: Use proper HTML elements and structure
- **ARIA Labels**: Add appropriate ARIA attributes
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Focus Management**: Proper focus indicators and management
- **Color Contrast**: Maintain minimum 4.5:1 contrast ratio
- **Screen Readers**: Test with screen reader software

#### Accessibility Implementation

```typescript
// Accessible modal component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus management
      const firstFocusable = document.querySelector('[data-focus-first]');
      if (firstFocusable) {
        (firstFocusable as HTMLElement).focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          data-focus-first
        >
          Close
        </button>
      </div>
    </div>
  );
};
```

### 7. Performance Optimization

#### React Performance

- **Code Splitting**: Use React.lazy() for route-based code splitting
- **Memoization**: React.memo() for expensive components
- **useMemo/useCallback**: For expensive calculations and function references
- **Virtual Scrolling**: For large lists using react-window or react-virtualized
- **Image Optimization**: Proper image loading and optimization

#### Bundle Optimization

```typescript
// Lazy loading example
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Route implementation
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</Suspense>
```

### 8. Educational Platform UI Components

#### Student Dashboard Components

- **Progress Cards**: Visual progress indicators with animations
- **Course Grid**: Responsive course card layout
- **Calendar Widget**: Interactive assignment calendar
- **Grade Charts**: Performance visualization components

#### Instructor Tools

- **Course Builder**: Drag-and-drop interface components
- **Student Analytics**: Dashboard with charts and metrics
- **Grading Interface**: Streamlined grading workflow components
- **Communication Panel**: Messaging and announcement components

### 9. File Structure

```

src/
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── services/             # API service functions
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── styles/               # Global styles and Tailwind config
└── pages/                # Page components
```

### 10. Testing Standards

#### Testing Approach

- **Unit Tests**: Jest + React Testing Library for components
- **Integration Tests**: Testing component interactions
- **Accessibility Tests**: axe-core integration
- **Visual Regression**: Storybook with Chromatic

#### Test Example

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Quick Reference Commands

### Component Creation

- "Create a button component" - Generate accessible button with variants
- "Create a form component" - Generate form with validation
- "Create a modal component" - Generate accessible modal
- "Create a card component" - Generate responsive card layout

### Styling Commands

- "Style this component" - Apply Tailwind utilities with design system
- "Make it responsive" - Add responsive breakpoints
- "Add dark mode" - Implement dark mode support
- "Make it accessible" - Add accessibility features

### Performance Commands

- "Optimize this component" - Add memoization and performance optimizations
- "Add loading states" - Implement loading UI patterns
- "Add error boundaries" - Implement error handling

Remember: Always prioritize accessibility, performance, and user experience. Every component should be responsive, accessible, and follow the established design system.

### 11. Animation Standards with Framer Motion

#### Animation Philosophy

- **Purposeful Animations**: Every animation should serve a UX purpose
- **Performance First**: Use Framer Motion's optimized animations
- **Consistent Timing**: Standardize animation durations and easing
- **Accessibility**: Respect `prefers-reduced-motion` setting

#### Framer Motion Implementation

```typescript
// Standard animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

// Page transitions
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};
```

#### Component Animation Examples

```typescript
// Animated card component
const AnimatedCard: React.FC<CardProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="card-zambian"
    >
      {children}
    </motion.div>
  );
};

// Animated button with loading state
const AnimatedButton: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="btn-primary"
      disabled={isLoading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
```

#### Animation Guidelines

- **Entry Animations**: Use `fadeInUp` for cards, `slideInLeft` for navigation
- **Hover Effects**: Subtle scale (1.02-1.05) and lift effects
- **Loading States**: Smooth transitions between states
- **Page Transitions**: Consistent page-to-page animations
- **Micro-interactions**: Button clicks, form submissions, achievements
