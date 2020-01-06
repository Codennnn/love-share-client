import request from '../request'

export function getBeggingList(params) {
  return request({
    url: '/begging/list',
    method: 'get',
    params,
  })
}

export function addBegging(data) {
  return request({
    url: '/begging',
    method: 'post',
    data,
  })
}

export function deleteBegging(data) {
  return request({
    url: '/begging',
    method: 'delete',
    data,
  })
}

export function updateBegging(data) {
  return request({
    url: '/begging',
    method: 'put',
    data,
  })
}
