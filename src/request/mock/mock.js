import Mock from 'mockjs'
import user from './user'
import notice from './notice'
import goods from './goods'
import order from './order'
import buying from './buying'
import service from './service'
import common from './common'

Mock.mock(/\/login/, 'post', user.login)

Mock.mock(/\/register/, 'post', user.register)

Mock.mock(/\/user_info/, 'get', user.userInfo)

Mock.mock(/\/user_list/, 'get', user.user_list)

Mock.mock(/\/user_detail/, 'get', user.user_detail)

Mock.mock(/\/reset_password/, 'put', user.reset_password)

Mock.mock(/\/recent_contacts/, 'get', user.recent_contacts)

Mock.mock(/\/detail_info/, 'get', user.detail_info)

Mock.mock(/\/user[\s\S]*?/, 'get', () => ({
  data: 1234,
}))

Mock.mock(/\/notices/, 'get', notice.notices)

Mock.mock(/\/published/, 'get', goods.published)

Mock.mock(/\/bought/, 'get', goods.bought)

Mock.mock(/\/goods_detail/, 'get', goods.detail)

Mock.mock(/\/goods_category/, 'get', goods.category)

Mock.mock(/\/goods/, 'get', goods.goods)

Mock.mock(/\/orders/, 'get', order.orders)

Mock.mock(/\/order_detail/, 'get', order.detail)

Mock.mock(/\/buying_list/, 'get', buying.buying_list)

Mock.mock(/\/schools/, 'get', common.schools)

Mock.mock(/\/article/, 'get', service.article)

Mock.setup({ timeout: '500-600' })
