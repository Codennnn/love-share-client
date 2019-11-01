import request from '../request'

export function getNotices() {
  return request({
    url: '/common/notices',
    method: 'get',
  })
}

export function getSchoolList() {
  return request({
    url: '/common/school_list',
    method: 'get',
  })
}
