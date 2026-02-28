import React from 'react';
import { motion } from 'framer-motion';

export default function RegionalReportsView() {
    const regions = [
        { region: "North America", status: "Critical", trend: "+1.2%", color: "var(--color-accent)", insights: "High energy consumption per capita. Focus shifting to renewable grid investments.", co2: "4.5 Gt", icon: "factory" },
        { region: "Europe", status: "Improving", trend: "-2.5%", color: "var(--color-brand)", insights: "Aggressive policy enactments showing results. Wind and solar capacity outperforming targets.", co2: "2.8 Gt", icon: "wind_power" },
        { region: "Asia-Pacific", status: "Warning", trend: "+3.8%", color: "#fbbf24", insights: "Rapid industrial growth offsetting green initiatives. Heavy reliance on coal in developing zones.", co2: "17.2 Gt", icon: "smog_emission" },
        { region: "South America", status: "Stable", trend: "-0.1%", color: "#cbd5e1", insights: "Amazon deforestation rates slowing. High hydro-power utilization maintaining baseline.", co2: "1.1 Gt", icon: "forest" },
        { region: "Africa", status: "Rising", trend: "+1.9%", color: "#f97316", insights: "Energy demand surging with population. Massive solar potential largely untapped.", co2: "1.4 Gt", icon: "solar_power" },
        { region: "Middle East", status: "Critical", trend: "+2.1%", color: "var(--color-accent)", insights: "Fossil fuel extraction dominating emissions profile. Early stage diversification efforts.", co2: "2.7 Gt", icon: "oil_barrel" }
    ];

    return (
        <div className="content-wrapper" style={{ paddingTop: '6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div className="narrative-header" style={{ textAlign: 'left', margin: 0 }}>
                <p className="narrative-badge">Global Overview</p>
                <h2 className="dashboard-heading" style={{ margin: 0, fontSize: '2.5rem' }}>Regional <span className="text-gradient">Reports</span></h2>
                <p className="text-muted" style={{ maxWidth: '600px', marginTop: '1rem' }}>
                    Explore detailed analysis of environmental impacts across different continents. Interactive maps and sub-regional breakdowns coming in the next data cycle.
                </p>
            </div>

            <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', paddingBottom: '4rem' }}>
                {regions.map((report, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={report.region}
                        className="glass-panel hover-light group"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer', padding: '1.5rem' }}
                    >
                        <div className="flex-between w-full">
                            <div className="flex-align gap-3">
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex' }}>
                                    <span className="material-symbols-outlined" style={{ color: report.color }}>{report.icon}</span>
                                </div>
                                <h3 className="card-title text-xl m-0">{report.region}</h3>
                            </div>
                            <span className="material-symbols-outlined text-muted" style={{ transition: 'transform 0.2s', opacity: 0.5 }} >arrow_outward</span>
                        </div>

                        <div className="flex-align gap-2">
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: report.color, background: 'rgba(255,255,255,0.05)', border: `1px solid ${report.color}40`, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                {report.status}
                            </span>
                            <span className="text-xs text-muted font-medium bg-black/20 px-2 py-1 rounded">Trend: {report.trend}</span>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
                            <div className="flex-between mb-2">
                                <span className="text-xs text-muted uppercase tracking-wider">Annual Emissions</span>
                                <span className="font-bold text-white">{report.co2}</span>
                            </div>
                            <p className="text-sm text-slate-400 m-0" style={{ lineHeight: 1.5 }}>{report.insights}</p>
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    );
}
