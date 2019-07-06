module.exports = {
  presets: [
    '@vue/app',
  ],
  // 根据官网教程配置的按需引入element组件
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
