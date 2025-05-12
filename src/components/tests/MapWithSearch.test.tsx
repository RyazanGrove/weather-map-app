import { render, screen, fireEvent } from '@testing-library/react';
import MapWithSearch from '../MapWithSearch';
import { vi } from 'vitest';

vi.mock('../Map', () => ({
  default: ({ selectedLocation }: { selectedLocation: { latitude: number; longitude: number } | null }) => (
    <div data-testid="map">
      Mock Map - {selectedLocation ? `Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}` : 'No location'}
    </div>
  )
}));

vi.mock('../Search', () => ({
  default: ({ onSelect }: { onSelect: (latitude: number, longitude: number) => void }) => (
    <div>
      <button data-testid="mock-search-button" onClick={() => onSelect(60.192059, 24.945831)}>
        Mock Search Select
      </button>
    </div>
  )
}));

describe('MapWithSearch', () => {
  it('renders Map and SearchBox components', () => {
    render(<MapWithSearch />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('mock-search-button')).toBeInTheDocument();
  });

  it('updates map when location is selected from search', () => {
    render(<MapWithSearch />);
    fireEvent.click(screen.getByTestId('mock-search-button'));
    expect(screen.getByTestId('map')).toHaveTextContent('Latitude: 60.192059, Longitude: 24.945831');
  });
});
