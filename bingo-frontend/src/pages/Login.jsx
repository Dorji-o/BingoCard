import { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        // Register user in MySQL
        await API.post('/auth/register', form);
        alert('Registration successful! You can now login.');
        setIsRegister(false);
        setForm({ username: '', email: '', password: '' });
      } else {
        // Login user from MySQL
        const res = await API.post('/auth/login', {
          email: form.email,
          password: form.password,
        });

        // Save JWT tokens
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        // Save username/email locally for private Bingo cards
        localStorage.setItem('username', form.email); 
        // Optional: If backend returns username, use that instead:
        // localStorage.setItem('username', res.data.username);

        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login/Register error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Server error. Please try again.');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${
          isRegister ? '/images/register.png' : '/images/login.png'
        })`,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem 3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333', fontFamily: 'Arial, sans-serif' }}>
          {isRegister ? 'Create Account' : 'Login'}
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {isRegister && (
            <input
              name="username"
              placeholder="Username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s',
              }}
            />
          )}
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.2s',
            }}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.2s',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: '#fac3e5ff',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#f1a8c4ff')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#fa699cff')}
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        <p
          style={{
            marginTop: '1.5rem',
            cursor: 'pointer',
            color: '#fcd2e7ff',
            fontWeight: '500',
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}
