import { Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Schedule from './pages/Schedule';
import StudyTimer from './pages/StudyTimer';
import Flashcards from './pages/Flashcards';
import Notes from './pages/Notes';
import GradeTracker from './pages/GradeTracker';
import Chatroom from './pages/Chatroom';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <>
    <ThemeToggle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/timer" element={<StudyTimer />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/grades" element={<GradeTracker />} />
      <Route path="/chatroom" element={<Chatroom />} />
      <Route path="/ai" element={<AIAssistant />} />
    </Routes>
    </>
  );
}

export default App;