const pkg = require('./package')
const webpack = require('webpack')
require("dotenv").config();

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#10d5ff' },

  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css'
    'ant-design-vue/dist/antd.css',
    // {src: '@/assets/plyr/plyr.scss', lang: 'scss'},
    '@/assets/styles/telly.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/element-ui'
    '@/plugins/antd-ui',
    // { src: '@/plugins/swiper', ssr: false },
    { src: '@/plugins/bootstrap', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv'
  ],
  auth: {
    // Options
    strategies: {
      facebook: {
        client_id: '...',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      'laravel.passport': {
        url: 'https://weslati-khaled.herokuapp.com',
        client_id: '6',
        client_secret: 'v9IB4luyWjebXwVDXjPjGkXav0NgWmGJpplkOYgP',
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token"
          },
        },
      },
      password_grant: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token"
          },
          logout: false,
          user: {
            url: "api/v1/user"
          }
        }
      },
      password_grant_custom: {
        _scheme: "~/auth/schemes/PassportPasswordScheme.js",
        client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
        client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token"
          },
          logout: false,
          user: {
            url: "api/v1/user"
          }
        }
      },
      // 'laravel.passport': {
      //   url: process.env.LARAVEL_ENDPOINT,
      //   client_id: process.env.PASSPORT_CLIENT_ID,
      //   client_secret: process.env.PASSPORT_CLIENT_SECRET,
      //   userinfo_endpoint: process.env.LARAVEL_ENDPOINT + "/api/oauth/user",
      // }
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://weslati-khaled.herokuapp.com'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    // loaders: [
    //   {
    //     test: /\.js$/, // Check for all js files
    //     exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
    //     loader: 'babel-loader'
    //   }
    // ],
    postcss: false,
    extractCSS: true,
    vendor:['jquery', 'bootstrap', 'plyr'],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Plyr: 'plyr',
        'window.plyr': 'plyr'
      })
    ]
  }
}
