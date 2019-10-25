import request from '../request'

export function getNotices() {
  return request({
    url: '/common/notices',
    method: 'get',
  })
}

export function getSchools() {
  return request({
    url: '/common/schools',
    method: 'get',
  })
}
