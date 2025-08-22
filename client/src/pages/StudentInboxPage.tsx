import React, { useState } from 'react';
import { UserContext } from '../context/UserContext';

// Mock data for received messages/feedback
const MOCK_INBOX = [
  {
    id: '1',
    type: 'feedback',
    from: 'Mr. Banda',
    date: '2024-07-10 09:30',
    subject: 'Challenge: Algebra Basics',
    message: 'Great effort on the challenge! Review the attached lesson for more practice.',
    read: false,
  },
  {
    id: '2',
    type: 'message',
    from: 'Mrs. Zulu',
    date: '2024-07-09 15:12',
    subject: 'Class Announcement',
    message: 'Reminder: Science quiz on Friday. Check your dashboard for revision materials.',
    read: true,
  },
];

const StudentInboxPage: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [inbox, setInbox] = useState(MOCK_INBOX);
  const [selected, setSelected] = useState<typeof MOCK_INBOX[0] | null>(null);

  // Only students can access
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-700">Access Denied</h2>
          <p className="text-gray-700">You must be logged in as a student to access this page.</p>
        </div>
      </div>
    );
  }

  const handleOpen = (msg: typeof MOCK_INBOX[0]) => {
    setSelected(msg);
    setInbox(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
  };
  const handleClose = () => setSelected(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block relative">
            <span className="text-3xl" role="img" aria-label="Notifications">🔔</span>
            {inbox.some(m => !m.read) && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">{inbox.filter(m => !m.read).length}</span>
            )}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Inbox</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {inbox.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No messages yet.</div>
          ) : (
            <ul className="divide-y">
              {inbox.map(msg => (
                <li key={msg.id} className={`flex items-start gap-3 py-3 cursor-pointer hover:bg-blue-50 rounded ${!msg.read ? 'font-semibold' : ''}`} onClick={() => handleOpen(msg)} aria-label={`Open message from ${msg.from}`} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') handleOpen(msg); }}>
                  <span className="text-lg" role="img" aria-label={msg.type === 'feedback' ? 'Feedback' : 'Message'}>{msg.type === 'feedback' ? '📝' : '📢'}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span>{msg.subject}</span>
                      <span className="text-xs text-gray-400">{msg.date}</span>
                    </div>
                    <div className="text-gray-700 text-sm truncate">{msg.message}</div>
                  </div>
                  {!msg.read && <span className="ml-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">New</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Modal for message details */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="inbox-modal-title">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
              <h2 id="inbox-modal-title" className="text-xl font-bold mb-2">{selected.subject}</h2>
              <div className="mb-2 text-gray-600 text-sm">From: {selected.from} | {selected.date}</div>
              <div className="mb-4 text-gray-800 whitespace-pre-line">{selected.message}</div>
              <button onClick={handleClose} className="mt-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800" data-focus-first>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentInboxPage; 