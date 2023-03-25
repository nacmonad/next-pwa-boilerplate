const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: '/src/customSw.js',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'  
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
})

module.exports = nextConfig
