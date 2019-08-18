module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog/'
    : '/',

  devServer: {
    host: '0.0.0.0',
    // proxy: 'http://localhost:7001/api',
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/scss/variables.scss', './src/assets/scss/common.scss'],
        })
        .end();
    });
  },

  lintOnSave: undefined,
};
