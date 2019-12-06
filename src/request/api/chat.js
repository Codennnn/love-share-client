import request from '../request'

export function addContact(data) {
  return request({
    url: '/chat/contact/add',
    method: 'post',
    data,
  })
}

export function deleteContact(data) {
  return request({
    url: '/chat/contact/delete',
    method: 'delete',
    data,
  })
}

export function getContactList() {
  return request({
    url: '/chat/contact/list',
    method: 'get',
  })
}

export function getChatData() {
  return request({
    url: '/chat/chat_data',
    method: 'get',
  })
}

export function getContactInfo(params) {
  return request({
    url: '/chat/contact_info',
    method: 'get',
    params,
  })
}
