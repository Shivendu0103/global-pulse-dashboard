import { useRef, useEffect, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';

// Base mock hotspots for emissions
const hotspots = [
    { lat: 40.7128, lng: -74.0060, name: 'New York', baseSize: 0.2, growth: 0.05 },
    { lat: 39.9042, lng: 116.4074, name: 'Beijing', baseSize: 0.4, growth: 0.08 },
    { lat: 28.6139, lng: 77.2090, name: 'New Delhi', baseSize: 0.3, growth: 0.07 },
    { lat: 51.5074, lng: -0.1278, name: 'London', baseSize: 0.2, growth: 0.03 },
    { lat: -23.5505, lng: -46.6333, name: 'São Paulo', baseSize: 0.25, growth: 0.04 },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo', baseSize: 0.3, growth: 0.02 },
    { lat: 55.7558, lng: 37.6173, name: 'Moscow', baseSize: 0.25, growth: 0.04 },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney', baseSize: 0.15, growth: 0.02 },
    { lat: 25.2048, lng: 55.2708, name: 'Dubai', baseSize: 0.2, growth: 0.06 },
    { lat: 1.3521, lng: 103.8198, name: 'Singapore', baseSize: 0.15, growth: 0.03 }
];

export default function GlobalEmissionMap({ currentYear }) {
    const globeEl = useRef();
    const [hydrated, setHydrated] = useState(false);

    // Prevent hydration errors with SSR/Vite initialization
    useEffect(() => {
        setHydrated(true);
        if (globeEl.current) {
            // Auto-rotate setup
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
            globeEl.current.controls().enableZoom = false;
        }
    }, []);

    // Memoize the point calculation based on current year to visualize growing emissions
    const pointsData = useMemo(() => {
        const yearsPassed = Math.max(0, currentYear - 2000);
        return hotspots.map(spot => {
            // Hotspots grow over time, representing increasing CO2 concentration
            const currentSize = spot.baseSize + (spot.growth * (yearsPassed / 5));
            return {
                ...spot,
                // The size caps out to prevent it covering too much of the screen
                size: Math.min(currentSize, 1.2),
                color: currentYear >= 2025 ? 'rgba(255, 123, 114, 0.8)' : 'rgba(13, 242, 242, 0.8)' // Switch to coral if in projected territory
            };
        });
    }, [currentYear]);

    if (!hydrated) return <div style={{ height: '400px', width: '100%' }}></div>;

    return (
        <section className="globe-section" style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="data-header" style={{ width: '100%', textAlign: 'left', marginBottom: '1rem' }}>
                <h2>Global Hotspots</h2>
                <p>Interactive 3D visualization of concentrated CO2 active zones over time.</p>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'grab'
            }}>
                <Globe
                    ref={globeEl}
                    width={800} // Approximate width to fit container
                    height={400}
                    backgroundColor="rgba(0,0,0,0)" // Transparent background
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    htmlElementsData={pointsData}
                    htmlLat="lat"
                    htmlLng="lng"
                    htmlElement={d => {
                        const el = document.createElement('div');
                        el.className = 'marker-container';

                        const pulse = document.createElement('div');
                        pulse.className = 'pulse-ring';
                        // Keep dynamic coloring based on projection state scaling
                        pulse.style.backgroundColor = d.color;
                        pulse.style.boxShadow = `0 0 ${d.size * 10}px ${d.color}`;
                        pulse.style.width = `${Math.max(8, d.size * 12)}px`;
                        pulse.style.height = `${Math.max(8, d.size * 12)}px`;

                        const label = document.createElement('div');
                        label.className = 'marker-label';
                        label.innerText = d.name;

                        el.appendChild(pulse);
                        el.appendChild(label);
                        return el;
                    }}
                />
            </div>
        </section>
    );
}
