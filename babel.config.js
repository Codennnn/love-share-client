const plugins = [
  // 根据官网教程配置的按需引入element组件
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk',
    },
  ],
  // ES 新语法
  '@babel/plugin-proposal-optional-chaining',
]

// 生产环境移除 console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins,
}
