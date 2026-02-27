import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EMISSION_FACTORS, GLOBAL_TARGET } from '../utils/constants';

export default function CarbonFootprintCalculator({ isOpen, onClose, data, setData }) {

    // Memoize the reduction calculations to prevent unneeded re-renders
    const impacts = useMemo(() => {
        const commuteImpact = (data.commute || 0) * 52 * EMISSION_FACTORS.COMMUTE;
        const energyImpact = (data.energy || 0) * 12 * EMISSION_FACTORS.GRID;
        const dietImpact = (data.diet || 0) * 365 * EMISSION_FACTORS.DIET;
        const total = commuteImpact + energyImpact + dietImpact;

        return {
            commute: commuteImpact,
            energy: energyImpact,
            diet: dietImpact,
            total: total
        };
    }, [data]);

    const handleChange = (key, value) => {
        setData(prev => ({ ...prev, [key]: Number(value) }));
    };

    const isBelowTarget = impacts.total <= GLOBAL_TARGET;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="calculator-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="calculator-panel glass-panel"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="panel-header">
                            <h2>Goal-Seeker Calculator</h2>
                            <button onClick={onClose} className="close-btn">✕</button>
                        </div>

                        <div className="panel-content">
                            <p className="panel-desc">
                                Adjust your habits below to see what it takes to reach the global target of {GLOBAL_TARGET.toLocaleString()} kg CO2/year.
                            </p>

                            <div className="input-group">
                                <label>Weekly Commute (km): {data.commute}</label>
                                <input
                                    type="range"
                                    min="0" max="1000"
                                    value={data.commute}
                                    onChange={(e) => handleChange('commute', e.target.value)}
                                    className="slider-input custom-range"
                                />
                                <span className="impact-detail">Est. Impact: {Math.round(impacts.commute).toLocaleString()} kg/yr</span>
                            </div>

                            <div className="input-group">
                                <label>Monthly Energy Usage (kWh): {data.energy}</label>
                                <input
                                    type="range"
                                    min="0" max="2000"
                                    value={data.energy}
                                    onChange={(e) => handleChange('energy', e.target.value)}
                                    className="slider-input custom-range"
                                />
                                <span className="impact-detail">Est. Impact: {Math.round(impacts.energy).toLocaleString()} kg/yr</span>
                            </div>

                            <div className="input-group">
                                <label>Daily Meat Meals: {data.diet}</label>
                                <input
                                    type="range"
                                    min="0" max="4" step="0.5"
                                    value={data.diet}
                                    onChange={(e) => handleChange('diet', e.target.value)}
                                    className="slider-input custom-range"
                                />
                                <span className="impact-detail">Est. Impact: {Math.round(impacts.diet).toLocaleString()} kg/yr</span>
                            </div>

                            <div className={`result-box ${isBelowTarget ? 'success' : 'warning'}`}>
                                <h3>Your Footprint</h3>
                                <div className="total-value">
                                    {Math.round(impacts.total).toLocaleString()} <span>kg CO2/yr</span>
                                </div>
                                <div className="target-progress">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span>Current Status</span>
                                        <span>Target: {GLOBAL_TARGET.toLocaleString()} kg</span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${Math.min(100, (impacts.total / Math.max(GLOBAL_TARGET * 2, impacts.total)) * 100)}%`, // Scale visually relative to max
                                                backgroundColor: isBelowTarget ? 'var(--color-brand)' : 'var(--color-accent)'
                                            }}
                                        ></div>
                                    </div>
                                    {isBelowTarget ? (
                                        <p className="status-msg">You are meeting the global target! 🎉</p>
                                    ) : (
                                        <p className="status-msg over-msg">You are {(impacts.total - GLOBAL_TARGET).toLocaleString()} kg over target. Try reducing commute or meat intake!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
