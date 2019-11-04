import Mock from 'mockjs'

const { Random } = Mock

export default {
  login: {
    code: 2000,
    data: {
      token: 'login',
    },
  },

  register: {
    code: 2000,
    data: {
      token: 'login',
    },
  },

  userInfo: {
    code: 2000,
    data: {
      nickname: '令狐少侠',
      real_name: '陈梓聪',
      school: '广州大学华软软件学院',
      roles: ['super_admin'],
    },
  },

  user_list: {
    code: 2000,
    data: {
      'user_list|15-20': [
        {
          user_id: () => Random.id(),
          avatar_url: 'https://randomuser.me/api/portraits/women/0.jpg',
          nickname: () => Random.cname(),
          'credit_value|200-1000': 500,
          share_value: () => Random.integer(60, 200),
          time: () => Random.date('yyyy-MM-dd hh:mm'),
        },
      ],
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
      },
    },
  },

  // 重置密码
  reset_password: {
    code: 2000,
    msg: '成功重置密码',
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
  detail_info: {
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

  modify_address: {
    code: 2000,
  },

  contact_list: {
    code: 2000,
    data: {
      contact_list: [
        {
          id: '2',
          nickname: '令狐少侠',
          avatar_url: 'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4',
        },
      ],
    },
  },
}
