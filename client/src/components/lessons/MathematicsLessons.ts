// Mathematics lessons
const mathematicsLessons = {
  'basic-arithmetic': {
    id: 4,
    title: 'Basic Arithmetic Operations',
    subject: 'Mathematics',
    duration: '50 minutes',
    difficulty: 'Beginner',
    points: 100,
    sections: [
      {
        id: 0,
        title: 'Welcome to Arithmetic!',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Learn addition, subtraction, multiplication, and division through interactive examples.',
        lessonId: 'basic-arithmetic',
        completed: false,
        guestAllowed: true
      },
      {
        id: 1,
        title: 'Arithmetic in Daily Life',
        type: 'video',
        duration: '10 minutes',
        content: 'See how arithmetic is used in everyday Zambian contexts.',
        videoUrl: 'https://example.com/math-video.mp4',
        completed: false,
        guestAllowed: true
      },
      {
        id: 2,
        title: 'Practice Problems',
        type: 'interactive',
        duration: '20 minutes',
        content: 'Solve real-world arithmetic problems with step-by-step guidance.',
        lessonId: 'arithmetic-practice',
        completed: false,
        guestAllowed: false
      },
      {
        id: 3,
        title: 'Arithmetic Assessment',
        type: 'quiz',
        duration: '15 minutes',
        content: 'Test your arithmetic skills with varied problem types.',
        completed: false,
        guestAllowed: false
      }
    ]
  },
  'algebra': {
    id: 5,
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    duration: '55 minutes',
    difficulty: 'Intermediate',
    points: 120,
    sections: [
      {
        id: 0,
        title: 'What is Algebra?',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Discover the world of variables and algebraic expressions.',
        lessonId: 'algebra-intro',
        completed: false,
        guestAllowed: true
      },
      {
        id: 1,
        title: 'Solving Linear Equations',
        type: 'interactive',
        duration: '25 minutes',
        content: 'Master the art of solving equations with one variable.',
        lessonId: 'linear-equations',
        completed: false,
        guestAllowed: true
      },
      {
        id: 2,
        title: 'Graphing Linear Functions',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Visualize algebraic relationships through graphs.',
        lessonId: 'linear-graphs',
        completed: false,
        guestAllowed: false
      }
    ]
  }
};

export default mathematicsLessons; 