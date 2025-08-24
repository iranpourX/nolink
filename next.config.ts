import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    devIndicators: false,
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
            },
            {
                protocol: 'https',
                hostname: 'static.nolink.ir',
            }
        ]
    }
}

export default nextConfig
