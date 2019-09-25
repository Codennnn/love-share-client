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
