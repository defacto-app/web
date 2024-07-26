/** @type {import('next').NextConfig} */
const guestConfig = {
    distDir: 'build/guest',
    // Add other guest-specific configurations here
};

/** @type {import('next').NextConfig} */
const adminConfig = {
    distDir: 'build/admin',
    // Add other admin-specific configurations here
};

const nextConfig = process.env.BUILD_TARGET === 'admin' ? adminConfig : guestConfig;

export default nextConfig;
