import request from '../request'

export function getNoticeList() {
  return request({
    url: '/notice/list',
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
