import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

function Login() {
  return (
    <form>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <button>Login</button>
    </form>
  );
}

test('renders login inputs', () => {
  render(<Login />, { wrapper: MemoryRouter });
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
