import { motion } from 'framer-motion';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EMISSION_FACTORS } from '../utils/constants';

const mockData = [
    { year: '2000', co2: 369.5 },
    { year: '2001', co2: 371.1 },
    { year: '2002', co2: 373.2 },
    { year: '2003', co2: 375.8 },
    { year: '2004', co2: 377.5 },
    { year: '2005', co2: 379.8 },
    { year: '2006', co2: 381.9 },
    { year: '2007', co2: 383.8 },
    { year: '2008', co2: 385.6 },
    { year: '2009', co2: 387.4 },
    { year: '2010', co2: 389.9 },
    { year: '2011', co2: 391.6 },
    { year: '2012', co2: 393.8 },
    { year: '2013', co2: 396.5 },
    { year: '2014', co2: 398.6 },
    { year: '2015', co2: 400.8 },
    { year: '2016', co2: 404.2 },
    { year: '2017', co2: 406.5 },
    { year: '2018', co2: 408.5 },
    { year: '2019', co2: 411.4 },
    { year: '2020', co2: 414.2 },
    { year: '2021', co2: 416.4 },
    { year: '2022', co2: 418.5 },
    { year: '2023', co2: 421.0 },
    { year: '2024', co2: 423.5 },
    { year: '2025', co2: 425.0, projectedCo2: 425.0 },
    { year: '2026', projectedCo2: 427.1 },
    { year: '2027', projectedCo2: 429.5 },
    { year: '2028', projectedCo2: 432.2 },
    { year: '2029', projectedCo2: 435.0 },
    { year: '2030', projectedCo2: 438.1 },
    { year: '2031', projectedCo2: 441.5 },
    { year: '2032', projectedCo2: 445.0 },
    { year: '2033', projectedCo2: 448.8 },
    { year: '2034', projectedCo2: 452.5 },
    { year: '2035', projectedCo2: 456.0 }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{
                backgroundColor: 'rgba(17, 24, 39, 0.85)', // dark-mode gray semi-transparent
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                color: '#fff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                minWidth: '180px',
                zIndex: 1000
            }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                    Year: {label}
                </p>
                {payload.map((entry, index) => {
                    let name = entry.name;
                    let val = entry.value;
                    let color = entry.color;
                    if (entry.dataKey === 'personalImpact') {
                        name = "Your Ann. Impact";
                        val = `${Math.round(val).toLocaleString()} kg CO2`;
                    }
                    return (
                        <p key={index} style={{ margin: '0.25rem 0', color: color, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }}></span>
                            <span style={{ flex: 1 }}>{name}</span>
                            <strong style={{ color: '#fff' }}>{val}</strong>
                        </p>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default function CO2TrendsChart({ currentYear = 2025, mode = 'historical', calculatorData, isMobile }) {

    // Calculate personal footprint (kg CO2/year) based on constants
    const footprint = calculatorData ?
        (calculatorData.commute * 52 * EMISSION_FACTORS.COMMUTE) +
        (calculatorData.energy * 12 * EMISSION_FACTORS.GRID) +
        (calculatorData.diet * 365 * EMISSION_FACTORS.DIET)
        : null;

    const filteredData = mockData.filter(d => {
        const y = parseInt(d.year);
        if (mode === 'historical') return y <= currentYear;
        if (mode === 'projected') return y >= 2025 && y <= Math.max(2025, currentYear);
        return y <= currentYear;
    }).map(d => ({
        ...d,
        personalImpact: footprint // Appends calculator impact line
    }));

    return (
        <section className="data-section" style={{ paddingTop: '2rem' }}>
            <div className="data-header">
                <h2>CO2 Emission Trends</h2>
                <p>
                    {mode === 'historical' && "Historical "}
                    {mode === 'projected' && "Projected "}
                    {mode === 'both' && "Historical and projected "}
                    global atmospheric carbon dioxide levels (in ppm).
                </p>
            </div>

            <motion.div
                className="chart-container"
                layout="position"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    layout: { duration: 0.8, type: "spring", bounce: 0.2 },
                    default: { duration: 0.8, ease: "easeOut" }
                }}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={filteredData} margin={{ top: 20, right: isMobile ? 10 : 30, left: 0, bottom: 20 }}>
                        <defs>
                            <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProjCo2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis
                            dataKey="year"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: isMobile ? 11 : 14 }}
                            minTickGap={isMobile ? 15 : 30}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: isMobile ? 11 : 14 }}
                            domain={['dataMin - 5', 'dataMax + 5']}
                            width={isMobile ? 32 : 60}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="var(--color-accent)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: isMobile ? 11 : 14 }}
                            domain={[0, 15000]} // Fixed domain bounds so users can see footprint fall relative to a worst-case scenario.
                            width={isMobile ? 40 : 60}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, fill: 'rgba(255,255,255,0.05)' }}
                            allowEscapeViewBox={{ x: false, y: false }}
                        />
                        {(mode === 'historical' || mode === 'both') && (
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="co2"
                                name="Historical CO2 (ppm)"
                                stroke="var(--color-brand)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorCo2)"
                                isAnimationActive={true}
                                animationDuration={800}
                                animationEasing="ease-in-out"
                            />
                        )}
                        {(mode === 'projected' || mode === 'both') && (
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="projectedCo2"
                                name="Projected CO2 (ppm)"
                                stroke="var(--color-accent)"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                fillOpacity={1}
                                fill="url(#colorProjCo2)"
                                isAnimationActive={true}
                                animationDuration={800}
                                animationEasing="ease-in-out"
                            />
                        )}
                        {footprint !== null && (
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="personalImpact"
                                name="Your Ann. Impact"
                                stroke="#eaff00"
                                strokeWidth={3}
                                strokeDasharray="4 4"
                                dot={false}
                                isAnimationActive={true}
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </motion.div>
        </section>
    );
}
