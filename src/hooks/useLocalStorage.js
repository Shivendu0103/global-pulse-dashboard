import { useState, useEffect } from 'react';

// A dynamic hook to store and persist user state securely utilizing localStorage
export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn("Local storage fallback:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.warn("Failed to write to local storage:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
