import request from '../request'

export function getBuyingList() {
  return request({
    url: '/buying/list',
    method: 'get',
  })
}

export function addBuying() {
  return request({
    url: '/buying/add',
    method: 'post',
  })
}

export function deleteBuying() {
  return request({
    url: '/buying/delete',
    method: 'delete',
  })
}

export function updateBuying() {
  return request({
    url: '/buying/update',
    method: 'update',
  })
}
