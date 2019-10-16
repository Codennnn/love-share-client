import Mock from 'mockjs'

const { Random } = Mock

export default {
  orders: {
    code: 2000,
    data: {
      'orders|10-11': [
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
        buyer_name: Random.cname(),
        phone: Random.string('number', 11),
        status: Random.integer(0, 2),
        address: Random.county(true),
        note: Random.csentence(0, 20),
        payment: '微信支付',
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
