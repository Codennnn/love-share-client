import request from '../request'

export function getOrderList() {
  return request({
    url: '/order/list',
    method: 'get',
  })
}

export function getOrderDetail() {
  return request({
    url: '/order/order_detail',
    method: 'get',
  })
}
