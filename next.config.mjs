import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
    // remove resolveAlias to avoid Windows absolute path imports
  },
}

export default nextConfig
