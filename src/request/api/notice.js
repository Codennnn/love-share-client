import request from '../request'

export function getNotices(data) {
  return request({
    url: '/notice/notices',
    method: 'get',
    data,
  })
}

export function register(query) {
  return request({
    url: '/notice/register',
    method: 'post',
    params: query,
  })
}
