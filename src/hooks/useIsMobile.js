import { useState, useEffect } from 'react';

export default function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is defined (for SSR safety, though this is Vite SPA)
        if (typeof window === 'undefined') return;

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkIsMobile();

        // Setup listener
        window.addEventListener('resize', checkIsMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIsMobile);
    }, [breakpoint]);

    return isMobile;
}
