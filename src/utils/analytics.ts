import { CONFIG } from "@/config/app";

// Declare gtag globally
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

type EventParams = {
    [key: string]: string | number | boolean | undefined;
};

/**
 * Tracks a custom event in Google Analytics 4
 * @param eventName The name of the event (e.g., 'download_click')
 * @param params The parameters associated with the event
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', eventName, params);
    } else {
        // Only warn in development to avoid console noise in production if GA blocked
        if (import.meta.env.DEV) {
            console.warn(`[Analytics] gtag not found. Event: ${eventName}`, params);
        }
    }
};

/**
 * Helper to initialize GA4 (optional if using script tag in index.html, but good for typed access)
 */
export const initGA = () => {
    // This is primarily handled in index.html, 
    // but we can expose config helpers if needed later.
};
