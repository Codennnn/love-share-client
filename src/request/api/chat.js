import request from '../request'

export function getContactList() {
  return request({
    url: '/chat/contact_list',
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
