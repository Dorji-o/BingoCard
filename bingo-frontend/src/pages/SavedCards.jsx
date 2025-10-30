import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Confetti from 'react-confetti';

export default function SavedCards() {
  const [savedCards, setSavedCards] = useState([]);
  const [toggledCells, setToggledCells] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  // Get current username from localStorage
  const username = localStorage.getItem('username');
  const savedCardsKey = `bingoCards_${username}`;

  // Fetch cards from localStorage for this user
  const fetchCards = () => {
    const cards = JSON.parse(localStorage.getItem(savedCardsKey)) || [];
    setSavedCards(cards);

    // Initialize toggled state
    const initialToggled = {};
    cards.forEach((_, i) => {
      initialToggled[i] = Array(25).fill(false);
    });
    setToggledCells(initialToggled);
  };

  useEffect(() => {
    if (!username) {
      navigate('/login'); // if somehow no username is stored
    } else {
      fetchCards();
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const deleteCard = (index) => {
    const newCards = [...savedCards];
    newCards.splice(index, 1);
    setSavedCards(newCards);
    localStorage.setItem(savedCardsKey, JSON.stringify(newCards));

    const newToggled = { ...toggledCells };
    delete newToggled[index];
    setToggledCells(newToggled);
  };

  const toggleCell = (cardIndex, cellIndex) => {
    const newToggled = { ...toggledCells };
    newToggled[cardIndex][cellIndex] = !newToggled[cardIndex][cellIndex];
    setToggledCells(newToggled);

    if (newToggled[cardIndex].every((t) => t)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF0F5', minHeight: '100vh' }}>
      {showConfetti && <Confetti />}
      <Navbar onLogout={handleLogout} />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: '#FF69B4' }}>Saved Bingo Cards</h2>

        {savedCards.length === 0 ? (
          <p>No saved cards yet.</p>
        ) : (
          savedCards.map((card, i) => (
            <div
              key={i}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: '#FFE4E1',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: '#FF1493' }}>{card.name}</h4>
                <button
                  onClick={() => deleteCard(i)}
                  style={{
                    backgroundColor: '#FF1493',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {card.goals.map((goal, j) => (
                  <div
                    key={j}
                    onClick={() => toggleCell(i, j)}
                    style={{
                      backgroundColor: toggledCells[i]?.[j] ? '#D8BFD8' : '#FFC0CB',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      userSelect: 'none',
                    }}
                  >
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: '2rem',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#FF69B4',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
