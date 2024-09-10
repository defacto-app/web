/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
const nextConfig = {


    images: {
        remotePatterns:[
            {
                hostname:"placehold.co"
            },
            {
                hostname: "res.cloudinary.com"
            }
        ]
    }

};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

export default nextConfig;