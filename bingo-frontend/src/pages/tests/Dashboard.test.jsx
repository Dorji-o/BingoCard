import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

test('renders 5x5 bingo grid', () => {
  render(<Dashboard />);
  const cells = screen.getAllByText(/click to add goal/i);
  expect(cells.length).toBe(25);
});
