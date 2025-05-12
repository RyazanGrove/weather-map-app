import { useEffect, useState } from 'react';
import ForecastDisplay from './ForecastDisplay';
import Spinner from './Spinner';

export type TemperatureUnit = 'C' | 'F';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type DataHourly = {
  temperature: number;
  weatherCode: number;
  timeStamp: string;
};

async function fetchForecastData(latitude: number, longitude: number): Promise<DataHourly[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&forecast_days=2`;
  const res = await fetch(url);
  const data = await res.json();

  const times = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const codes = data.hourly.weathercode;

  return times.map((time: string, i: number) => ({
    temperature: temps[i],
    weatherCode: codes[i],
    timeStamp: time,
  }));
}

function Popup({ latitude, longitude }: Coordinates) {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('C');
  const [forecasts, setForecasts] = useState<DataHourly[]>([]);
  const [loading, setLoading] = useState(true);

  const currentHour = new Date().getHours();

  useEffect(() => {
    fetchForecastData(latitude, longitude)
      .then(setForecasts)
      .catch(err => console.error('Error fetching forecast:', err))
      .finally(() => setLoading(false));
  }, [latitude, longitude]);

  const toggleTemperatureUnit = () =>
    setTemperatureUnit(prev => (prev === 'C' ? 'F' : 'C'));

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        Loading forecast...
        <Spinner />
      </div>
    );
  }

  const items = [0, 3, 6]
    .map(offset => forecasts[currentHour + offset])
    .filter(Boolean);

  return (
    <>
      <button
        onClick={toggleTemperatureUnit}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition mb-2"
      >
        Show °{temperatureUnit === 'C' ? 'F' : 'C'}
      </button>
      <div className="flex flex-row gap-1">
        {items.map((entry, idx) => (
          <ForecastDisplay
            key={idx}
            temperature={entry.temperature}
            weatherCode={entry.weatherCode}
            time={entry.timeStamp}
            current={idx === 0}
            unit={temperatureUnit}
          />
        ))}
      </div>
    </>
  );
}

export default Popup;
