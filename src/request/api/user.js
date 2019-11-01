import request from '../request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function register(query) {
  return request({
    url: '/user/register',
    method: 'post',
    params: query,
  })
}

export function logout() { }

export function getUserInfo() {
  return request({
    url: '/user/user_info',
    method: 'get',
  })
}

export function resetPassword() {
  return request({
    url: '/user/reset_password',
    method: 'put',
  })
}

export function getUserList() {
  return request({
    url: '/user/user_list',
    method: 'get',
  })
}

export function getUserDetail() {
  return request({
    url: '/user/user_detail',
    method: 'get',
  })
}

export function getUserDetailInfo() {
  return request({
    url: '/user/detail_info',
    method: 'get',
  })
}

export function getRecentContacts() {
  return request({
    url: '/user/recent_contacts',
    method: 'get',
  })
}

export function getShippingAddress() {
  return request({
    url: '/user/shipping_address',
    method: 'get',
  })
}

export function setDefaultAddress() {
  return request({
    url: '/user/default_address',
    method: 'put',
  })
}

export function addAddress() {
  return request({
    url: '/user/address',
    method: 'post',
  })
}

export function deleteAddress() {
  return request({
    url: '/user/address',
    method: 'delete',
  })
}
