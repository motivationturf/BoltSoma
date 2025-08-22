# SomaSmart EduHub - Backend Rules (.cursorrules-backend)

## Project Overview

Backend for SomaSmart EduHub educational platform built with Node.js (TypeScript), Drizzle ORM, and modern backend practices. Focus on scalable, secure, and maintainable API development.

## Core Backend Principles

### 1. Node.js + TypeScript Standards

- **TypeScript First**: Always use TypeScript with strict mode enabled
- **ES Modules**: Use modern ES module syntax (import/export)
- **Async/Await**: Prefer async/await over promises and callbacks
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Logging**: Structured logging with appropriate log levels

### 2. API Design & Architecture

#### RESTful API Standards

```typescript
// Standard API response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Example endpoint structure
app.get('/api/v1/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});
```

#### HTTP Methods & Status Codes

- **GET**: Retrieve data (200, 404, 500)
- **POST**: Create resources (201, 400, 409, 500)
- **PUT**: Update entire resources (200, 404, 400, 500)
- **PATCH**: Partial updates (200, 404, 400, 500)
- **DELETE**: Remove resources (204, 404, 500)

#### URL Structure

```

/api/v1/users                    # GET (list), POST (create)
/api/v1/users/:id                # GET (read), PUT (update), DELETE (delete)
/api/v1/users/:id/courses        # GET user's courses
/api/v1/courses/:id/students     # GET course students
/api/v1/courses/:id/assignments  # GET course assignments
```

### 3. Database Management with Drizzle ORM

#### Schema Design

```typescript
// User schema example
import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('student'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  description: varchar('description', { length: 1000 }),
  instructorId: serial('instructor_id').references(() => users.id),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
  courses: many(courses),
}));

export const courseRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, { fields: [courses.instructorId], references: [users.id] }),
}));
```

#### Query Patterns

```typescript
// Service layer example
export class UserService {
  constructor(private db: Database) {}
  
  async findById(id: number): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    return result[0] || null;
  }
  
  async create(userData: CreateUserData): Promise<User> {
    const result = await this.db
      .insert(users)
      .values(userData)
      .returning();
    
    return result[0];
  }
  
  async update(id: number, userData: UpdateUserData): Promise<User | null> {
    const result = await this.db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    return result[0] || null;
  }
  
  async findWithCourses(id: number): Promise<UserWithCourses | null> {
    const result = await this.db
      .select()
      .from(users)
      .leftJoin(courses, eq(users.id, courses.instructorId))
      .where(eq(users.id, id));
    
    // Transform result to include nested courses
    return this.transformUserWithCourses(result);
  }
}
```

#### Migration Management

```typescript
// Migration example
import { sql } from 'drizzle-orm';

// drizzle/migrations/0001_add_user_preferences.sql
export async function up(db: Database) {
  await db.execute(sql`
    ALTER TABLE users 
    ADD COLUMN preferences JSONB DEFAULT '{}';
  `);
  
  await db.execute(sql`
    CREATE INDEX idx_users_preferences ON users USING GIN (preferences);
  `);
}

export async function down(db: Database) {
  await db.execute(sql`
    DROP INDEX idx_users_preferences;
    ALTER TABLE users DROP COLUMN preferences;
  `);
}
```

### 4. Authentication & Authorization

#### JWT Implementation

```typescript
// Authentication middleware
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'MISSING_TOKEN',
        message: 'Access token is required'
      }
    });
  }
  
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }
    
    req.user = user as JWTPayload;
    next();
  });
};

// Role-based authorization
export const authorize = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        }
      });
    }
    
    next();
  };
};
```

#### Password Security

```typescript
import bcrypt from 'bcryptjs';

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
  
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  generateJWT(user: User): string {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
  }
}
```

### 5. Input Validation & Sanitization

#### Zod Schema Validation

```typescript
import { z } from 'zod';

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  role: z.enum(['student', 'instructor', 'admin']).default('student'),
});

export const updateUserSchema = createUserSchema.partial();

// Course validation schemas
export const createCourseSchema = z.object({
  title: z.string().min(1, 'Course title is required').max(200),
  description: z.string().max(1000).optional(),
  instructorId: z.number().positive('Invalid instructor ID'),
});

// Validation middleware
export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors
          }
        });
      }
      next(error);
    }
  };
};
```

### 6. Error Handling & Logging

#### Error Handling Middleware

```typescript
// Custom error classes
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

// Global error handler
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Unhandled error:', error);
  
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    });
  }
  
  // Default error response
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  });
};
```

#### Structured Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export { logger };
```

### 7. Security Best Practices

#### Security Middleware

```typescript
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP'
    }
  }
});

app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts'
    }
  }
});

app.use('/api/auth/', authLimiter);
```

#### Input Sanitization

```typescript
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input);
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return input;
};

// Sanitization middleware
export const sanitizeRequestData = (req: Request, res: Response, next: NextFunction) => {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);
  next();
};
```

### 8. Educational Platform Backend Features

#### Course Management

```typescript
// Course service with enrollment logic
export class CourseService {
  constructor(private db: Database) {}
  
  async enrollStudent(courseId: number, studentId: number): Promise<Enrollment> {
    // Check if already enrolled
    const existingEnrollment = await this.db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.courseId, courseId),
          eq(enrollments.studentId, studentId)
        )
      )
      .limit(1);
    
    if (existingEnrollment.length > 0) {
      throw new AppError('Student already enrolled in this course', 409, 'ALREADY_ENROLLED');
    }
    
    const result = await this.db
      .insert(enrollments)
      .values({
        courseId,
        studentId,
        enrolledAt: new Date()
      })
      .returning();
    
    return result[0];
  }
  
  async getStudentProgress(courseId: number, studentId: number): Promise<StudentProgress> {
    const assignments = await this.db
      .select()
      .from(assignments)
      .where(eq(assignments.courseId, courseId));
    
    const submissions = await this.db
      .select()
      .from(submissions)
      .where(
        and(
          eq(submissions.studentId, studentId),
          inArray(submissions.assignmentId, assignments.map(a => a.id))
        )
      );
    
    return {
      totalAssignments: assignments.length,
      completedAssignments: submissions.length,
      averageGrade: this.calculateAverageGrade(submissions),
      progressPercentage: (submissions.length / assignments.length) * 100
    };
  }
}
```

#### Assignment & Grading System

```typescript
// Assignment service
export class AssignmentService {
  async submitAssignment(assignmentId: number, studentId: number, content: string): Promise<Submission> {
    const assignment = await this.db
      .select()
      .from(assignments)
      .where(eq(assignments.id, assignmentId))
      .limit(1);
    
    if (!assignment[0]) {
      throw new NotFoundError('Assignment');
    }
    
    if (new Date() > assignment[0].dueDate) {
      throw new AppError('Assignment submission deadline has passed', 400, 'DEADLINE_PASSED');
    }
    
    const result = await this.db
      .insert(submissions)
      .values({
        assignmentId,
        studentId,
        content,
        submittedAt: new Date(),
        status: 'submitted'
      })
      .returning();
    
    return result[0];
  }
  
  async gradeSubmission(submissionId: number, grade: number, feedback: string): Promise<Submission> {
    const result = await this.db
      .update(submissions)
      .set({
        grade,
        feedback,
        gradedAt: new Date(),
        status: 'graded'
      })
      .where(eq(submissions.id, submissionId))
      .returning();
    
    return result[0];
  }
}
```

### 9. File Structure

```
src/
├── controllers/          # Route handlers
│   ├── auth.controller.ts
│
