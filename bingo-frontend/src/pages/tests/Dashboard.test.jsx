import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { MemoryRouter } from 'react-router-dom';

test('renders 5x5 bingo grid', () => {
  render(<Dashboard />, { wrapper: MemoryRouter });
  const cells = screen.getAllByText(/click to add goal/i);
  expect(cells.length).toBe(25);
});
