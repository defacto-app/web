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

	// Add webpack configuration for admin exclusion
	webpack: (config, { isServer }) => {
		if (isMainBuild) {
			config.watchOptions = {
				ignored: ['/app/admin/**']
			}
			config.module.rules.push({
				test: /admin/,
				loader: 'ignore-loader'
			})
		}
		return config
	},

	distDir: buildDir,
};

if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

export default nextConfig;