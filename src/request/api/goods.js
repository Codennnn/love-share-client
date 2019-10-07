import request from '../request'

export function getGoods() {
  return request({
    url: '/goods/goods',
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
