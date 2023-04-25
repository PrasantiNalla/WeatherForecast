import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { WeatherByLocation } from './components/Location/WeatherByLocation';
import './App.scss';
import { WeatherByLatLon } from './components/WeatherByLatLon/WeatherByLatLon';

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<WeatherByLocation />} />
        <Route path="/latlon" element={<WeatherByLatLon />} />
      </Routes>
    </main>
  )
}

export default App
