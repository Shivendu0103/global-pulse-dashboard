import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection({ setCurrentView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(16, 34, 34, 0.4) 0%, rgba(16, 34, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4m9G2pD1iXFfrbQvUDGsMZPgNFtopmcQ8esYjQUkXK5_kHRWWJ2wnodFEu9s5Dxm5TUgd_FrHvTj_QxtrI68deHyn1DFcj4ZfOaXmhv_DIpLp3y3cLhMpmvjfbRZZ-Veg_AS866wzXI-eDDf3FDGr-Hqvk02PPbF3rm_bhvqcy8hsBIPnDBxCs2nrfydUQkaU70qVCec7aLz4FJztEvfmKBbBOY8V2wLBFsWV2D2eeKFm0OGWW9z-suMNP-usCOHOO9LeU6arqzGM")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <header className="hero-header z-50">
        <button className="icon-btn" onClick={() => setIsMenuOpen(true)}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="hero-logo">EcoData</h2>
        <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 40 }}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-panel"
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', zIndex: 50, borderRadius: '0 1rem 1rem 0', padding: '2rem', display: 'flex', flexDirection: 'column' }}
            >
              <div className="flex-between mb-8">
                <h2 className="hero-logo m-0">Menu</h2>
                <button className="icon-btn" onClick={() => setIsMenuOpen(false)}><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="stack gap-4 text-lg font-medium text-white">
                <div className="flex-align gap-3 cursor-pointer hover-light p-2 rounded" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }}>
                  <span className="material-symbols-outlined text-brand">home</span> Dashboard
                </div>
                <div className="flex-align gap-3 cursor-pointer hover-light p-2 rounded" onClick={() => { setIsMenuOpen(false); setCurrentView('regional'); }}>
                  <span className="material-symbols-outlined text-accent">map</span> Regional Reports
                </div>
                <div className="flex-align gap-3 cursor-pointer hover-light p-2 rounded" onClick={() => { setIsMenuOpen(false); setCurrentView('profile'); }}>
                  <span className="material-symbols-outlined text-primary">person</span> My Profile
                </div>
                <div className="flex-align gap-3 cursor-pointer hover-light p-2 rounded mt-auto flex text-muted" onClick={() => setIsMenuOpen(false)}>
                  <span className="material-symbols-outlined">logout</span> Sign Out
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex-col-center"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(12, 26, 26, 0.9)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <div className="glass-panel w-full" style={{ maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="material-symbols-outlined text-brand text-2xl">search</span>
              <input
                autoFocus
                type="text"
                placeholder="Search metrics, regions, or data..."
                style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.25rem', width: '100%', outline: 'none' }}
              />
              <button className="icon-btn" onClick={() => setIsSearchOpen(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <p className="text-muted mt-4">Try searching for "Emissions 2025" or "Europe Data"</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div className="hero-badge-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <span className="hero-badge-live">
            <span className="live-dot pulse-ring text-brand"></span>
            Live Data
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Our Planet,<br />
          <span className="text-gradient">Our Data</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Discover the hidden stories behind global environmental changes through immersive visualization.
        </motion.p>

        <motion.div className="hero-buttons flex-col-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <button className="hero-button primary-glow" onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('content-wrapper')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
            Explore the Impact
          </button>
          <button className="hero-button secondary-glass" onClick={() => setCurrentView('regional')}>
            View Regional Reports
          </button>
        </motion.div>
      </motion.div>

      <div className="hero-scroll-indicator">
        <span className="scroll-text">Start Journey</span>
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
