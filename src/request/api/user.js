import request from '../request'

export function signIn(data) {
  return request({
    url: '/user/sign_in',
    method: 'post',
    data,
  })
}

export function signUp(query) {
  return request({
    url: '/user/sign_up',
    method: 'post',
    params: query,
  })
}

export function logout() { }

export function getUserInfo() {
  return request({
    url: '/user/info',
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

export function getAddressList() {
  return request({
    url: '/user/address_list',
    method: 'get',
  })
}

export function setDefaultAddress() {
  return request({
    url: '/user/default_address',
    method: 'post',
  })
}

export function addAddress() {
  return request({
    url: '/user/address/add',
    method: 'post',
  })
}

export function deleteAddress() {
  return request({
    url: '/user/address/delete',
    method: 'delete',
  })
}

export function modifyAddress() {
  return request({
    url: '/user/address/update',
    method: 'put',
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
