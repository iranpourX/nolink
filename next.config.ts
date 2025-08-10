import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    devIndicators: false,
    output: 'standalone',
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co'
            }
        ]
    }
}

export default nextConfig
