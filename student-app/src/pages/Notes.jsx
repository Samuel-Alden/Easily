import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

function Notes() {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem('notes');
    return stored ? JSON.parse(stored) : [];
  });
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Date.now(),
      content: newNote.trim()
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const updateNote = (id, updatedContent) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content: updatedContent } : n));
  };

  return (
    <AppLayout>
      <h2>📝 Notes</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <textarea
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Write your note..."
          style={{ flex: 1, height: '80px', padding: '10px' }}
        />
        <button onClick={addNote}>➕ Add</button>
      </div>

      {notes.length === 0 ? (
        <p style={{ fontStyle: 'italic' }}>No notes yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map(note => (
            <li
              key={note.id}
              style={{
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <textarea
                value={note.content}
                onChange={e => updateNote(note.id, e.target.value)}
                style={{ width: '100%', minHeight: '60px', padding: '6px' }}
              />
              <button onClick={() => deleteNote(note.id)} style={{ marginTop: '5px' }}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  );
}

export default Notes;