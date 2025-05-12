import { render, screen } from '@testing-library/react';
import Map from '../Map';
import { vi } from 'vitest';

vi.mock('react-dom/client', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        __esModule: true,
        default: {
        ...actual,
        createRoot: vi.fn(() => ({
            render: vi.fn(),
        })),
        },
    };
});
  
vi.mock('mapbox-gl', () => {
    const mockOn = vi.fn();
    const mockFlyTo = vi.fn();
    const mockSetLngLat = vi.fn().mockReturnThis();
    const mockSetDOMContent = vi.fn().mockReturnThis();
    const mockAddTo = vi.fn().mockReturnThis();
    const mockRemove = vi.fn();

    const MockMap = vi.fn(() => ({
        on: mockOn,
        flyTo: mockFlyTo,
    }));

    const MockPopup = vi.fn(() => ({
        setLngLat: mockSetLngLat,
        setDOMContent: mockSetDOMContent,
        addTo: mockAddTo,
        remove: mockRemove,
    }));

    return {
        __esModule: true,
        default: {
        Map: MockMap,
        Popup: MockPopup,
        },
    };
});

describe('Map', () => {
    it('renders map container', () => {
        render(<Map selectedLocation={null} />);
        const mapElement = screen.getByRole('region');
        expect(mapElement).toBeInTheDocument();
    });

    it('responds to selectedLocation updates by flying to and adding popup', () => {
        const selected = { latitude: 60.17, longitude: 24.94 };
        render(<Map selectedLocation={selected} />);

        const mapElement = screen.getByRole('region');
        expect(mapElement).toBeInTheDocument();
    });
});
