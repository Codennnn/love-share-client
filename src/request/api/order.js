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

export function getOrderTransactionAmount() {
  return request({
    url: '/order/order_transaction_amount',
    method: 'get',
  })
}

export function getOrderVolume() {
  return request({
    url: '/order/order_volume',
    method: 'get',
  })
}

export function getOrderNum() {
  return request({
    url: '/order/order_num',
    method: 'get',
  })
}
