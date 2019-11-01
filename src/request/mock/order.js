import Mock from 'mockjs'

const { Random } = Mock

export default {
  order_list: {
    code: 2000,
    data: {
      'order_list|10-11': [
        {
          order_id: () => Random.id(),
          total: () => Random.float(0, 100, 2, 2),
          time: () => Random.date(),
          buyer_name: () => Random.cname(),
          status: () => Random.integer(0, 2),
        },
      ],
    },
  },

  detail: {
    code: 2000,
    data: {
      detail: {
        order_id: Random.id(),
        total: Random.float(0, 100, 2, 2),
        time: Random.date(),
        create_time: Random.now('yyyy-MM-dd hh:mm:ss'),
        'status|0-2': 0,
        delivery_method: '包邮',
        address: Random.county(true),
        note: Random.csentence(0, 20),
        payment: '微信支付',
        user: {
          user_id: Random.id(),
          name: Random.cname(),
          school: Random.county(true),
          phone: Random.string('number', 11),
        },
        'goods|1-3': [
          {
            goods_id: () => Random.id(),
            img_urls: [Random.image('480x300'), Random.image('500x300')],
            name: () => Random.cword(10, 35),
            price: () => Random.float(0, 100, 2, 2),
          },
        ],
      },
    },
  },
}
