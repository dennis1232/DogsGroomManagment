/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.js\.map$/,
        use: ["ignore-loader"],
      });
    }
    return config;
  },
};

export default nextConfig;
