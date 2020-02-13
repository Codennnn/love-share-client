export default () => {
  if (process.env.NODE_ENV === 'production') {
    const titleStyle = "padding:6px 0;font-size: 18px;font-family: 'Microsoft YaHei'"
    const style = "padding:6px 0;font-size: 15px;font-family: 'Microsoft YaHei'"
    console.log('%c您可以通过以下方式联系我 👇🏼：', titleStyle)
    console.log('%c📧 Email: czc12580520@gmail.com', style)
    console.log('%c🌏 Wechat: czc12580520', style)
  }
}
