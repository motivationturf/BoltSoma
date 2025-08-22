// Religious Education lessons
const religiousEducationLessons = {
  'world-religions': {
    id: 7,
    title: 'Understanding World Religions',
    subject: 'Religious Education',
    duration: '35 minutes',
    difficulty: 'Beginner',
    points: 100,
    sections: [
      {
        id: 0,
        title: 'What is Religion?',
        type: 'interactive',
        duration: '12 minutes',
        content: 'Explore the role of religion in human society and culture.',
        lessonId: 'world-religions',
        completed: false,
        guestAllowed: true
      },
      {
        id: 1,
        title: 'Religious Traditions Video',
        type: 'video',
        duration: '10 minutes',
        content: 'Visual journey through major world religions.',
        videoUrl: 'https://example.com/religion-video.mp4',
        completed: false,
        guestAllowed: true
      },
      {
        id: 2,
        title: 'Comparative Religion Study',
        type: 'interactive',
        duration: '15 minutes',
        content: 'Compare beliefs, practices, and values across religions.',
        lessonId: 'comparative-religion',
        completed: false,
        guestAllowed: false
      },
      {
        id: 3,
        title: 'Religion and Ethics Quiz',
        type: 'quiz',
        duration: '8 minutes',
        content: 'Assess your understanding of religious concepts.',
        completed: false,
        guestAllowed: false
      }
    ]
  }
};

export default religiousEducationLessons; 