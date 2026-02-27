import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAIInsight from '../hooks/useAIInsight';

// Sub-component to handle the typing effect precisely once the data arrives
const TypingText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset on new text
        let currentIndex = 0;

        if (!text) return;

        const intervalId = setInterval(() => {
            if (currentIndex < text.length - 1) {
                setDisplayedText(prev => prev + text[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 15); // Adjust typing speed here (ms per char)

        return () => clearInterval(intervalId);
    }, [text]);

    return <span>{displayedText}</span>;
};

export default function InsightCard({ year, co2Value }) {
    const { insight, isLoading, error } = useAIInsight(year, co2Value);

    return (
        <motion.div
            className="insight-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="insight-header">
                <div className="insight-badge">
                    <span className="sparkle">✨</span> AI-Powered Insight
                </div>
                {year && <span className="insight-year">Year: {year}</span>}
            </div>

            <div className="insight-body">
                {isLoading ? (
                    <div className="skeleton-container">
                        <div className="skeleton-line full"></div>
                        <div className="skeleton-line medium"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                ) : error ? (
                    <p className="insight-error">Insight currently unavailable.</p>
                ) : (
                    <p className="insight-text">
                        <TypingText text={insight} />
                    </p>
                )}
            </div>
        </motion.div>
    );
}
