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

Mock.mock(/\/notices/, 'get', {
  code: 2000,
  data: {
    notices: [
      {
        title: '优惠券即将到期', content: '您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用', type: 0, time: 1569600000,
      },
      {
        title: '优惠券即将到期', content: '您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用', type: 1, time: 1561910400,
      },
      {
        title: '优惠券即将到期', content: '您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用', type: 2, time: 1506700800,
      },
    ],
  },
})

Mock.setup({
  timeout: '500-1000',
})
