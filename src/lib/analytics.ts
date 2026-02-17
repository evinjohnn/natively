/**
 * Google Analytics 4 Helper
 * Provides type-safe event tracking with automatic gtag availability checking
 */

// Extend Window interface to include gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
    }
}

/**
 * Track a custom event to Google Analytics
 * @param eventName - The name of the event (e.g., 'download_click')
 * @param params - Event parameters object
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
    // Check if gtag is available (script loaded and initialized)
    if (typeof window !== 'undefined' && window.gtag) {
        try {
            window.gtag('event', eventName, params);
            console.log(`[Analytics] Event tracked: ${eventName}`, params);
        } catch (error) {
            console.warn('[Analytics] Failed to track event:', error);
        }
    } else {
        console.warn('[Analytics] gtag not available, event not tracked:', eventName);
    }
}
