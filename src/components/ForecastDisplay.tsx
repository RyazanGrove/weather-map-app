import type { TemperatureUnit } from "../App";

type WeatherDayForecast = {
    temperature: number;
    weatherCode: number;
    time: string;
    unit: TemperatureUnit;
    current?: boolean;
}

const weatherIconMap: { codes: number[]; icon: string }[] = [
    { codes: [0], icon: '☀️' },                   // Clear
    { codes: [1], icon: '🌤️' },                   // Mainly clear
    { codes: [2], icon: '⛅' },                   // Partly cloudy
    { codes: [3], icon: '☁️' },                   // Cloudy
    { codes: [45, 48], icon: '🌫️' },              // Fog
    { codes: [51, 53, 55, 56, 57], icon: '🌦️' },  // Drizzle
    { codes: [61, 63, 65, 66, 67], icon: '🌧️' },  // Rain
    { codes: [71, 73, 75, 77], icon: '❄️' },      // Snow
    { codes: [80, 81, 82, 85, 86], icon: '🌦️' },  // Showers
    { codes: [95, 96, 99], icon: '⛈️' },          // Thunderstorm
  ];

const getIconForCode = (code: number): string => {
  for (const group of weatherIconMap) {
    if (group.codes.includes(code)) return group.icon;
  }
  return '❓'; // Unknown code
};

function ForecastDisplay({temperature, weatherCode, time, unit, current }: WeatherDayForecast) {

    const date = new Date(time);
    const hour = date.getHours();
    const icon = getIconForCode(weatherCode);

    const convert = (celsius: number): number =>
        unit === 'C' ? celsius : + (celsius * 9 / 5 + 32).toFixed(1);

    return (
        <div className="bg-blue-100 rounded-lg p-3 flex flex-col items-center">
            <div className="text-3xl">{icon}</div>
            <div className="text-lg font-semibold">{convert(temperature)}°{unit}</div>
            <div className="text-sm font-bold">{current ? 'Now' : hour + ':00'}</div>
        </div>
    )
}

export default ForecastDisplay;