module.exports = {
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
}