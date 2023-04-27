import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { WeatherByLocation } from './components/Location/WeatherByLocation';
import './App.scss';
import { WeatherByLatLon } from './components/WeatherByLatLon/WeatherByLatLon';
import { Forecast } from './components/Forecast/Forecast';
import MapChart from './components/Map/UKMap';

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<WeatherByLocation />} />
        <Route path="/latlon" element={<WeatherByLatLon />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/map" element={<div style={{ height: "100vh" }}>
          <MapChart />
        </div>} />
      </Routes>
    </main>
  )
}

export default App
