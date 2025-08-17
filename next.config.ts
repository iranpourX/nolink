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
            }
        ]
    }
}

export default nextConfig
