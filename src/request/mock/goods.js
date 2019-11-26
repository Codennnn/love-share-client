import Mock from 'mockjs'

const { Random } = Mock

export default {
  stored_goods: {
    code: 2000,
    data: {
      'total|25-50': 30,
      'goods_list|15': [
        {
          goods_id: () => Random.id(),
          img_list: ['https://cdn-demo.algolia.com/bestbuy-0118/4397400_sb.jpg'],
          'quantity|1-4': 1,
          category: [
            '电子数码',
          ],
          name: () => Random.cword(10, 35),
          price: () => Random.float(0, 100, 2, 2),
          'collect_num|1-10': 4,
          'is_collected|1-2': true,
          time: () => Random.date('yyyy-MM-dd hh:mm'),
          seller_info: {
            user_id: Random.id(),
            avatar_url: 'https://cdn-demo.algolia.com/bestbuy-0118/4397400_sb.jpg',
            nickname: Random.cword(2, 7),
            real_name: () => Random.cname(),
          },
        },
      ],
      pagination: {
        total: 30,
      },
    },
  },

  dismounted_goods: {
    code: 2000,
    data: {
      'goods|5-20': [
        {
          'id|+1': 1,
          avatar_url: 'https://randomuser.me/api/portraits/women/0.jpg',
          quantity: 1,
          category: [
            '电子数码',
          ],
          name: () => Random.cword(10, 35),
          price: () => Random.float(0, 100, 2, 2),
          goods_id: () => Random.id(),
          time: () => Random.date('yyyy-MM-dd hh:mm'),
          seller_info: {
            user_id: Random.id(),
            avatar_url: 'https://cdn-demo.algolia.com/bestbuy-0118/4397400_sb.jpg',
            nickname: Random.cword(2, 7),
            real_name: () => Random.cname(),
          },
        },
      ],
    },
  },

  list_info: {
    code: 2000,
    data: {
      stored_count: 290870,
      dismounted_count: 1480,
    },
  },

  goods_detail: {
    code: 2000,
    data: {
      goods_detail: {
        goods_id: () => Random.id(),
        'img_list|4': [Random.image('480x300')],
        name: Random.cword(10, 35),
        description: '123<br />123',
        price: Random.float(0, 100, 2, 2),
        original_price: Random.float(0, 100, 2, 2),
        quantity: 2,
        category: ['图书书籍', '电子数码'],
        delivery: '1',
        delivery_charge: 0,
        bargain: '1',
        returnable: true,
        'is_collected|1-2': true,
        time: Random.date(),
      },
      seller_info: {
        user_id: Random.id(),
        nickname: Random.cword(2, 7),
        gender: 1,
        if_follow: true,
        published_num: 2,
        follower_num: 15,
        school: '广州大学华软软件学院',
      },
    },
  },

  delete: {
    code: 2000,
  },

  collect: {
    code: 2000,
  },

  uncollect: {
    code: 2000,
  },

  dismount: {
    code: 2000,
  },

  cancel_dismount: {
    code: 2000,
  },

  cart_list: {
    code: 2000,
    data: {
      'cart_list|2-4': [
        {
          goods_id: () => Random.id(),
          img_list: ['https://cdn-demo.algolia.com/bestbuy-0118/4397400_sb.jpg'],
          'goods_num|1-4': 1,
          name: () => Random.cword(10, 35),
          nickname: () => Random.cword(2, 7),
          real_name: () => Random.cname(),
          'quantity|1-2': 1,
          amount: 1,
          'delivery|1-3': 1,
          'delivery_charge|0-5': 0,
          price: () => Random.float(0, 100, 2, 2),
          'collect_num|1-10': 4,
          'is_collected|1-2': true,
          time: () => Random.date('yyyy-MM-dd hh:mm'),
        },
      ],
    },
  },

  add_cart_item: {
    code: 2000,
  },

  remove_cart_item: {
    code: 2000,
  },
}
