import request from '../request';

export function login(query) {
  return request({
    url: '/login',
    method: 'post',
    params: query,
  });
}

export function lo() { }
