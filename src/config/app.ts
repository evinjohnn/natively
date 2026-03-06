
export const CONFIG = {
    GA_MEASUREMENT_ID: "G-6MX6YCGYGH",
    APP_VERSION: "2.0.1", // Main version, kept consistent
    DOWNLOADS: {
        MACOS: {
            VERSION: "2.0.1",
            ARM64: "Natively-2.0.1-arm64-mac.zip",
            INTEL: "Natively-2.0.1-mac.zip",
        },
        WINDOWS: {
            VERSION: "1.1.2",
            INSTALLER: "Natively-Setup-1.1.2.exe",
            PORTABLE: "Natively-1.1.2.exe",
        },
        LINUX: {
            VERSION: "Coming Soon",
        },
        BASE_URL: "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases/download",
    },
} as const;
