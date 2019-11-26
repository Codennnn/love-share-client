import request from '../request'

export function getGoods() {
  return request({
    url: '/goods/list',
    method: 'get',
  })
}

export function getStoredGoods() {
  return request({
    url: '/goods/stored',
    method: 'get',
  })
}

export function getDismountedGoods() {
  return request({
    url: '/goods/dismounted',
    method: 'get',
  })
}

export function getGoodsListInfo() {
  return request({
    url: '/goods/list_info',
    method: 'get',
  })
}

export function getGoodsDetail() {
  return request({
    url: '/goods/detail',
    method: 'get',
  })
}

export function deleteGoods() {
  return request({
    url: '/goods/delete',
    method: 'delete',
  })
}

export function collectGoods() {
  return request({
    url: '/goods/collect',
    method: 'post',
  })
}

export function uncollectGoods() {
  return request({
    url: '/goods/uncollect',
    method: 'delete',
  })
}

export function dismountGoods() {
  return request({
    url: '/goods/dismount',
    method: 'post',
  })
}

export function cancelDismountGoods() {
  return request({
    url: '/goods/cancel_dismount',
    method: 'post',
  })
}

export function getCartList() {
  return request({
    url: '/goods/cart_list',
    method: 'get',
  })
}

export function addCartItem() {
  return request({
    url: '/goods/cart_item/add',
    method: 'post',
  })
}

export function removeCartItem() {
  return request({
    url: '/goods/cart_item/remove',
    method: 'delete',
  })
}

export function deleteGoodsImg(data) {
  return request({
    url: '/goods/img/delete',
    method: 'delete',
    data,
  })
}
