import request from '../request'

export function getNotices() {
  return request({
    url: '/common/notices',
    method: 'get',
  })
}

export function getVerificationCode(data) {
  return request({
    url: '/common/verification_code',
    method: 'post',
    data,
  })
}

export function getSchoolList() {
  return request({
    url: '/school/list',
    method: 'get',
  })
}
