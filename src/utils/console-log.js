export default () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('您可以通过以下方式联系我 👇🏼：')
    console.log('📧 Email:', 'czc12580520@gmail.com')
    console.log('🌏 Wechat:', 'czc12580520')
    console.log('%c ', "padding:200px 250px;background:url('https://gitee.com/chinesee/images/raw/master/img/img_013.png') no-repeat;background-size: 100% 100%;")
  }
}
