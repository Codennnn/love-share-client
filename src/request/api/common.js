import request from '../request'

export function getNotices() {
  return request({
    url: '/common/notices',
    method: 'get',
  })
}

export function checkPhoneNumber(data) {
  return request({
    url: '/common/check_phone_number',
    method: 'post',
    data,
  })
}

export function getVerificationCode(data) {
  return request({
    url: '/common/verification_code',
    method: 'post',
    data,
  })
}

export function getCategoryList() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}

export function getSchoolList() {
  return request({
    url: '/school/list',
    method: 'get',
  })
}
