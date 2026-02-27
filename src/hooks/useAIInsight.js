import { useState, useEffect } from 'react';

// Module-level cache to persist results across component remounts during a single session
const insightCache = new Map();

export default function useAIInsight(year, co2Value) {
    const [insight, setInsight] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch if we have valid inputs
        if (!year || !co2Value) return;

        const cacheKey = `${year}-${co2Value}`;

        // Return immediately if data is already cached
        if (insightCache.has(cacheKey)) {
            setInsight(insightCache.get(cacheKey));
            setError(null);
            return;
        }

        const fetchInsight = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/insight', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ year, co2Value })
                });

                if (!response.ok) throw new Error('Failed to fetch insight');

                const data = await response.json();

                // Save to cache before updating state
                insightCache.set(cacheKey, data.insight);
                setInsight(data.insight);

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInsight();
    }, [year, co2Value]);

    return { insight, isLoading, error };
}
