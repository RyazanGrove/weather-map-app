import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Popup from './Popup';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export type Coordinates = { latitude: number; longitude: number };

type MapProps = {
  selectedLocation: Coordinates | null;
};

export default function Map({ selectedLocation }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [24.9384, 60.1699],
      zoom: 5,
    });

    mapRef.current.on('click', (e) => {
      addPopup(e.lngLat.lat, e.lngLat.lng);
    });
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation;
      mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 12 });
      addPopup(latitude, longitude);
    }
  }, [selectedLocation]);

  const addPopup = (latitude: number, longitude: number) => {
    if (!mapRef.current) return;

    popupRef.current?.remove();

    const popupNode = document.createElement('div');
    const popup = new mapboxgl.Popup({ maxWidth: '300px' })
      .setLngLat([longitude, latitude])
      .setDOMContent(popupNode)
      .addTo(mapRef.current);

    ReactDOM.createRoot(popupNode).render(<Popup latitude={latitude} longitude={longitude} />);
    popupRef.current = popup;
  };

  return <div ref={mapContainerRef} role="region" className="w-full h-[500px]" />;
}
