import request from '../request';

export function loginValidate(query) {
  return request({
    url: '/login',
    method: 'post',
    params: query,
  });
}

export function lo() { }
