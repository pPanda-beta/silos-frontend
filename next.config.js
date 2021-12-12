//TODO: TM added as per https://github.com/vercel/next.js/issues/25454
const withTM = require('next-transpile-modules')(
    ['dexie-react-hooks', 'dexie']);

module.exports = withTM({
  swcMinify: true,
  experimental: {
    esmExternals: 'loose'
  },
  async rewrites() {
    return [
      {
        source: '/api-images/:path*',
        destination: 'https://images.abpweddings.com/:path*'
      },
      {
        source: '/api-sofreadonly/:path*',
        destination: 'https://sofreadonly.abpweddings.com/:path*'
      },
    ]
  }
});
