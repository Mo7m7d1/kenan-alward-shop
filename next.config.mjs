/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
	},
	experimental: {
		reactCompiler: true,
		ppr: true,
		typedRoutes: true
	},
};

export default nextConfig;
