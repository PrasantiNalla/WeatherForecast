import './App.css';
import { WeatherByLocation } from './components/WeatherByLocation';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <h1>WeatherForecast</h1>
      <Routes>
        <Route path="/location" element={<WeatherByLocation />} />
      </Routes>
    </>
  )
}

export default App
