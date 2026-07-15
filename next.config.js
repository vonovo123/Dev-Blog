/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_AUTH_TOKEN: process.env.SANITY_AUTH_TOKEN,
  },
};

module.exports = nextConfig;
