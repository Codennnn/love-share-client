import Mock from 'mockjs'
import user from './user'
import notice from './notice'
import goods from './goods'
import order from './order'
import buying from './buying'
import service from './service'
import common from './common'

// 用户
Mock.mock('/api/user/sign_in', 'post', user.sign_in)
Mock.mock('/api/user/sign_up', 'post', user.sign_up)
Mock.mock('/api/user/info', 'get', user.info)
Mock.mock('/api/user/detail', 'get', user.user_detail)
Mock.mock('/api/user/reset_password', 'put', user.reset_password)
Mock.mock('/api/user/recent_contacts', 'get', user.recent_contacts)
Mock.mock('/api/user/detail_info', 'get', user.detail_info)
Mock.mock('/api/user/address_list', 'get', user.address_list)
Mock.mock('/api/user/default_address', 'post', user.default_address)
Mock.mock('/api/user/address/add', 'post', user.add_address)
Mock.mock('/api/user/address/delete', 'delete', user.delete_address)
Mock.mock('/api/user/address/update', 'put', user.modify_address)
Mock.mock('/api/user/contact_list', 'get', user.contact_list)
Mock.mock('/api/user/subscribe', 'post', user.subscribe)
Mock.mock('/api/user/unsubscribe', 'post', user.unsubscribe)

// 通知
Mock.mock(/\/notices/, 'get', notice.notices)

// 商品
Mock.mock('/api/goods/stored', 'get', goods.stored_goods)
Mock.mock('/api/goods/dismounted', 'get', goods.dismounted_goods)
Mock.mock('/api/goods/list_info', 'get', goods.list_info)
Mock.mock('/api/goods/published', 'get', goods.published)
Mock.mock('/api/goods/bought', 'get', goods.bought)
Mock.mock('/api/goods/detail', 'get', goods.goods_detail)
Mock.mock('/api/goods/delete', 'delete', goods.delete)
Mock.mock('/api/goods/collect', 'post', goods.collect)
Mock.mock('/api/goods/uncollect', 'delete', goods.uncollect)
Mock.mock('/api/goods/dismount', 'post', goods.dismount)
Mock.mock('/api/goods/cancel_dismount', 'post', goods.cancel_dismount)
Mock.mock('/api/goods/cart_list', 'get', goods.cart_list)
Mock.mock('/api/goods/cart_item/add', 'post', goods.add_cart_item)
Mock.mock('/api/goods/cart_item/remove', 'delete', goods.remove_cart_item)

// 订单
Mock.mock('/api/order/detail', 'get', order.detail)
Mock.mock('/api/order/order_transaction_amount', 'get', order.order_transaction_amount)
Mock.mock('/api/order/order_volume', 'get', order.order_volume)
Mock.mock('/api/order/order_num', 'get', order.order_num)

// 求购
Mock.mock('/api/buying/list', 'get', buying.buying_list)
Mock.mock('/api/buying/add', 'post', buying.add_buying)
Mock.mock('/api/buying/delete', 'delete', buying.delete_buying)
Mock.mock('/api/buying/update', 'put', buying.update_buying)

// 分类
Mock.mock('/api/category/list', 'get', common.category_list)

// 学校
Mock.mock('/api/school/list', 'get', common.school_list)

// 通用
Mock.mock('/api/common/check_phone_number', 'post', common.check_phone_number)
Mock.mock('/api/common/verification_code', 'post', common.verification_code)

Mock.mock(/\/article/, 'get', service.article)

Mock.setup({ timeout: '500-600' })
