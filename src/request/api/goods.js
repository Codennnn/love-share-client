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

export function getPublished() {
  return request({
    url: '/goods/published',
    method: 'get',
  })
}

export function getBought() {
  return request({
    url: '/goods/bought',
    method: 'get',
  })
}

export function getGoodsDetail() {
  return request({
    url: '/goods/detail',
    method: 'get',
  })
}

export function getGoodsCategory() {
  return request({
    url: '/goods/category_list',
    method: 'get',
  })
}

export function addGoodsCategory() {
  return request({
    url: '/goods/category/add',
    method: 'post',
  })
}

export function deleteGoodsCategory() {
  return request({
    url: '/goods/category/delete',
    method: 'delete',
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
