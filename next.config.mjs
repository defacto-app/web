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

	// More aggressive path exclusion
	pageExtensions: [
		...(process.env.EXCLUDE_ADMIN === 'true'
				? ['tsx', 'ts', 'jsx', 'js'].map(ext => `((?!admin).)*\\.${ext}$`)
				: ['tsx', 'ts', 'jsx', 'js']
		)
	],

	// Add webpack configuration for admin exclusion

	webpack: (config, { isServer }) => {
		if (process.env.EXCLUDE_ADMIN === 'true') {
			config.watchOptions = {
				ignored: ['**/admin/**', '**/api/auth/admin/**']
			}
			// Add ignore pattern for admin routes
			if (!config.module) config.module = {};
			if (!config.module.rules) config.module.rules = [];

			config.module.rules.push({
				test: /[\\/]admin[\\/]|[\\/]api[\\/]auth[\\/]admin[\\/]/,
				loader: 'ignore-loader'
			});
		}
		return config
	},

	distDir: buildDir,

	// Optimize output for Cloudflare
	output: 'standalone',
};



if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

export default nextConfig;