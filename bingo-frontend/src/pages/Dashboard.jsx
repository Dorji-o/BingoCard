import { useEffect, useState } from 'react';
import API from '../../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/protected'); // replace with actual protected route
        setMessage(res.data.message);
      } catch (err) {
        navigate('/login');
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  // --- GoalCard Component ---
  function GoalCard() {
    const [goal, setGoal] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
      if (goal.trim()) setIsEditing(false);
    };

    return (
      <div
        style={{
          backgroundColor: '#FFC0CB', // baby pink
          borderRadius: '12px',
          padding: '1rem',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter goal..."
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ffb6c1',
                marginBottom: '0.5rem',
                width: '100%',
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              style={{
                padding: '0.4rem 0.8rem',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#ff69b4', // deeper pink
                color: 'white',
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </div>
        ) : (
          <span>{goal || 'Click to add goal'}</span>
        )}
      </div>
    );
  }

  // --- Render ---
  return (
    <div style={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}> {/* soft baby pink background */}
      <Navbar onLogout={handleLogout} />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: '#FF69B4' }}>Dashboard</h2>
        <p>{message || 'Welcome to your Bingo Card Dashboard!'}</p>

        {/* 6x6 Bingo Card Grid */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#FF1493' }}>Your Bingo Cards</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '1rem',
            }}
          >
            {Array.from({ length: 36 }).map((_, index) => (
              <GoalCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
