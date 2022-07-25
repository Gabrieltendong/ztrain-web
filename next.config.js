const path = require('path')
const nextTranslate = require('next-translate');


module.exports = nextTranslate({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
  env: {
    baseUrl: "https://api-ztrain.herokuapp.com",
    google_client_id: "122559722175-81vl2ohvv08nc7925f80mv2in34t7lrm.apps.googleusercontent.com"
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
})