# SomaSmart EduHub - Code Standards

## 📋 Overview

This document outlines the coding standards and best practices for the SomaSmart EduHub project.

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
npm install --legacy-peer-deps
```

### Available Scripts
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint with auto-fix
npm run lint:check       # Check for linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
npm run type-check       # Run TypeScript type checking

# Database
npm run db:push          # Push database schema changes
```

## 📝 Code Standards

### TypeScript

#### ✅ Do's
- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Use type annotations for function parameters and return types
- Prefer `interface` over `type` for object shapes
- Use `Partial<T>` for optional properties
- Use `Record<string, T>` for object maps

#### ❌ Don'ts
- Avoid `any` type - use proper interfaces instead
- Don't use `@ts-ignore` without explanation
- Don't use `as` type assertions unless absolutely necessary

#### Example
```typescript
// ✅ Good
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

function updateUser(user: Partial<User>): Promise<void> {
  // Implementation
}

// ❌ Bad
function updateUser(user: any): Promise<void> {
  // Implementation
}
```

### React Components

#### ✅ Do's
- Use functional components with hooks
- Use named exports for components
- Use proper TypeScript interfaces for props
- Use destructuring for props
- Use proper event handling types

#### ❌ Don'ts
- Don't use default exports for components
- Don't use `any` for prop types
- Don't use inline styles unless necessary

#### Example
```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// ❌ Bad
export default function Button(props: any) {
  return <button {...props} />;
}
```

### File Organization

#### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API and business logic
├── context/            # React context providers
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

#### File Naming
- Use PascalCase for component files: `Button.tsx`
- Use camelCase for utility files: `formatDate.ts`
- Use kebab-case for page files: `user-profile.tsx`

### Import Organization

#### Order
1. React and core libraries
2. Third-party libraries
3. Internal components
4. Hooks and utilities
5. Types and interfaces

#### Example
```typescript
// 1. React and core libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { Mail, User } from 'lucide-react';

// 3. Internal components
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// 4. Hooks and utilities
import { useAuth } from '../../hooks/useAuth';

// 5. Types and interfaces
import type { User } from '../../types';
```

### Error Handling

#### ✅ Do's
- Use proper error types
- Handle errors gracefully
- Provide meaningful error messages
- Use try-catch blocks appropriately

#### Example
```typescript
interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

const handleError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'An unknown error occurred' };
};

try {
  await apiCall();
} catch (error) {
  const apiError = handleError(error);
  console.error(apiError.message);
}
```

### Accessibility

#### ✅ Do's
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Use proper color contrast
- Test with screen readers

#### Example
```typescript
// ✅ Good
<button 
  onClick={handleClick}
  aria-label="Close modal"
  className="btn"
>
  <X className="h-4 w-4" />
</button>

// ❌ Bad
<div onClick={handleClick} className="btn">
  <X className="h-4 w-4" />
</div>
```

## 🔧 Configuration Files

### ESLint Configuration
- Enforces TypeScript best practices
- Prevents use of `any` type
- Warns about console.log statements
- Ensures React best practices

### Prettier Configuration
- 2-space indentation
- Single quotes
- 80 character line length
- Trailing commas
- Consistent formatting

## 🧪 Testing

### Component Testing
- Test component rendering
- Test user interactions
- Test error states
- Test loading states

### Example
```typescript
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
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 📊 Performance

### ✅ Do's
- Use React.memo for expensive components
- Use useMemo for expensive calculations
- Use useCallback for event handlers
- Lazy load components when appropriate
- Optimize bundle size

### Example
```typescript
// ✅ Good
const ExpensiveComponent = React.memo(({ data }: Props) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return <div onClick={handleClick}>{processedData}</div>;
});
```

## 🚀 Deployment

### Build Process
1. Run type checking: `npm run type-check`
2. Run linting: `npm run lint:check`
3. Run formatting check: `npm run format:check`
4. Build application: `npm run build`
5. Test build locally: `npm run start`

### Pre-commit Hooks
Consider setting up pre-commit hooks to:
- Run linting
- Run type checking
- Format code
- Run tests

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

## 🤝 Contributing

1. Follow the code standards outlined above
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed
5. Submit pull requests with clear descriptions

## 📞 Support

For questions about code standards or development setup, please:
1. Check this document first
2. Review existing code examples
3. Ask in the team chat
4. Create an issue if needed 