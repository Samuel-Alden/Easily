import { useState, useEffect, useRef } from 'react';
import AppLayout from '../components/AppLayout';

function StudyTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Format seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(25 * 60);
  };

  return (
    <AppLayout>
      <h2>⏱️ Study Timer</h2>
      <div style={{ fontSize: '60px', fontWeight: 'bold', margin: '30px 0' }}>
        {formatTime(secondsLeft)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>▶️ Start</button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>⏸ Pause</button>
        <button onClick={resetTimer}>🔄 Reset</button>
      </div>
    </AppLayout>
  );
}

export default StudyTimer;