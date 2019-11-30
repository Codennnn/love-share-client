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
        school: '广州大学华软软件学院',
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
        school: '广州大学华软软件学院',
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
        school: '广州大学华软软件学院',
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

  contact_list: {
    code: 2000,
    data: {
      contact_list: [
        {
          id: '1',
          nickname: '蜘蛛侠',
          avatar_url: 'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4',
        },
        {
          id: '2',
          nickname: '令狐少侠',
          avatar_url: 'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4',
        },
      ],
    },
  },

  chat_data: {
    code: 2000,
    data: {
      chat_data: {
        1: {
          isPinned: false,
          msg: [
            {
              text_content: '我们能帮你什么吗？我们在这里为您服务！',
              time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: true,
            },
            {
              text_content: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?Hey John, I am looking for the best admin template. Could you please help me to find it out?Hey John, I am looking for the best admin template. Could you please help me to find it out?Hey John, I am looking for the best admin template. Could you please help me to find it out?',
              time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'It should be Bootstrap 4 compatible.',
              time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'Absolutely!',
              time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: true,
            },
            {
              text_content: 'Modern admin is the responsive bootstrap 4 admin template.!',
              time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: true,
            },
            {
              text_content: 'Looks clean and fresh UI.',
              time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'It\'s perfect for my next project.',
              time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'How can I purchase it?',
              time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'Thanks, from ThemeForest.',
              time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: true,
            },
            {
              text_content: 'I will purchase it for sure.',
              time: 'Mon Dec 10 2018 07:47:00 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'Thanks',
              time: 'Mon Dec 10 2018 07:47:05 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: false,
            },
          ],
        },
        2: {
          isPinned: true,
          msg: [
            {
              text_content: 'Hi',
              time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: true,
            },
            {
              text_content: 'Hello. How can I help You?',
              time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'Can I get details of my last transaction I made last month?',
              time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: true,
            },
            {
              text_content: 'We need to check if we can provide you such information.',
              time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'I will inform you as I get update on this.',
              time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
              is_sent: false,
              is_seen: true,
            },
            {
              text_content: 'Thank You',
              time: 'Mon Dec 11 2018 07:46:20 GMT+0000 (GMT)',
              is_sent: true,
              is_seen: false,
            },
          ],
        },
      },
    },
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
