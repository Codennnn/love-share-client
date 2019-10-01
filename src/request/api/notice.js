import request from '../request'

export function getNotices() {
  return request({
    url: '/notice/notices',
    method: 'get',
  })
}

export function register(query) {
  return request({
    url: '/notice/register',
    method: 'post',
    params: query,
  })
}
