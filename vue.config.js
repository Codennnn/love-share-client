module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog/'
    : '/',

  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
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
          resources: ['./src/assets/scss/styles/variables.scss'],
        })
        .end()
    })
  },

  lintOnSave: undefined,
}
