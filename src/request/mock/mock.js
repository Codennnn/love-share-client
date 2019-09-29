import Mock from 'mockjs'

Mock.mock(/\/login/, 'post', {
  code: 2000,
  data: {
    token: 'login',
  },
})

Mock.mock(/\/register/, 'post', {
  code: 2000,
  data: {
    token: 'login',
  },
})

Mock.mock(/\/user_info/, 'get', {
  code: 2000,
  data: {
    nickname: '123456',
    roles: ['admin'],
  },
})

Mock.mock(/\/user[\s\S]*?/, 'get', () => ({
  data: 1234,
}))

Mock.setup({
  timeout: '500-1000',
})
