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

export function getUserList() {
  return request({
    url: '/user/list',
    method: 'get',
  })
}

export function getManagerList() {
  return request({
    url: '/user/manager_list',
    method: 'get',
  })
}

export function getUserDetail() {
  return request({
    url: '/user/detail',
    method: 'get',
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
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

export function getRecentContacts() {
  return request({
    url: '/user/recent_contacts',
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

export function getContactList() {
  return request({
    url: '/user/contact_list',
    method: 'get',
  })
}

export function subscribe() {
  return request({
    url: '/user/subscribe',
    method: 'post',
  })
}

export function unsubscribe() {
  return request({
    url: '/user/unsubscribe',
    method: 'post',
  })
}
