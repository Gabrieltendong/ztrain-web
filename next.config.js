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
    baseUrl: "https://api-ztrain.onrender.com", 
    // baseUrl: "http://localhost:5000/", 
    google_client_id: "122559722175-81vl2ohvv08nc7925f80mv2in34t7lrm.apps.googleusercontent.com"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
    },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})