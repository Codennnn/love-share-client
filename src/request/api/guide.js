import request from '../request'

export function getGuideList() {
  return request({
    url: '/guide/list',
    method: 'get',
  })
}

export function getArticle(params) {
  return request({
    url: '/guide/article/content',
    method: 'get',
    params,
  })
}
