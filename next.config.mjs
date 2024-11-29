/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const isMainBuild = process.env.EXCLUDE_ADMIN === 'true';
const buildDir = isMainBuild ? 'build-main' : 'build-admin';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "placehold.co",
			},
			{
				hostname: "res.cloudinary.com",
			},
			{
				hostname: "maps.google.com",
			},
			{
				hostname: "example.com",
			},
		],
	},

	// Simplified page extensions handling
	pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

	// Webpack configuration for admin exclusion
	webpack: (config, { isServer }) => {
		if (process.env.EXCLUDE_ADMIN === 'true') {
			config.watchOptions = {
				ignored: ['**/admin/**', '**/api/auth/admin/**']
			}
			// Add ignore pattern for admin routes
			if (!config.module) config.module = {};
			if (!config.module.rules) config.module.rules = [];

			config.module.rules.push({
				test: /admin/,
				loader: 'ignore-loader'
			});
		}
		return config
	},

	distDir: buildDir,
	output: 'standalone',
};

if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

export default nextConfig;