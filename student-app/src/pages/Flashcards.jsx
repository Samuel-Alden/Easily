import AppLayout from '../components/AppLayout';
import { useState, useEffect } from 'react';

function Flashcards() {
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem('flashcards');
    return stored ? JSON.parse(stored) : [];
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!front.trim() || !back.trim()) return;
    const newCard = { id: Date.now(), front: front.trim(), back: back.trim() };
    setCards(prev => [...prev, newCard]);
    setFront('');
    setBack('');
    setCurrentIndex(cards.length); // Show new card
    setShowBack(false);
  };

  const deleteCard = (id) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    setCurrentIndex(0);
    setShowBack(false);
  };

  const currentCard = cards[currentIndex] || null;

  return (
    <AppLayout>
      <h2>🧠 Flashcards</h2>

      {currentCard ? (
        <div>
          <div
            onClick={() => setShowBack(prev => !prev)}
            style={{
              margin: '30px auto',
              padding: '40px 20px',
              border: '2px solid #888',
              borderRadius: '12px',
              cursor: 'pointer',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              backgroundColor: showBack ? '#f0f8ff' : '#fff0f5',
              color: '#000',
            }}
          >
            {showBack ? currentCard.back : currentCard.front}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <button onClick={() => setCurrentIndex((currentIndex - 1 + cards.length) % cards.length)}>⬅️ Prev</button>
            <button onClick={() => setShowBack(prev => !prev)}>🔄 Flip</button>
            <button onClick={() => setCurrentIndex((currentIndex + 1) % cards.length)}>Next ➡️</button>
          </div>

          <button onClick={() => deleteCard(currentCard.id)}>🗑️ Delete</button>
        </div>
      ) : (
        <p>No flashcards yet. Add some below!</p>
      )}

      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <h3>Add Flashcard</h3>
        <input
          type="text"
          placeholder="Front (question)"
          value={front}
          onChange={e => setFront(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Back (answer)"
          value={back}
          onChange={e => setBack(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button onClick={addCard}>➕ Add Flashcard</button>
      </div>
    </AppLayout>
  );
}

export default Flashcards;