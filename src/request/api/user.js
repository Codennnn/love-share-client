import request from '../request';

export function login(query) {
  return request({
    url: '/users/login',
    method: 'post',
    params: query,
  });
}

export function logout() { }

export function getUserInfo(query) {
  return request({
    url: '/users/user_info',
    method: 'get',
    params: query,
  });
}
