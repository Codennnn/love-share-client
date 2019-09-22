import request from '../request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data,
  })
}

export function register(query) {
  return request({
    url: '/users/register',
    method: 'post',
    params: query,
  })
}

export function logout() { }

export function getUserInfo() {
  return request({
    url: '/users/user_info',
    method: 'get',
  })
}
