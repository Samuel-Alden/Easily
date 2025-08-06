import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

function Home() {
  return (
    <AppLayout>
      <h2>🎓 Welcome to StudentHelper</h2>
      <p style={{ marginBottom: '20px' }}>
        Your all-in-one productivity app for school.
      </p>

      <div className="home-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
      }}>
        <Link to="/tasks"><button>📋 Tasks</button></Link>
        <Link to="/schedule"><button>📅 Schedule</button></Link>
        <Link to="/timer"><button>⏱️ Study Timer</button></Link>
        <Link to="/grades"><button>📊 Grades</button></Link>
        <Link to="/flashcards"><button>🧠 Flashcards</button></Link>
        <Link to="/notes"><button>📝 Notes</button></Link>
        <Link to="/chatroom"><button>💬 Chatroom</button></Link>
        <Link to="/ai"><button>🤖 AI Assistant</button></Link>
      </div>
    </AppLayout>
  );
}

export default Home;