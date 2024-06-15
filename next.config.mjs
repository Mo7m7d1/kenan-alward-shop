/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	experimental: {
		reactCompiler: true,
		ppr: true,
	},
	typescript: { ignoreBuildErrors: true },
	eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
