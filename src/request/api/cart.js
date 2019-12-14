import request from '../request'

export function getCartList() {
  return request({
    url: '/cart/list',
    method: 'get',
  })
}

export function addCartItem(data) {
  return request({
    url: '/cart/add',
    method: 'post',
    data,
  })
}

export function removeCartItem(data) {
  return request({
    url: '/cart/delete',
    method: 'delete',
    data,
  })
}

export function clearCartList(data) {
  return request({
    url: '/cart/clear',
    method: 'delete',
    data,
  })
}
