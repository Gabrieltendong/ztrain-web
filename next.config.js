module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  env: {
    baseUrl: "https://ztrain-shop.herokuapp.com"
  }
}
