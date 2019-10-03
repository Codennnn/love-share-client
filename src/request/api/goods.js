import request from '../request'

export function getGoods() {
  return request({
    url: '/goods/goods',
    method: 'get',
  })
}

export function register(query) {
  return request({
    url: '/user/register',
    method: 'post',
    params: query,
  })
}
