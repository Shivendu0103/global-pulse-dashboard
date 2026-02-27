import { motion } from 'framer-motion';

const cards = [
    {
        title: "Emissions Reduction",
        value: "Reduction by 2030",
        icon: "🔥"
    },
    {
        title: "Carbon Sequestration",
        value: "Cumulative Impact: Equivalent to planting 200M trees",
        icon: "🌲"
    },
    {
        title: "Global Impact Map",
        value: "View active projects worldwide",
        icon: "🌍",
        links: ["Narrative", "Data", "Map", "Profile"]
    }
];

export default function NarrativeCards() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="narrative-section">
            <div className="narrative-header">
                <p className="narrative-badge">EcoImpact</p>
                <h2>Our Commitment to a Green Future</h2>
                <p>Tracking our progress towards net-zero emissions through real-time global initiatives and sustainable practices.</p>
            </div>

            <motion.div
                className="cards-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                {cards.map((card, index) => (
                    <motion.div key={index} className="narrative-card" variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(13, 242, 242, 0.15)" }}>
                        <div className="card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        {card.subValue && <span className="card-sub">{card.subValue}</span>}
                        <p>{card.value}</p>
                        {card.links && (
                            <div className="card-links">
                                {card.links.map(link => (
                                    <span key={link} className="card-link">{link}</span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
