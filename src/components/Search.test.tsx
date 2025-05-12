import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Search, { type GeocodingFeature } from './Search';

const mockFeatures: GeocodingFeature[] = [
  {
    id: '1',
    place_name: 'Helsinki, Finland',
    center: [24.9384, 60.1699],
  },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ features: mockFeatures }),
  })
);

describe('Search', () => {
  it('renders input field', () => {
    render(<Search onSelect={() => {}} />);
    expect(screen.getByPlaceholderText(/search for a location/i)).toBeInTheDocument();
  });

  it('shows suggestions and calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    render(<Search onSelect={onSelect} />);

    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Helsi' } });

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(await screen.findByText(/Helsinki, Finland/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Helsinki, Finland/i));

    expect(onSelect).toHaveBeenCalledWith(60.1699, 24.9384);
  });
});
