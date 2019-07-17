import request from '../request';

export function login(query) {
  console.log('query', query);

  return request({
    url: '/login',
    method: 'post',
    params: query,
  });
}

export function logout() { }

export function getUserInfo() { }
