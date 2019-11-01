import Mock from 'mockjs'
import user from './user'
import notice from './notice'
import goods from './goods'
import order from './order'
import buying from './buying'
import service from './service'
import common from './common'

// 用户
Mock.mock(/\/login/, 'post', user.login)
Mock.mock(/\/register/, 'post', user.register)
Mock.mock(/\/user_info/, 'get', user.userInfo)
Mock.mock(/\/user_list/, 'get', user.user_list)
Mock.mock(/\/user_detail/, 'get', user.user_detail)
Mock.mock(/\/reset_password/, 'put', user.reset_password)
Mock.mock(/\/recent_contacts/, 'get', user.recent_contacts)
Mock.mock(/\/detail_info/, 'get', user.detail_info)
Mock.mock(/\/shipping_address/, 'get', user.shipping_address)
Mock.mock(/\/default_address/, 'put', user.default_address)
Mock.mock(/\/address/, 'post', user.add_address)
Mock.mock(/\/address/, 'delete', user.delete_address)

// 通知
Mock.mock(/\/notices/, 'get', notice.notices)

// 商品
Mock.mock(/\/published/, 'get', goods.published)
Mock.mock(/\/bought/, 'get', goods.bought)
Mock.mock(/\/goods_detail/, 'get', goods.goods_detail)
Mock.mock(/\/goods_category/, 'get', goods.category)
Mock.mock(/\/goods/, 'get', goods.goods)

// 订单
Mock.mock(/\/orders/, 'get', order.orders)
Mock.mock(/\/order_detail/, 'get', order.detail)

// 求购
Mock.mock('/api/buying/list', 'get', buying.buying_list)
Mock.mock('/api/buying/add', 'post', buying.add_buying)
Mock.mock('/api/buying/delete', 'delete', buying.delete_buying)
Mock.mock('/api/buying/update', 'put', buying.update_buying)

Mock.mock(/\/schools/, 'get', common.schools)

Mock.mock(/\/article/, 'get', service.article)

Mock.setup({ timeout: '500-600' })
