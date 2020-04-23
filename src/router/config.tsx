
interface IMenus {
  menus: any[]
}

export const headerRouter: IMenus = {
  menus: [
    {
      path: '/facilityMag',
      meta: {
        title: '设备管理',
      },
      children: [
        {
          path: '/facilityMag/weChatMag',
          component: 'weChatMag',
          meta: {
            title: '微信号管理',
          },
        },
        {
          path: '/facilityMag/chatMag',
          component: 'chatMag',
          meta: {
            title: '聊天管理',
          },
        },
        {
          path: '/facilityMag/friendMag',
          component: 'friendMag',
          meta: {
            title: '好友管理',
          },
        },
      ],
    }, 
    {
      path: '/dataStatement',
      component: 'dataStatement',
      meta: {
        title: '数据报表',
      },
    },
    {
      path: '/accountMag',
      level: 3, // 权限三看不到
      meta: {
        title: '子账号管理',
      },
      children: [
        {
          path: '/accountMag/groupMag',
          component: 'groupMag',
          meta: {
            title: '分组管理',
          },
        },
        {
          path: '/accountMag/sonAccountMag',
          component: 'sonAccountMag',
          meta: {
            title: '子账号管理',
          },
        },
      ],
    },
    {
      path: '/setting',
      meta: {
        title: '配置管理',
      },
      children: [
        {
          path: '/setting/globalSetting',
          component: 'globalSetting',
          meta: {
            title: '全局配置',
          },
        },
        {
          path: '/setting/autoReply',
          component: 'autoReply',
          meta: {
            title: '自动回复配置',
          },
        },
        {
          path: '/setting/messMessage',
          component: 'messMessage',
          meta: {
            title: '群发消息配置',
          },
        },
        {
          path: '/setting/massWechat',
          component: 'massWechat',
          meta: {
            title: '群发朋友圈配置',
          },
        },
      ],
    },
    {
      path: '/material',
      meta: {
        title: '素材管理',
      },
      children: [
        {
          path: '/material/news',
          component: 'materialNews',
          meta: {
            title: '消息素材',
          },
        },
        {
          path: '/material/circle',
          component: 'materialCircle',
          meta: {
            title: '朋友圈素材',
          },
        }
      ],
    },
  ]
}

export const asideRouter: IMenus = {
  menus: [
    {
      path: '/sys',
      meta: {
        title: '系统管理',
        icon: 'tags',
      },
      children: [
        {
          path: '/sys/mainMag',
          component: 'mainMag',
          meta: {
            title: '主账号管理',
          },
        },
        {
          path: '/sys/plugMag',
          component: 'plugMag',
          meta: {
            title: '插件管理',
          },
        },
      ],
    },
  ]
}

export const allRouters = {
  menus:[...asideRouter.menus, ...headerRouter.menus]
}

