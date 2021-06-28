const env = require('./server/env')
const envFileName = env.getEnvFileName()
env.setEnv(envFileName)
/* console.log(process.env.APP_API_HOST) */

module.exports = {
  mode: 'universal',
  // 服务器 配置
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - 李庆松的博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.staticfile.org/twitter-bootstrap/4.4.1/css/bootstrap.min.css' },
      /* 编辑器 CSS S  */
      /* // 3.0.0 */
      { rel: 'stylesheet', href: 'https://cdn.staticfile.org/prism/1.23.0/themes/prism.min.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/@toast-ui/editor@3.0.0/dist/toastui-editor.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/@toast-ui/editor-plugin-code-syntax-highlight@3.0.0/dist/toastui-editor-plugin-code-syntax-highlight.css' }

      /* // 2.2.0
      { rel: 'stylesheet', href: 'https://cdn.staticfile.org/codemirror/5.62.0/codemirror.css' },
      { rel: 'stylesheet', href: 'https://uicdn.toast.com/editor/2.2.0/toastui-editor-viewer.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.staticfile.org/highlight.js/9.18.3/styles/github.min.css' }
      */
      /* 编辑器 CSS E  */
    ],
    script: [
      { src: 'https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js' },
      { src: 'https://cdn.staticfile.org/popper.js/1.16.0/umd/popper.min.js' },
      /* 编辑器 js S  */
      /* // 3.0.0 */
      { src: 'https://uicdn.toast.com/editor/3.0.0/toastui-editor-all.min.js' },
      { src: 'https://uicdn.toast.com/editor-plugin-code-syntax-highlight/3.0.0/toastui-editor-plugin-code-syntax-highlight-all.min.js' },
      { src: 'https://cdn.staticfile.org/prism/1.23.0/prism.min.js' },
      { src: 'https://cdn.staticfile.org/prism/1.23.0/components/prism-clojure.min.js' },

      /* // 2.2.0
      { src: 'https://cdn.staticfile.org/highlight.js/9.18.3/highlight.min.js' },
      { src: 'https://cdn.staticfile.org/highlight.js/9.18.3/languages/clojure.min.js' },
      { src: 'https://uicdn.toast.com/editor/2.2.0/toastui-editor-viewer.min.js' },
      { src: 'https://uicdn.toast.com/editor-plugin-code-syntax-highlight/1.0.0/toastui-editor-plugin-code-syntax-highlight-all.min.js' },
      */
      /* 编辑器 js E  */
      { src: 'https://cdn.staticfile.org/twitter-bootstrap/4.4.1/js/bootstrap.min.js', async: true, defer: true },
      { src: '//at.alicdn.com/t/font_1713545_ma6b7rl92c.js', async: true, defer: true },
      { src: '/js/common.js', async: true, defer: true }
    ]
  },
  router: {
    middleware: [
      'config'
    ]
    /*  routeNameSplitter: '/',
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    } */
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#409eff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/router', mode: 'client' },
    { src: '~/plugins/baidu-seo-push', mode: 'client' },
    { src: '~/plugins/cnzz', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: envFileName }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.APP_API_HOST
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
