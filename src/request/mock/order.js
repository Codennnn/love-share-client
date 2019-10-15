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
}
