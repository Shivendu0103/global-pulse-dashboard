import React, { useState, Suspense, lazy, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import HeroSection from './components/HeroSection';
import NarrativeCards from './components/NarrativeCards';
import DataProjection from './components/DataProjection';
import CO2TrendsChart from './components/CO2TrendsChart';
const GlobalEmissionMap = lazy(() => import('./components/GlobalEmissionMap'));
import YearSlider from './components/YearSlider';
import useIsMobile from './hooks/useIsMobile';
import useLocalStorage from './hooks/useLocalStorage';
import CarbonFootprintCalculator from './components/CarbonFootprintCalculator';
import InsightCard from './components/InsightCard';
import ProfileView from './components/ProfileView';
import RegionalReportsView from './components/RegionalReportsView';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [chartMode, setChartMode] = useState('historical'); // 'historical' | 'projected' | 'both'
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [calculatorData, setCalculatorData] = useLocalStorage('carbonFootprintData', {
    commute: 200,
    energy: 500,
    diet: 2
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show nav only if scrolled down past 100px or when not on home view
      if (window.scrollY > 100 || currentView !== 'home') {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Since mockData lives in CO2TrendsChart, we need a simple mapping here to pass current CO2 to the Insight Engine
  const getSimulatedCo2 = (year) => {
    // Basic approximation matching the MockData structure:
    if (year <= 2025) {
      return 369.5 + ((year - 2000) * 2.22); // Historical linear approximation 
    }
    return 425.0 + ((year - 2025) * 3.1); // Projected linear approximation
  };

  const isMobile = useIsMobile(768);

  const maxYear = chartMode === 'historical' ? 2025 : 2035;
  const minYear = chartMode === 'projected' ? 2025 : 2000;

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
      <main className={`dashboard-container ${isMobile ? 'stack-card-layout' : 'full-scroll-layout'}`} style={{ paddingBottom: '80px' }}>

        {currentView === 'home' && (
          <>
            <HeroSection setCurrentView={setCurrentView} />
            <div className="content-wrapper" id="content-wrapper">
              <NarrativeCards setCurrentView={setCurrentView} currentView={currentView} />
              <div id="data-section">
                <DataProjection isMobile={isMobile} />
              </div>

              <div id="map-section">
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
              </div>

              <InsightCard year={selectedYear} co2Value={getSimulatedCo2(selectedYear).toFixed(1)} />

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                marginBottom: '0.5rem',
                marginTop: '0.5rem'
              }}>
                <h1 className="dashboard-heading" style={{ margin: 0, marginTop: '0.5rem' }}>Global CO2 Pulse</h1>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch',
                  gap: '2rem'
                }}>

                  {/* Top: Calculator CTA */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'stretch' : 'flex-start',
                    gap: '0.5rem',
                    backgroundColor: isMobile ? 'rgba(255,255,255,0.03)' : 'transparent',
                    padding: isMobile ? '0.5rem' : '0',
                    borderRadius: '0.5rem',
                    border: isMobile ? '1px solid var(--border-color)' : 'none'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>See how your daily habits affect global trends.</p>

                    <button
                      onClick={() => setIsCalculatorOpen(true)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-accent)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        width: isMobile ? '100%' : 'auto',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        color: 'var(--color-accent)',
                        transition: 'all 0.2s',
                      }}
                    >
                      Calculate Your Impact
                    </button>
                  </div>

                  {/* Bottom: Chart Mode Controls */}
                  <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-card)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', alignSelf: 'flex-start' }}>
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
                          padding: isMobile ? '0.5rem 0.75rem' : '0.5rem 1rem',
                          borderRadius: '0.375rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: isMobile ? '0.875rem' : '1rem',
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
              </div>

              <CO2TrendsChart currentYear={selectedYear} mode={chartMode} calculatorData={calculatorData} isMobile={isMobile} />

              <YearSlider
                min={minYear}
                max={maxYear}
                value={selectedYear}
                onChange={setSelectedYear}
              />

              <CarbonFootprintCalculator
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                data={calculatorData}
                setData={setCalculatorData}
              />
            </div>
          </>
        )}

        {currentView === 'profile' && <ProfileView />}
        {currentView === 'regional' && <RegionalReportsView />}

        {/* Global Bottom Navigation */}
        <nav className="bottom-nav" style={{
          transform: showNav ? 'translateY(0)' : 'translateY(150%)',
          opacity: showNav ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          visibility: showNav ? 'visible' : 'hidden'
        }}>
          <a className="nav-item group" href="#narrative" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('content-wrapper')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            <div className={`nav-icon ${currentView === 'home' ? 'active' : ''}`}>
              <span className="material-symbols-outlined">auto_stories</span>
              {currentView === 'home' && <div className="nav-dot"></div>}
            </div>
            <span className={`nav-text ${currentView === 'home' ? 'active' : ''}`}>Narrative</span>
          </a>
          <a className="nav-item group" href="#data" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('data-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            <div className="nav-icon"><span className="material-symbols-outlined">bar_chart</span></div>
            <span className="nav-text">Data</span>
          </a>
          <a className="nav-item group" href="#map" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            <div className="nav-icon"><span className="material-symbols-outlined">public</span></div>
            <span className="nav-text">Map</span>
          </a>
          <a className="nav-item group" href="#profile" onClick={(e) => { e.preventDefault(); setCurrentView('profile'); }}>
            <div className={`nav-icon ${currentView === 'profile' ? 'active' : ''}`}>
              <span className="material-symbols-outlined">person</span>
              {currentView === 'profile' && <div className="nav-dot"></div>}
            </div>
            <span className={`nav-text ${currentView === 'profile' ? 'active' : ''}`}>Profile</span>
          </a>
        </nav>

      </main>
    </MotionConfig>
  )
}

export default App;
