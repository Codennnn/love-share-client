import Mock from 'mockjs'

const { Random } = Mock

export default {
  buying_list: {
    code: 2000,
    data: {
      count: 290870,
      count2: 1480,
      'buying_list|15-20': [
        {
          goods_id: () => Random.id(),
          name: () => Random.cword(10, 35),
          category: [
            '电子数码',
          ],
          price: () => Random.float(0, 100, 2, 2),
          time: () => Random.date('yyyy-MM-dd hh:mm'),
        },
      ],
    },
  },
}
