/** @type {import('next').NextConfig} */
/*
const guestConfig = {
    distDir: 'build/guest',
    // Add other guest-specific configurations here
};

/!** @type {import('next').NextConfig} *!/
const adminConfig = {
    distDir: 'build/admin',
    // Add other admin-specific configurations here
};

const nextConfig = process.env.BUILD_TARGET === 'admin' ? adminConfig : guestConfig;
*/
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
/** @type {import('next').NextConfig} */
const nextConfig = {


    images: {
        remotePatterns:[
            {
                hostname:"placehold.co"
            }
        ]
    }

};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

export default nextConfig;