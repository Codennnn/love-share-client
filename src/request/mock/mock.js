import Mock from 'mockjs'
import user from './user'
import notice from './notice'

Mock.mock(/\/login/, 'post', user.login)

Mock.mock(/\/register/, 'post', user.register)

Mock.mock(/\/user_info/, 'get', user.userInfo)

Mock.mock(/\/user[\s\S]*?/, 'get', () => ({
  data: 1234,
}))

Mock.mock(/\/notices/, 'get', notice.notices)

Mock.setup({ timeout: '500-1000' })
