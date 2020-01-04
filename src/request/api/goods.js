import request from '../request'

export function createGoods(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data,
  })
}

export function editGoods(data) {
  return request({
    url: '/goods/edit',
    method: 'put',
    data,
  })
}

export function updateManyGoods(data) {
  return request({
    url: '/goods/update_many',
    method: 'put',
    data,
  })
}

export function getRecommendGoodsList(params) {
  return request({
    url: '/goods/list/recommend',
    method: 'get',
    params,
  })
}

export function getGoodsListOfSameSchool(data) {
  return request({
    url: '/goods/list/same_school',
    method: 'post',
    data,
  })
}

export function getGoodsDetail(params) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params,
  })
}

export function deleteGoods() {
  return request({
    url: '/goods/delete',
    method: 'delete',
  })
}

export function dismountGoods() {
  return request({
    url: '/goods/dismount',
    method: 'post',
  })
}

export function cancelDismountGoods() {
  return request({
    url: '/goods/cancel_dismount',
    method: 'post',
  })
}

export function uploadGoodsImg(data) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/goods/img/upload',
    method: 'post',
    data,
  })
}

export function deleteGoodsImg(data) {
  return request({
    url: '/goods/img/delete',
    method: 'delete',
    data,
  })
}

export function getGoodsSeller(params) {
  return request({
    url: '/goods/seller',
    method: 'get',
    params,
  })
}

export function getGoodsComments(params) {
  return request({
    url: '/goods/comments',
    method: 'get',
    params,
  })
}

export function postComment(data) {
  return request({
    url: '/goods/comment/post',
    method: 'post',
    data,
  })
}

export function replyComment(data) {
  return request({
    url: '/goods/comment/reply',
    method: 'post',
    data,
  })
}

export function isGoodsCollected(data) {
  return request({
    url: '/goods/is_collected',
    method: 'post',
    data,
  })
}
