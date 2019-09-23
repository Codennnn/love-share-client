module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog/'
    : '/',

  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://e071bfdd-4fda-4d10-bac8-6c17bdf33928.mock.pstmn.io',
        // target: 'http://localhost:7001',
        changeOrigin: true,
      },
    },
  },

  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/scss/variables.scss'],
        })
        .end()
    })
  },

  lintOnSave: undefined,
}
