import { render, screen } from '@testing-library/react';
import React from 'react';

function App() {
  return <h1>Hello Bingo!</h1>;
}

test('renders hello message', () => {
  render(<App />);
  expect(screen.getByText(/hello bingo/i)).toBeInTheDocument();
});
