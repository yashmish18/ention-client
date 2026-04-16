import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
