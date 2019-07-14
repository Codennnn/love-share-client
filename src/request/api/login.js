import request from '../request';

export function login(query) {
  return request({
    url: '/hi',
    method: 'post',
    params: query,
  });
}

export function lo() { }
