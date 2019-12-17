import request from '../request'

export function getNoticeList() {
  return request({
    url: '/notice/list',
    method: 'get',
  })
}

export function getUnreadNotices() {
  return request({
    url: '/notice/unread',
    method: 'get',
  })
}

export function setNoticeRead(data) {
  return request({
    url: '/notice/set_read',
    method: 'put',
    data,
  })
}
