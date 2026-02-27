import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import data from '../assets/data.json';

export default function DataProjection() {
    return (
        <section className="data-section">
            <div className="data-header">
                <h2>Projections</h2>
                <p>Analysis based on IPCC AR6 data models.</p>
            </div>

            <div className="data-stats">
                <motion.div
                    className="stat-box"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h4>CO2 & Renewable Trends</h4>
                    <div className="stat-values">
                        <div>
                            <span className="stat-label">Current CO2 Level</span>
                            <span className="stat-value high">421 ppm</span>
                        </div>
                        <div>
                            <span className="stat-label">Renewables 2023</span>
                            <span className="stat-value trend-up">30.2%</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-info"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <p>Data indicates a steady rise in atmospheric CO2 levels alongside a strong growth in renewable energy adoption. The teal line reflects increasing emissions, while the coral line represents progress in transition to sustainable power.</p>
                </motion.div>
            </div>

            <motion.div
                className="chart-container"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0df2f2" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0df2f2" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff7b72" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ff7b72" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="Year" stroke="#a0a0a0" tick={{ fill: '#a0a0a0' }} />
                        <YAxis yAxisId="left" stroke="#a0a0a0" tick={{ fill: '#a0a0a0' }} domain={['dataMin - 5', 'dataMax + 5']} />
                        <YAxis yAxisId="right" orientation="right" stroke="#a0a0a0" tick={{ fill: '#a0a0a0' }} domain={[0, 40]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area yAxisId="left" type="monotone" dataKey="CO2_Levels" name="CO2 Levels (ppm)" stroke="#0df2f2" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                        <Area yAxisId="right" type="monotone" dataKey="Renewable_Energy_Percentage" name="Renewables (%)" stroke="#ff7b72" strokeWidth={3} fillOpacity={1} fill="url(#colorProj)" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </section>
    );
}
