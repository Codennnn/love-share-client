module.exports = {
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
};
