import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const HeaderElement = screen.getByText(/Welcome to Test app/i);
  expect(HeaderElement).toBeInTheDocument();
});
