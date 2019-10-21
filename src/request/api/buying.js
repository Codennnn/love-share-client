import request from '../request'

export function getBuyingList() {
  return request({
    url: '/buying/buying_list',
    method: 'get',
  })
}

export function getPublished() {
  return request({
    url: '/goods/published',
    method: 'get',
  })
}
