import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
    turbopack: {
        root: path.join(__dirname),
    },
    images: {
        unoptimized: true,
        qualities: [75, 100],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
