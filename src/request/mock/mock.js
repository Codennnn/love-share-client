import Mock from 'mockjs';

Mock.mock(/\/login/, 'post', {
  name: '123456',
});

Mock.mock(/\/users[\s\S]*?/, 'get', () => {
  console.log('11111111111');
  return {
    data: 1234,
  };
});

Mock.setup({
  timeout: '500-1000',
});
