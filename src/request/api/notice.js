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

export function setAllNoticesRead(data) {
  return request({
    url: '/notice/set_all_read',
    method: 'put',
    data,
  })
}

export function deleteNotice(data) {
  return request({
    url: '/notice/delete',
    method: 'delete',
    data,
  })
}

export function deleteManyNotices(data) {
  return request({
    url: '/notice/delete_many',
    method: 'delete',
    data,
  })
}
