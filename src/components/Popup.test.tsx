import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Popup, { type ForecastApiResponse } from './Popup';

const mockForecast: ForecastApiResponse = {
  hourly: {
    time: Array(48).fill(0).map((_, i) => `2024-01-01T${String(i).padStart(2, '0')}:00`),
    temperature_2m: Array(48).fill(10).map((t, i) => t + i),
    weathercode: Array(48).fill(0),
  },
};

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockForecast),
    })
  );
});

describe('Popup component', () => {
  it('renders loading initially', () => {
    render(<Popup latitude={0} longitude={0} />);
    expect(screen.getByText(/loading forecast/i)).toBeInTheDocument();
  });

  it('renders forecast after fetch', async () => {
    render(<Popup latitude={0} longitude={0} />);
    await waitFor(() => {
      expect(screen.getByText(/show °f/i)).toBeInTheDocument();
    });
    expect(screen.getAllByText(/°c/i).length).toBe(3);
  });

  it('toggles temperature unit when button is clicked', async () => {
    render(<Popup latitude={0} longitude={0} />);
  
    const toggleButton = await screen.findByRole('button', { name: /show °f/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
  
    expect(toggleButton).toHaveTextContent(/show °c/i);
  });
});