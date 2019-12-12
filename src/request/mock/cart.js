import Mock from 'mockjs'

const { Random } = Mock

export default {
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
