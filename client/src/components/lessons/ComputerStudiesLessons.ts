// Computer Studies/ICT lessons
const computerStudiesLessons = {
  'programming-basics': {
    id: 1,
    title: 'Programming Fundamentals',
    subject: 'Computer Studies/ICT',
    duration: '45 minutes',
    difficulty: 'Beginner',
    points: 100,
    sections: [
      {
        id: 0,
        title: 'What is Programming?',
        type: 'interactive',
        duration: '12 minutes',
        content: 'Learn programming fundamentals through interactive examples and hands-on practice.',
        lessonId: 'programming-basics',
        completed: false,
        guestAllowed: true
      },
      {
        id: 1,
        title: 'Programming Concepts Video',
        type: 'video',
        duration: '8 minutes',
        content: 'Watch an introduction to programming concepts and real-world applications.',
        videoUrl: 'https://example.com/video1.mp4',
        completed: false,
        guestAllowed: true
      },
      {
        id: 2,
        title: 'Variables and Data Types',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Interactive lesson on variables, data types, and basic programming concepts.',
        lessonId: 'variables-datatypes',
        completed: false,
        guestAllowed: false
      },
      {
        id: 3,
        title: 'Programming Quiz',
        type: 'quiz',
        duration: '10 minutes',
        content: 'Test your understanding with interactive programming questions.',
        completed: false,
        guestAllowed: false
      }
    ]
  },
  'web-development': {
    id: 2,
    title: 'Web Development Basics',
    subject: 'Computer Studies/ICT',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    points: 150,
    sections: [
      {
        id: 0,
        title: 'Introduction to HTML',
        type: 'interactive',
        duration: '20 minutes',
        content: 'Learn HTML structure and basic tags for web development.',
        lessonId: 'html-basics',
        completed: false,
        guestAllowed: true
      },
      {
        id: 1,
        title: 'CSS Styling',
        type: 'interactive',
        duration: '20 minutes',
        content: 'Style your web pages with CSS properties and selectors.',
        lessonId: 'css-basics',
        completed: false,
        guestAllowed: true
      },
      {
        id: 2,
        title: 'JavaScript Fundamentals',
        type: 'interactive',
        duration: '20 minutes',
        content: 'Add interactivity to your websites with JavaScript.',
        lessonId: 'javascript-basics',
        completed: false,
        guestAllowed: false
      }
    ]
  },
  'database-management': {
    id: 3,
    title: 'Database Management Fundamentals',
    subject: 'Computer Studies/ICT',
    duration: '50 minutes',
    difficulty: 'Advanced',
    points: 200,
    sections: [
      {
        id: 0,
        title: 'Introduction to Databases',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Learn what databases are and why they are important.',
        lessonId: 'database-intro',
        completed: false,
        guestAllowed: false
      },
      {
        id: 1,
        title: 'SQL Basics',
        type: 'interactive',
        duration: '25 minutes',
        content: 'Learn to query databases using SQL commands.',
        lessonId: 'sql-basics',
        completed: false,
        guestAllowed: false
      },
      {
        id: 2,
        title: 'Database Design',
        type: 'interactive',
        duration: '10 minutes',
        content: 'Design efficient database structures.',
        lessonId: 'database-design',
        completed: false,
        guestAllowed: false
      }
    ]
  }
};

export default computerStudiesLessons; 