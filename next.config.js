const path = require('path')

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
  },
  images: {
    domains: [
      'i.natgeofe.com',
      'static.monbottier.fr',
      'shop.manfield.fr',
      'uploads-ssl.webflow.com',
      'sneakers123.s3.amazonaws.com',
      's-media-cache-ak0.pinimg.com',
      'i.pinimg.com',
      'lookhomme.com',
      'media.achat-ville.com',
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
