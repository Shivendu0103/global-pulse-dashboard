import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p 
          className="hero-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          EcoData
        </motion.p>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Our Planet, Our Data
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Discover the hidden stories behind global environmental changes through immersive visualization.
        </motion.p>
        <motion.button 
          className="hero-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Explore Dashboard
        </motion.button>
      </motion.div>
      <div className="hero-glow"></div>
    </section>
  );
}
