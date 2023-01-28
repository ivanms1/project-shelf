/**
 * @type {import('next').NextConfig}
 */

const withTM = require('next-transpile-modules')(['ui']);
const { i18n } = require('./next-i18next.config.js');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withTM(
  withVanillaExtract({
    reactStrictMode: true,
    experimental: {
      newNextLinkBehavior: true
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
        'avatars.githubusercontent.com',
        'cloudflare-ipfs.com',
        'loremflickr.com',
        'github.com',
        'github.githubassets.com',
      ],
    },
  })
);
