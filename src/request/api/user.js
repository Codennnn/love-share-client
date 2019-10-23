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
