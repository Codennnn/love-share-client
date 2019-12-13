import request from '../request'

export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data,
  })
}

export function getOrderDetail(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params,
  })
}
