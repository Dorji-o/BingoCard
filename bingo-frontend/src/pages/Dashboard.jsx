import { useEffect, useState } from 'react';
import API from '../../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [cardName, setCardName] = useState('');
  const [cards, setCards] = useState(Array(25).fill(''));
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/protected');
        setMessage(res.data.message);
      } catch (err) {
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleChange = (index, value) => {
    const newCards = [...cards];
    newCards[index] = value;
    setCards(newCards);
  };

  const handleSaveCard = () => {
  if (!cardName.trim()) {
    alert('Please give your Bingo Card a name!');
    return;
  }
  if (cards.some((c) => !c.trim())) {
    alert('Please fill in all 25 goals before saving!');
    return;
  }

  const username = localStorage.getItem('username'); // make sure you store this on login
  const savedCardsKey = `bingoCards_${username}`;

  const savedCards = JSON.parse(localStorage.getItem(savedCardsKey)) || [];
  savedCards.push({ name: cardName.trim(), goals: cards });
  localStorage.setItem(savedCardsKey, JSON.stringify(savedCards));

  alert(`✅ "${cardName}" saved successfully!`);
  setCards(Array(25).fill(''));
  setCardName('');
};


  return (
    <div style={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}>
      <Navbar onLogout={handleLogout} />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: '#FF69B4' }}>Dashboard</h2>
        <p>{message || 'Welcome to your Bingo Card Dashboard!'}</p>

        {/* View Saved Cards */}
        <button
          onClick={() => navigate('/savedcards')}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#FF69B4',
            color: 'white',
            cursor: 'pointer',
            marginBottom: '1.5rem',
          }}
        >
          View Saved Cards
        </button>

        {/* Card Name */}
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Enter Bingo Card Name"
          style={{
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1px solid #ffb6c1',
            width: '100%',
            maxWidth: '400px',
          }}
        />

        {/* Bingo Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
          }}
        >
          {cards.map((goal, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFC0CB',
                borderRadius: '12px',
                padding: '1rem',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
              onClick={() => setEditingIndex(index)}
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={goal}
                  autoFocus
                  onChange={(e) => handleChange(index, e.target.value)}
                  onBlur={() => setEditingIndex(null)}
                  placeholder="Enter goal..."
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid #ffb6c1',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '1rem',
                  }}
                />
              ) : (
                <span>{goal || 'Click to add goal'}</span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveCard}
          style={{
            marginTop: '2rem',
            padding: '0.7rem 1.5rem',
            backgroundColor: '#FF1493',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Save Bingo Card
        </button>
      </div>
    </div>
  );
}
