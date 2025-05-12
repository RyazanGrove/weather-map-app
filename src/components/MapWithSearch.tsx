import { useState } from 'react';
import Map, { type Coordinates } from './Map';
import SearchBox from './Search';

export default function MapWithSearch() {
  const [location, setLocation] = useState<Coordinates | null>(null);

  return (
    <div>
      <div className="p-4">
        <SearchBox onSelect={(latitude, longitude) => setLocation({ latitude, longitude })} />
      </div>
      <Map selectedLocation={location} />
    </div>
  );
}
