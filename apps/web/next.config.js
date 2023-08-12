/**
 * @type {import('next').NextConfig}
 */

const withTM = require('next-transpile-modules')(['ui']);
const { i18n } = require('./next-i18next.config.js');

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'loremflickr.com',
      'via.placeholder.com',
      'cdn.discordapp.com',
    ],
  },
});
