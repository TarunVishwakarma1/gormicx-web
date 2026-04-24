const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }, // no eslint-config-next in deps
}

module.exports = withNextra(nextConfig)
