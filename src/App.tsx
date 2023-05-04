import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Forecast } from './components/Forecast/Forecast';
import MapChart from './components/Map/UKMap';

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Forecast />} />
        {/* <Route path="/map" element={<div style={{ height: "100vh" }}>
          <MapChart />
        </div>} /> */}
      </Routes>
    </main>
  )
}

export default App
