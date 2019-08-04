module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog/'
    : '/',

  devServer: {
    host: '0.0.0.0',
    proxy: 'https://www.vegetable2t.top:8443/api/v1',
    // proxy: {
    //   "/api/v1": {
    //     target: "https://www.vegetable2t.top:8443/api/v1",
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
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
