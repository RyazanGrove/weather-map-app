import { useState, useEffect } from 'react';

export type GeocodingFeature = {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
};

type GeocodingResponse = {
  features: GeocodingFeature[];
};

type Props = {
  onSelect: (latitude: number, longitude: number) => void;
};

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function Search({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingFeature[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length < 3) return;

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((data: GeocodingResponse) => {
          setResults(data.features || []);
        })
        .catch((err) => {
          console.error('Geocoding error:', err);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="mb-4 relative">
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Search for a location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full shadow mt-1 max-h-60 overflow-auto">
          {results.map((place) => (
            <li
              key={place.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                const [longitude, latitude] = place.center;
                onSelect(latitude, longitude);
                setResults([]);
                setQuery('');
              }}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;