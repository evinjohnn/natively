import { CONFIG } from "@/config/app";

export interface GitHubAsset {
    name: string;
    browser_download_url: string;
}

export interface GitHubRelease {
    tag_name: string;
    assets: GitHubAsset[];
}

export interface LatestAssets {
    macArm64: string;
    macIntel: string;
    winInstaller: string;
    winPortable: string;
    version: string;
}

/**
 * Fetches the latest release metadata from GitHub API
 */
export async function fetchLatestRelease(signal?: AbortSignal): Promise<LatestAssets | null> {
    try {
        const response = await fetch(
            "https://api.github.com/repos/evinjohnn/natively-cluely-ai-assistant/releases/latest",
            { signal }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubRelease = await response.json();
        const version = data.tag_name.replace(/^v/, "");
        
        const assets = data.assets;
        
        // Strategy: find assets by naming patterns observed in v2.0.5
        // macOS (Apple Silicon): Natively-2.0.5-arm64.dmg
        // macOS (Intel): Natively-2.0.5.dmg
        // Windows (Setup): Natively.Setup.2.0.5.exe
        // Windows (Portable): Natively.2.0.5.exe
        
        const macArm64Asset = assets.find(a => 
            a.name.toLowerCase().endsWith(".dmg") && a.name.toLowerCase().includes("arm64")
        ) || assets.find(a => 
            a.name.toLowerCase().endsWith(".zip") && a.name.toLowerCase().includes("arm64")
        );

        const macIntelAsset = assets.find(a => 
            a.name.toLowerCase().endsWith(".dmg") && !a.name.toLowerCase().includes("arm64")
        ) || assets.find(a => 
            a.name.toLowerCase().endsWith(".zip") && !a.name.toLowerCase().includes("arm64") && a.name.toLowerCase().includes("mac")
        );

        const winInstallerAsset = assets.find(a => 
            a.name.toLowerCase().endsWith(".exe") && a.name.toLowerCase().includes("setup")
        );

        const winPortableAsset = assets.find(a => 
            a.name.toLowerCase().endsWith(".exe") && !a.name.toLowerCase().includes("setup")
        );

        return {
            version,
            macArm64: macArm64Asset?.browser_download_url || "",
            macIntel: macIntelAsset?.browser_download_url || "",
            winInstaller: winInstallerAsset?.browser_download_url || "",
            winPortable: winPortableAsset?.browser_download_url || ""
        };
    } catch (error) {
        console.error("Failed to fetch latest release from GitHub:", error);
        return null;
    }
}
