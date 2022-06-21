const path = require('path')
const nextTranslate = require('next-translate');


module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ]
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fr'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',

    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain:'dev-ztrain-web.vercel.app',
        defaultLocale: 'en-US',
      }
    ]
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  },
  reactStrictMode: true,
  env: {
    baseUrl: "https://api-ztrain-dev.herokuapp.com",
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
}