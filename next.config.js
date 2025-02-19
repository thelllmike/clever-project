/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      ZOHO_EMAIL: process.env.ZOHO_EMAIL,
      ZOHO_PASSWORD: process.env.ZOHO_PASSWORD,
    },
  };
  
  module.exports = nextConfig;
  