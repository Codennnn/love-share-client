import Mock from 'mockjs'

const { Random } = Mock

export default {
  buying_list: {
    code: 2000,
    data: {
      count: 290870,
      count2: 1480,
      'buying_list|15-30': [
        {
          'id|+1': 1,
          avatar_url: 'https://randomuser.me/api/portraits/women/0.jpg',
          name: () => Random.cword(10, 35),
          nickname: () => Random.cword(2, 7),
          'category|1': ['电子数码', '宿舍电器', '日常用品', '图书书籍', '服饰鞋包'],
          price: () => Random.float(0, 100, 2, 2),
          goods_id: () => Random.id(),
          time: () => Random.date('yyyy-MM-dd hh:mm'),
        },
      ],
    },
  },
}
