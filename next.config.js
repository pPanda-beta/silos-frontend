//TODO: TM added as per https://github.com/vercel/next.js/issues/25454
const withTM = require('next-transpile-modules')(
    ['dexie-react-hooks', 'dexie']);

const imagesBaseUrl = Buffer.from('aHR0cHM6Ly9pbWFnZXMuYWJwd2VkZGluZ3MuY29t', 'base64').toString();
const sofReadOnlyBaseUrl = Buffer.from('aHR0cHM6Ly9zb2ZyZWFkb25seS5hYnB3ZWRkaW5ncy5jb20=', 'base64').toString();

module.exports = withTM({
  swcMinify: true,
  experimental: {
    esmExternals: 'loose'
  },
  async rewrites() {
    return [
      {
        source: '/api-images/:path*',
        destination: `${imagesBaseUrl}/:path*`
      },
      {
        source: '/api-sofreadonly/:path*',
        destination: `${sofReadOnlyBaseUrl}/:path*`
      },
    ]
  }
});
