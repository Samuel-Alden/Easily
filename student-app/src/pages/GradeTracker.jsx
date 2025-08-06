import AppLayout from '../components/AppLayout';
import { useState, useEffect } from 'react';

function GradeTracker() {
  const [grades, setGrades] = useState(() => {
    const stored = localStorage.getItem('grades');
    return stored ? JSON.parse(stored) : [];
  });

  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [grades]);

  const addGrade = () => {
    const numericScore = parseFloat(score);
    if (!subject.trim() || isNaN(numericScore)) return;
    const newGrade = {
      id: Date.now(),
      subject: subject.trim(),
      score: numericScore,
    };
    setGrades(prev => [...prev, newGrade]);
    setSubject('');
    setScore('');
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const average = grades.length
    ? (grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(2)
    : 'N/A';

  return (
    <AppLayout>
      <h2>📊 Grade Tracker</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={{ flex: 2, padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Grade"
          value={score}
          onChange={e => setScore(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addGrade}>➕ Add</button>
      </div>

      {grades.length === 0 ? (
        <p style={{ fontStyle: 'italic' }}>No grades yet.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {grades.map(g => (
              <li
                key={g.id}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span><strong>{g.subject}</strong>: {g.score}</span>
                <button onClick={() => deleteGrade(g.id)}>🗑️</button>
              </li>
            ))}
          </ul>

          <p><strong>Average:</strong> {average}</p>
        </>
      )}
    </AppLayout>
  );
}

export default GradeTracker;