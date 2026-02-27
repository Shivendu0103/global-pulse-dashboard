import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    { year: '2025', co2: 425.0 }
];

export default function CO2TrendsChart({ currentYear = 2025 }) {
    const filteredData = mockData.filter(d => parseInt(d.year) <= currentYear);

    return (
        <section className="data-section" style={{ paddingTop: '2rem' }}>
            <div className="data-header">
                <h2>CO2 Emission Trends</h2>
                <p>Historical global atmospheric carbon dioxide levels (in ppm).</p>
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
                    <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis
                            dataKey="year"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            minTickGap={30}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            domain={['dataMin - 5', 'dataMax + 5']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card-hover)',
                                borderColor: 'var(--border-color)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)'
                            }}
                            itemStyle={{ color: 'var(--color-brand)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="co2"
                            name="CO2 (ppm)"
                            stroke="var(--color-brand)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCo2)"
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </section>
    );
}
