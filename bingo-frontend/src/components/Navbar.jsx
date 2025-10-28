import { useState } from 'react';

export default function Navbar({ onLogout }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.className = dark ? '' : 'dark-theme';
  };

  return (
    <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', background: dark ? '#333' : '#eee', color: dark ? '#fff' : '#000' }}>
      <h1>Bingo Card App</h1>
      <div>
        <button onClick={toggleTheme} style={{ marginRight: '1rem' }}>
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
