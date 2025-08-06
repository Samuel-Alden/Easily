import AppLayout from '../components/AppLayout';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';

function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('chat_username') || '';
  });

  useEffect(() => {
    const chatRef = ref(db, 'messages/');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const parsed = data ? Object.values(data) : [];
      setMessages(parsed);
    });
  }, []);

  const sendMessage = () => {
    if (text.trim() === '' || username.trim() === '') return;
    const message = {
      id: Date.now(),
      text,
      username,
      timestamp: new Date().toISOString()
    };
    push(ref(db, 'messages/'), message);
    setText('');
  };

  return (
    <AppLayout>
      <h2>💬 Anonymous Chatroom</h2>

      {!username && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Choose a nickname..."
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => localStorage.setItem('chat_username', e.target.value)}
            style={{ padding: '10px', width: '100%' }}
          />
        </div>
      )}

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '15px',
        background: '#f5f5f5',
        color: '#000',
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{msg.username || 'Anonymous'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={sendMessage}>📨 Send</button>
      </div>
    </AppLayout>
  );
}

export default Chatroom;