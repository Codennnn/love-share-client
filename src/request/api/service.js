import request from '../request'

export function getArticle() {
  return request({
    url: '/service/article',
    method: 'get',
  })
}

export function getOrderDetail() {
  return request({
    url: '/order/order_detail',
    method: 'get',
  })
}
