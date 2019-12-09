import Mock from 'mockjs'

const { Random } = Mock

export default {
  sign_in: {
    code: 2000,
    data: {
      token: 'signIn',
    },
  },

  sign_up: {
    code: 2000,
  },

  info: {
    code: 2000,
    data: {
      user_info: {
        avatar_url: 'https://gitee.com/chinesee/images/raw/master/img/img_012.jpg',
        nickname: '令狐少侠',
        real_name: '陈梓聪',
        school: {
          name: '广州大学华软软件学院',
        },
        phone: '13724540846',
        email: 'czc12580520@gmail.com',
        wechat: 'czc12580520',
        qq: '1559162803',
        gender: '1',
        introduction: '我有一只小毛驴我从来都不骑，有一天我心血来潮骑它去赶集',
        credit_value: 600,
        share_value: 10,
        roles: ['user'],
      },
    },
  },

  info_num: {
    code: 2000,
    data: {
      info_num: {
        fans_num: 24,
        collect_num: 2,
        follow_num: 12,
      },
    },
  },

  user_detail: {
    code: 2000,
    data: {
      user_detail: {
        avatar_url: 'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4',
        user_id: Random.id(),
        'credit_value|200-1000': 500,
        real_name: '陈梓聪',
        nickname: '令狐少侠',
        school: {
          name: '广州大学华软软件学院',
        },
        introduction: '我有一只小毛驴我从来都不骑，有一天我心血来潮骑它去赶集',
        fans_num: 54,
        follow_num: 12,
        collect_num: 2,
      },
    },
  },

  modify: {
    code: 2000,
  },

  // 重置密码
  reset_password: {
    code: 2000,
  },

  // 最近联系人
  recent_contacts: {
    code: 2000,
    data: {
      'recent_contacts|0-10': [
        {
          user_id: () => Random.id(),
          avatar_url: 'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4',
          nickname: () => Random.cname(),
        },
      ],
    },
  },

  // 详细资料
  detail: {
    code: 2000,
    data: {
      detail_info: {
        nickname: '令狐少侠',
        real_name: '陈梓聪',
        phone: '13724540846',
        wechat: 'czc12580520',
        credit_value: 750,
        qq: '1559162803',
        gender: '1',
        school: {
          name: '广州大学华软软件学院',
        },
      },
    },
  },

  // 收货地址
  address_list: {
    code: 2000,
    data: {
      default_address: 0,
      address_list: [
        {
          address_id: () => Random.id(),
          receiver: '陈梓聪',
          phone: '13724540846',
          address: '广东省东莞市厚街镇桥头南丰苑',
          'type|1': ['学校', '家庭', '公司'],
        },
        {
          address_id: () => Random.id(),
          receiver: '曾通',
          phone: '13650022398',
          address: '广东省佛山市陶瓷镇海南',
          'type|1': ['学校', '家庭', '公司'],
        },
      ],
    },
  },

  default_address: {
    code: 2000,
  },

  add_address: {
    code: 2000,
    data: {
      address_id: () => Random.id(),
    },
  },

  delete_address: {
    code: 2000,
  },

  update_address: {
    code: 2000,
  },

  subscribe: {
    code: 2000,
  },

  unsubscribe: {
    code: 2000,
  },

  published_goods: {
    code: 2000,
    data: {
      published_goods: [
        {
          goods_id: Random.id(),
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_002.png'],
          name: '一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰 4800万超广角三摄 6GB+128GB 曜岩灰 全面屏拍照游戏手机',
          price: '22.50',
          time: 1563552000,
          status: 0,
        },
        {
          goods_id: Random.id(),
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_002.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦 运动跑步迷你隐形超小双耳入耳式 苹果/安卓手机通用 黑色',
          price: '52.50',
          time: 1568908800,
          status: 1,
        },
        {
          goods_id: Random.id(),
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_001.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦',
          price: '52.50',
          time: 1570377600,
          status: 1,
        },
        {
          goods_id: Random.id(),
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_001.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦 运动跑步迷你隐形超小双耳入耳式 苹果/安卓手机通用 黑色',
          price: '52.50',
          time: 1568908700,
          status: 0,
        },
      ],
    },
  },

  purchased_goods: {
    code: 2000,
    data: {
      purchased_goods: [
        {
          goods_id: Random.id(),
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_003.png'],
          name: '一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰 4800万超广角三摄 6GB+128GB 曜岩灰 全面屏拍照游戏手机',
          price: '22.50',
          time: 1563552000,
          status: 0,
        },
      ],
    },
  },
}
