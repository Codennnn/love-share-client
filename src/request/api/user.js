import request from '../request'

export function signIn(data) {
  return request({
    url: '/user/sign_in',
    method: 'post',
    data,
  })
}

export function signUp(data) {
  return request({
    url: '/user/sign_up',
    method: 'post',
    data,
  })
}

export function signOut() { }

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/reset_password',
    method: 'put',
    data,
  })
}

export function getUserDetail() {
  return request({
    url: '/user/detail',
    method: 'get',
  })
}

export function modifyUser(data) {
  return request({
    url: '/user/modify',
    method: 'put',
    data,
  })
}

export function getUserInfoNum() {
  return request({
    url: '/user/info_num',
    method: 'get',
  })
}

export function getAddressList() {
  return request({
    url: '/user/address_list',
    method: 'get',
  })
}

export function addAddress(data) {
  return request({
    url: '/user/address/add',
    method: 'post',
    data,
  })
}

export function deleteAddress(data) {
  return request({
    url: '/user/address/delete',
    method: 'delete',
    data,
  })
}

export function updateAddress(data) {
  return request({
    url: '/user/address/update',
    method: 'put',
    data,
  })
}

export function setDefaultAddress(data) {
  return request({
    url: '/user/address/default',
    method: 'put',
    data,
  })
}

export function replaceAvatar(data) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/user/replace_avatar',
    method: 'put',
    data,
  })
}

export function getCheckIn() {
  return request({
    url: '/user/check_in_list',
    method: 'get',
  })
}

export function checkIn(data) {
  return request({
    url: '/user/check_in',
    method: 'post',
    data,
  })
}

export function subscribe(data) {
  return request({
    url: '/user/subscribe',
    method: 'post',
    data,
  })
}

export function unsubscribe(data) {
  return request({
    url: '/user/unsubscribe',
    method: 'delete',
    data,
  })
}

export function getPublishedGoods() {
  return request({
    url: '/user/published_goods',
    method: 'get',
  })
}

export function getPurchasedGoods() {
  return request({
    url: '/user/purchased_goods',
    method: 'get',
  })
}
