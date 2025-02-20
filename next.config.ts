import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    env: {
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        AUTH_SECRET: process.env.AUTH_SECRET,
        EDGE_STORE_ACCESS_KEY: process.env.EDGE_STORE_ACCESS_KEY,
        EDGE_STORE_SECRET_KEY: process.env.EDGE_STORE_SECRET_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    images: {
        remotePatterns : [
            {
                hostname: "images.pexels.com",
                pathname: "/**",
            },
            {
                hostname: "firebasestorage.googleapis.com",
                pathname: "/**",
            }
        ]
    },
    reactStrictMode: true,
};

export default nextConfig;
