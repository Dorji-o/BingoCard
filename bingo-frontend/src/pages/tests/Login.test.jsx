import { render, screen } from '@testing-library/react';
import Login from '../Login';
import { MemoryRouter } from 'react-router-dom';

test('renders login form', () => {
  render(<Login />, { wrapper: MemoryRouter });
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
