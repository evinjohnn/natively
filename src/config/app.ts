
export const CONFIG = {
    GA_MEASUREMENT_ID: "G-6MX6YCGYGH",
    APP_VERSION: "2.0.5", // Main version, kept consistent
    DOWNLOADS: {
        MACOS: {
            VERSION: "2.0.5",
            ARM64: "Natively-2.0.5-arm64.dmg",
            INTEL: "Natively-2.0.5.dmg",
        },
        WINDOWS: {
            VERSION: "2.0.5",
            INSTALLER: "Natively.Setup.2.0.5.exe",
            PORTABLE: "Natively.2.0.5.exe",
        },
        LINUX: {
            VERSION: "Coming Soon",
        },
        BASE_URL: "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases/download",
    },
} as const;
