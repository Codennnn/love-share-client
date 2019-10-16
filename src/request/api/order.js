import request from '../request'

export function getOrders() {
  return request({
    url: '/order/orders',
    method: 'get',
  })
}

export function getOrderDetail() {
  return request({
    url: '/order/order_detail',
    method: 'get',
  })
}
