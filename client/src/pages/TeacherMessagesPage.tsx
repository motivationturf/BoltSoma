import React, { useState, useMemo } from 'react';
import { GradeSelector } from '../components/teacher/GradeSelector';
import { SubjectSelector } from '../components/teacher/SubjectSelector';
import { UserContext } from '../context/UserContext';

interface Message {
  id: string;
  title: string;
  body: string;
  grade: string | number;
  subject?: string;
  date: string;
  recipients: string;
  status: 'Sent' | 'Pending';
}

const SUBJECTS = [
  { id: 'Mathematics', name: 'Mathematics' },
  { id: 'Science', name: 'Science' },
];

const TeacherMessagesPage: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Role-based access check
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center">Please login.</div>
      </div>
    );
  }

  // Outbox table data
  const outbox = useMemo(() => messages.slice().reverse(), [messages]);

  const handleSend = () => {
    if (!title.trim() || !body.trim() || !selectedGrade) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      title: title.trim(),
      body: body.trim(),
      grade: selectedGrade,
      subject: selectedSubject || undefined,
      date: new Date().toLocaleString(),
      recipients: selectedSubject ? `${selectedGrade} - ${selectedSubject}` : `${selectedGrade}`,
      status: 'Sent',
    };
    setMessages(prev => [...prev, newMsg]);
    setToast('Message sent!');
    setTitle('');
    setBody('');
    setSelectedGrade(null);
    setSelectedSubject(null);
    setTimeout(() => setToast(null), 2000);
  };
  const handleReset = () => {
    setTitle('');
    setBody('');
    setSelectedGrade(null);
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">📢 Class-Wide Messaging</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="font-semibold mb-4">Message Composer</div>
          <div className="mb-4">
            <label htmlFor="msg-title" className="block text-sm font-medium mb-1">Title</label>
            <input
              id="msg-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter message title..."
              aria-label="Message Title"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <span className="block text-sm font-medium mb-1">Target Grade</span>
              <GradeSelector selectedGrade={selectedGrade} onChange={setSelectedGrade} />
            </div>
            <div className="flex-1">
              <span className="block text-sm font-medium mb-1">Target Subject (optional)</span>
              <SubjectSelector subjects={SUBJECTS} selectedSubjectId={selectedSubject} onChange={setSelectedSubject} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="msg-body" className="block text-sm font-medium mb-1">Message Body</label>
            <textarea
              id="msg-body"
              value={body}
              onChange={e => setBody(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Type your announcement or message here..."
              aria-label="Message Body"
            />
          </div>
          <div className="mb-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm mr-2"
              disabled
              title="Attach challenge or lesson (coming soon)"
            >
              Attach Challenge/Lesson (coming soon)
            </button>
          </div>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={handleReset}>Reset</button>
            <button
              className="px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-800 transition"
              onClick={handleSend}
              disabled={!title.trim() || !body.trim() || !selectedGrade}
            >
              Send Message
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="font-semibold mb-4">Outbox</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm" aria-label="Outbox Table">
              <thead className="bg-green-100 text-green-900">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Recipients</th>
                  <th className="px-4 py-2 text-left">Preview</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {outbox.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-gray-500 py-6">No messages sent yet.</td></tr>
                ) : (
                  outbox.map(msg => (
                    <tr key={msg.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 font-semibold">{msg.title}</td>
                      <td className="px-4 py-2">{msg.date}</td>
                      <td className="px-4 py-2">{msg.recipients}</td>
                      <td className="px-4 py-2 text-gray-700">{msg.body.slice(0, 40)}{msg.body.length > 40 ? '...' : ''}</td>
                      <td className="px-4 py-2">{msg.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span role="img" aria-label="Success">✅</span>
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMessagesPage; 