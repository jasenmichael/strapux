require('dotenv').config()
const {
  API_BASE_URL
} = process.env

export default {
  mode: 'spa',
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  loading: {
    color: '#fff'
  },
  css: [],
  plugins: [],
  buildModules: [],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
    // '@nuxtjs/proxy'
  ],
  bootstrapVue: {
    icons: true
  },
  auth: {
    redirects: {
      logout: "/login"
    },
    fullPathRedirect: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${API_BASE_URL}/auth/local`,
            method: 'post',
            propertyName: 'jwt'
          },
          logout: false,
          // user: false,
          user: {
            url: `${API_BASE_URL}/users/me`,
            method: 'get',
            propertyName: false
            // propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
  },
  router: {
    middleware: ['auth']
  },
  // proxy: {
  //   '/api/': {
  //     target: API_BASE_URL,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api/': ''
  //     }
  //   }
  // },
  axios: {
    // proxy: true,
    progress: true,
    baseUrl: API_BASE_URL
  },
  build: {
    extend(config, ctx) {}
  }
}
