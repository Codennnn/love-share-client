import request from '../request'

export function getGoods(data) {
  return request({
    url: '/goods/goods',
    method: 'get',
    data,
  })
}

export function register(query) {
  return request({
    url: '/user/register',
    method: 'post',
    params: query,
  })
}
