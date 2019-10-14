import request from '../request'

export function getOrders() {
  return request({
    url: '/order/orders',
    method: 'get',
  })
}

export function getPublished() {
  return request({
    url: '/goods/published',
    method: 'get',
  })
}
