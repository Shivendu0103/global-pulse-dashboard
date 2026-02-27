import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import NarrativeCards from './components/NarrativeCards';
import DataProjection from './components/DataProjection';
import CO2TrendsChart from './components/CO2TrendsChart';
import YearSlider from './components/YearSlider';

function App() {
  const [selectedYear, setSelectedYear] = useState(2025);

  return (
    <main className="dashboard-container">
      <HeroSection />
      <div className="content-wrapper">
        <NarrativeCards />
        <DataProjection />

        <h1 className="dashboard-heading">Global CO2 Pulse</h1>
        <CO2TrendsChart currentYear={selectedYear} />

        <YearSlider
          min={2000}
          max={2025}
          value={selectedYear}
          onChange={setSelectedYear}
        />
      </div>
    </main>
  )
}

export default App;
