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
