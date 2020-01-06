import request from '../request'

export function getBeggingList(parames) {
  return request({
    url: '/begging/list',
    method: 'get',
    parames,
  })
}

export function addBuying() {
  return request({
    url: '/begging/add',
    method: 'post',
  })
}

export function deleteBuying() {
  return request({
    url: '/begging/delete',
    method: 'delete',
  })
}

export function updateBuying() {
  return request({
    url: '/begging/update',
    method: 'put',
  })
}
