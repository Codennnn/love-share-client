import Mock from 'mockjs'

const { Random } = Mock

export default {
  goods: {
    code: 2000,
    data: {
      count: 290870,
      count2: 1480,
      'goods|15-30': [
        {
          'id|+1': 1,
          avatar_url: 'https://randomuser.me/api/portraits/women/0.jpg',
          goods_num: 1,
          name: () => Random.cword(10, 35),
          nickname: () => Random.cword(2, 7),
          real_name: () => Random.cname(),
          price: () => Random.float(0, 100, 2, 2),
          goods_id: () => Random.id(),
          time: () => Random.date('yyyy-MM-dd hh:mm'),
        },
      ],
    },
  },

  detail: {
    code: 2000,
    data: {
      detail: {
        'imgs|4': [Random.image('480x300')],
        name: Random.cword(10, 35),
        desc: '123<br />123',
        nickname: Random.cword(2, 7),
        price: Random.float(0, 100, 2, 2),
        time: Random.date(),
      },
    },
  },

  published: {
    code: 2000,
    data: {
      goods: [
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_002.png'],
          name: '一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰 4800万超广角三摄 6GB+128GB 曜岩灰 全面屏拍照游戏手机',
          price: '22.50',
          time: 1563552000,
          status: 0,
        },
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_002.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦 运动跑步迷你隐形超小双耳入耳式 苹果/安卓手机通用 黑色',
          price: '52.50',
          time: 1568908800,
          status: 1,
        },
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_001.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦',
          price: '52.50',
          time: 1570377600,
          status: 1,
        },
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_001.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦 运动跑步迷你隐形超小双耳入耳式 苹果/安卓手机通用 黑色',
          price: '52.50',
          time: 1568908700,
          status: 0,
        },
      ],
    },
  },

  bought: {
    code: 2000,
    data: {
      goods: [
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_003.png'],
          name: '一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰 4800万超广角三摄 6GB+128GB 曜岩灰 全面屏拍照游戏手机',
          price: '22.50',
          time: 1563552000,
          status: 0,
        },
      ],
    },
  },

  category: {
    code: 2000,
    data: {
      category_list: [
        { value: '电子数码', label: '电子数码' },
        { value: '宿舍电器', label: '宿舍电器' },
        { value: '日常用品', label: '日常用品' },
        { value: '图书书籍', label: '图书书籍' },
        { value: '服饰鞋包', label: '服饰鞋包' },
      ],
    },
  },
}
