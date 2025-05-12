import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the title', () => {
    render(<Header />);
    expect(screen.getByText(/weather forecast app/i)).toBeInTheDocument();
  });

  it('renders the instructions', () => {
    render(<Header />);
    expect(
      screen.getByText(/click on the map or use the search bar/i)
    ).toBeInTheDocument();
  });
});
