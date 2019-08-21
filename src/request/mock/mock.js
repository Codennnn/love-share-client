import Mock from 'mockjs';

Mock.mock(/\/login/, 'post', {
  code: 2000,
  data: {
    nick_name: '123456',
    token: 'login',
  },
});

Mock.mock(/\/user_info/, 'get', {
  code: 2000,
  data: {
    roles: ['admin'],
  },
});

Mock.mock(/\/users[\s\S]*?/, 'get', () => ({
  data: 1234,
}));

Mock.setup({
  timeout: '500-1000',
});
