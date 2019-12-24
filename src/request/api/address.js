import request from '../request'

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
