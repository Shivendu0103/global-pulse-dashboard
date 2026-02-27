import HeroSection from './components/HeroSection';
import NarrativeCards from './components/NarrativeCards';
import DataProjection from './components/DataProjection';
import CO2TrendsChart from './components/CO2TrendsChart';

function App() {
  return (
    <main className="dashboard-container">
      <HeroSection />
      <div className="content-wrapper">
        <NarrativeCards />
        <DataProjection />
        <CO2TrendsChart />
      </div>
    </main>
  )
}

export default App
