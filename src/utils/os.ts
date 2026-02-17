
export type OSType = 'mac-arm64' | 'mac-intel' | 'windows' | 'linux';

/**
 * Detects the user's operating system and macOS architecture
 */
export async function detectPlatform(): Promise<OSType> {
    // Try modern User-Agent Client Hints API first (Chromium-based browsers)
    if ('userAgentData' in navigator && (navigator as any).userAgentData) {
        try {
            const uaData = await (navigator as any).userAgentData.getHighEntropyValues([
                'platform',
                'architecture'
            ]);

            const platform = (uaData.platform || '').toLowerCase();
            const architecture = (uaData.architecture || '').toLowerCase();

            if (platform.includes('win')) return 'windows';
            if (platform.includes('linux') && !platform.includes('android')) return 'linux';

            if (platform.includes('mac')) {
                if (architecture.includes('arm')) return 'mac-arm64';
                if (architecture.includes('x86')) return 'mac-intel';
                return 'mac-arm64'; // Default to ARM64
            }
        } catch (error) {
            console.warn('User-Agent Client Hints failed, falling back to userAgent parsing:', error);
        }
    }

    // Fallback to legacy userAgent parsing
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes('win')) return 'windows';
    if (userAgent.includes('linux') && !userAgent.includes('android')) return 'linux';
    if (userAgent.includes('mac')) {
        if (userAgent.includes('arm64') || userAgent.includes('aarch64')) return 'mac-arm64';
        return 'mac-arm64'; // Default to ARM64
    }

    return 'mac-arm64'; // Ultimate fallback
}
