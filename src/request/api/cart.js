import request from '../request'

export function getCartList() {
  return request({
    url: '/cart/list',
    method: 'get',
  })
}

export function addCartItem() {
  return request({
    url: '/cart/add',
    method: 'post',
  })
}

export function removeCartItem() {
  return request({
    url: '/cart/delete',
    method: 'delete',
  })
}
