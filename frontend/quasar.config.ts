import { configure } from 'quasar/wrappers';

export default configure((/* ctx */) => {
  return {
    eslint: {
      warnings: true,
      errors: true
    },

    test: {
      jest: {
        env: {
          node: true,
          browser: true
        }
      }
    },

    typescript: {
      strict: true,
      vueShim: true,
      extendTsConfig: (/* tsConfig */) => { }
    },

    boot: ['axios'],

    css: ['app.scss'],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      vueRouterMode: 'hash',
      
      extendViteConf: (viteConf) => {
        // vite конфигурация
      },
      
      vitePlugins: [
        // vite плагины
      ]
    },

    devServer: {
      open: false,
      host: '0.0.0.0',
      port: 9000,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://backend:8000',
          changeOrigin: true,
          secure: false
        }
      }
    },

    framework: {
      config: {},

      plugins: ['Notify', 'Dialog', 'Loading']
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ['render']
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    cordova: {},
    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'qpp'
      }
    },

    bex: {
      contentScripts: ['my-content-script']
    }
  }
});
