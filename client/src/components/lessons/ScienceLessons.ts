// Science lessons
const scienceLessons = {
  'scientific-method': {
    id: 6,
    title: 'The Scientific Method',
    subject: 'Sciences',
    duration: '40 minutes',
    difficulty: 'Beginner',
    points: 100,
    sections: [
      {
        id: 0,
        title: 'Introduction to Scientific Method',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Learn the steps of scientific inquiry through interactive examples.',
        lessonId: 'scientific-method',
        completed: false,
        guestAllowed: true
      },
      {
        id: 1,
        title: 'Famous Scientific Discoveries',
        type: 'video',
        duration: '8 minutes',
        content: 'Watch how great scientists used the scientific method.',
        videoUrl: 'https://example.com/science-video.mp4',
        completed: false,
        guestAllowed: true
      },
      {
        id: 2,
        title: 'Virtual Laboratory',
        type: 'interactive',
        duration: '12 minutes',
        content: 'Conduct virtual experiments using the scientific method.',
        lessonId: 'virtual-lab',
        completed: false,
        guestAllowed: false
      },
      {
        id: 3,
        title: 'Scientific Method Quiz',
        type: 'quiz',
        duration: '10 minutes',
        content: 'Test your understanding of scientific inquiry.',
        completed: false,
        guestAllowed: false
      }
    ]
  }
};

export default scienceLessons; 