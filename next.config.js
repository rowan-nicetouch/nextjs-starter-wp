/**
 * Configuration file for Next.js
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */

const path = require('path')

const custom = {
  images: {
    /**
     * Allowed domains for remote images.
     *
     * @see https://nextjs.org/docs/messages/next-image-unconfigured-host
     * @todo create example for 12.3.0+ `remotePatterns` array.
     */
    domains: [
      // Local servers
      'wp.local',
    ],
  },
  webpack: (config) => {
    // The following fallbacks are needed to silence a grip of errors that
    // generated on both client and server as a result of using DomPurify to
    // sanitze user data. Many resources suggested that the `canvas` package
    // be installed. I tried but there were security issues.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false,
      net: false,
      tls: false,
      canvas: false,
      'utf-8-validate': false,
      bufferutil: false,
    }

    config.resolve.alias['base'] = path.resolve(__dirname, 'src/base')

    return config;
  },
}

module.exports = custom
