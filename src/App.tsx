import Header from './components/Header';
import MapWithSearch from './components/MapWithSearch';

export type TemperatureUnit = 'C' | 'F';

function App() {

  return (
    <>
      <Header />
      <MapWithSearch />
    </>
  )
}

export default App
