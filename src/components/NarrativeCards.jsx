import { motion } from 'framer-motion';

export default function NarrativeCards() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="narrative-section relative">
            <div className="abstract-bg abstract-primary" />
            <div className="abstract-bg abstract-coral" />

            <div className="narrative-header">
                <div className="live-pill">
                    <span className="live-dot pulse-ring text-brand mr-2" style={{ width: 6, height: 6 }}></span>
                    <span className="live-text">Live Data</span>
                </div>
                <h2>Our Commitment to a <span className="text-gradient">Green Future</span></h2>
                <p>Tracking our progress towards net-zero emissions through real-time global initiatives and sustainable practices.</p>
            </div>

            <motion.div
                className="cards-layout"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Featured Card: Emissions */}
                <motion.div className="glass-panel group" variants={itemVariants}>
                    <div className="bg-icon-coral">
                        <span className="material-symbols-outlined" style={{ fontSize: '120px', fontWeight: 200, color: 'var(--color-accent)' }}>wind_power</span>
                    </div>
                    <div className="card-content-featured relative z-10 flex flex-col gap-4">
                        <div className="flex-between">
                            <div className="stack">
                                <span className="label-sm">Target Goal</span>
                                <h3 className="card-title text-xl">Emissions Reduction</h3>
                            </div>
                            <div className="icon-box-coral">
                                <span className="material-symbols-outlined">trending_down</span>
                            </div>
                        </div>
                        <div className="featured-metric mt-2">
                            <div className="metric-huge text-glow-coral">50%</div>
                            <p className="metric-desc">Reduction by 2030</p>
                        </div>
                        <div className="progress-section mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <div className="flex-between mb-2">
                                <span className="text-xs text-muted">Current Progress</span>
                                <span className="text-xs font-bold text-coral">32%</span>
                            </div>
                            <div className="progress-track" style={{ height: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div className="progress-fill coral-bg" style={{ width: '32%', height: '100%', background: 'var(--color-accent)', position: 'relative' }}>
                                    <div className="progress-glow" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', background: 'rgba(255,255,255,0.5)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Secondary Card: Carbon Sequestration */}
                <motion.div className="glass-panel card-sequestration" variants={itemVariants} style={{ background: 'linear-gradient(to bottom right, rgba(34, 73, 73, 0.4), transparent)' }}>
                    <div className="glow-primary-topleft" style={{ position: 'absolute', top: '-40px', left: '-40px', width: '160px', height: '160px', background: 'rgba(13, 242, 242, 0.2)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }}></div>
                    <div className="flex-between mb-6 z-10 relative">
                        <div className="flex-align gap-3">
                            <div className="icon-box-primary text-primary">
                                <span className="material-symbols-outlined">forest</span>
                            </div>
                            <div>
                                <h3 className="card-title text-sm font-semibold m-0">Carbon Sequestration</h3>
                                <p className="text-xs text-muted m-0">Year to Date</p>
                            </div>
                        </div>
                        <span className="badge-primary font-bold">+8.4%</span>
                    </div>
                    <div className="flex-baseline gap-2 z-10 relative">
                        <span className="metric-large">12.5</span>
                        <span className="text-lg text-muted font-medium">Mt</span>
                    </div>
                    <p className="text-xs text-muted mt-2 z-10 relative">Equivalent to planting 200M trees</p>
                </motion.div>

                {/* Grid of smaller metrics */}
                <motion.div className="metrics-grid" variants={itemVariants}>
                    <div className="glass-panel metric-box hover-light p-4">
                        <div className="flex-between text-muted">
                            <span className="material-symbols-outlined text-2xl">water_drop</span>
                            <span className="material-symbols-outlined text-lg opacity-50">arrow_outward</span>
                        </div>
                        <div className="mt-4">
                            <div className="metric-md">4.2B</div>
                            <div className="text-xs text-muted">Gallons Saved</div>
                        </div>
                    </div>
                    <div className="glass-panel metric-box hover-light p-4">
                        <div className="flex-between text-muted">
                            <span className="material-symbols-outlined text-2xl">recycling</span>
                            <span className="material-symbols-outlined text-lg opacity-50">arrow_outward</span>
                        </div>
                        <div className="mt-4">
                            <div className="metric-md">98%</div>
                            <div className="text-xs text-muted">Waste Diverted</div>
                        </div>
                    </div>
                </motion.div>

                {/* Map Teaser */}
                <motion.div
                    className="glass-panel map-teaser"
                    variants={itemVariants}
                    style={{
                        height: '160px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'flex-end',
                        backgroundImage: `linear-gradient(45deg, rgba(16, 34, 34, 0.8) 0%, rgba(42, 89, 89, 0.4) 100%)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: 'none'
                    }}
                >
                    <div className="map-teaser-content w-full">
                        <h3 className="font-bold text-lg text-white m-0">Global Impact Map</h3>
                        <div className="flex-between mt-1 w-full">
                            <p className="text-xs text-slate-300 m-0">View active projects worldwide</p>
                            <button className="btn-circle-primary">
                                <span className="material-symbols-outlined text-sm" style={{ color: '#102222' }}>arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
