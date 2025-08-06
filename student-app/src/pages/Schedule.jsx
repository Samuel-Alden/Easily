import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Schedule() {
  const [classes, setClasses] = useState(() => {
    const stored = localStorage.getItem('classes');
    return stored ? JSON.parse(stored) : [];
  });
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('Monday');
  const [start, setStart] = useState('08:00');
  const [end, setEnd] = useState('09:00');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  const addClass = () => {
    if (!subject.trim()) return;
    // Simple validation: end after start
    if (end <= start) {
      alert('End time must be after start time.');
      return;
    }
    const newClass = {
      id: Date.now(),
      subject: subject.trim(),
      day,
      start,
      end,
    };
    setClasses(prev => [...prev, newClass]);
    setSubject('');
    setStart('08:00');
    setEnd('09:00');
    setDay('Monday');
  };

  const deleteClass = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  // Group and sort classes by day then start time
  const grouped = DAYS.map(d => {
    const items = classes
      .filter(c => c.day === d)
      .sort((a, b) => a.start.localeCompare(b.start));
    return { day: d, items };
  });

  return (
    <AppLayout>
      <h2>📆 Class Schedule</h2>

      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h3>Add Class</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 150px' }}>
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Math"
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ flex: '1 1 120px' }}>
            <label>Day</label>
            <select value={day} onChange={e => setDay(e.target.value)} style={{ width: '100%', padding: '6px' }}>
              {DAYS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: '1 1 100px' }}>
            <label>Start</label>
            <input type="time" value={start} onChange={e => setStart(e.target.value)} style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: '1 1 100px' }}>
            <label>End</label>
            <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <button onClick={addClass} style={{ marginTop: '22px' }}>+ Add</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        {grouped.map(group => (
          <div key={group.day} style={{ marginBottom: '25px' }}>
            <h4>{group.day}</h4>
            {group.items.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#666' }}>No classes added.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, gap: '8px' }}>
                {group.items.map(c => (
                  <li
                    key={c.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      marginBottom: '6px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600' }}>{c.subject}</div>
                      <div style={{ fontSize: '12px', color: '#555' }}>
                        {c.start} - {c.end}
                      </div>
                    </div>
                    <button onClick={() => deleteClass(c.id)}>🗑️</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

export default Schedule;