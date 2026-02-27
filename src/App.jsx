import React, { useState, Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import HeroSection from './components/HeroSection';
import NarrativeCards from './components/NarrativeCards';
import DataProjection from './components/DataProjection';
import CO2TrendsChart from './components/CO2TrendsChart';
const GlobalEmissionMap = lazy(() => import('./components/GlobalEmissionMap'));
import YearSlider from './components/YearSlider';
import useIsMobile from './hooks/useIsMobile';

function App() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [chartMode, setChartMode] = useState('historical'); // 'historical' | 'projected' | 'both'

  const isMobile = useIsMobile(768);

  const maxYear = chartMode === 'historical' ? 2025 : 2035;
  const minYear = chartMode === 'projected' ? 2025 : 2000;

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
      <main className={`dashboard-container ${isMobile ? 'stack-card-layout' : 'full-scroll-layout'}`}>
        <HeroSection />
        <div className="content-wrapper">
          <NarrativeCards />
          <DataProjection />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', marginTop: '2rem' }}>
            <h1 className="dashboard-heading" style={{ margin: 0 }}>Global CO2 Pulse</h1>

            <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-card)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              {['historical', 'projected', 'both'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setChartMode(m);
                    if (m === 'historical' && selectedYear > 2025) setSelectedYear(2025);
                    if (m === 'projected' && selectedYear <= 2025) setSelectedYear(2035);
                    if (m === 'both' && selectedYear <= 2025) setSelectedYear(2035);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    backgroundColor: chartMode === m ? 'var(--color-brand)' : 'transparent',
                    color: chartMode === m ? '#000' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <Suspense fallback={
            <div style={{
              height: '400px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              color: 'var(--color-brand)',
              fontWeight: 600
            }}>
              Loading 3D Earth...
            </div>
          }>
            <GlobalEmissionMap currentYear={selectedYear} />
          </Suspense>

          <CO2TrendsChart currentYear={selectedYear} mode={chartMode} />

          <YearSlider
            min={minYear}
            max={maxYear}
            value={selectedYear}
            onChange={setSelectedYear}
          />
        </div>
      </main>
    </MotionConfig>
  )
}

export default App;
