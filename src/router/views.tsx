import * as Loadable from 'react-loadable'
import Loading from './../components/PageLoading'

const LoadableComponent: any = (loader: any, loading: any = Loading) => Loadable({
  loader,
  loading,
})


// 账号管理
// 账号管理-分组管理
export const groupMag = LoadableComponent(() => import('./../views/account/groupMag'))
// 账号管理-子账号管理
export const sonAccountMag = LoadableComponent(() => import('./../views/account/sonAccountMag'))
// 设备管理-微信号管理
export const weChatMag = LoadableComponent(() => import('./../views/facility/weChatMag'))
// 设备管理-聊天管理
export const chatMag = LoadableComponent(() => import('./../views/facility/chatMag'))
// 设备管理-好友管理
export const friendMag = LoadableComponent(() => import('./../views/facility/friendMag'))

// 系统管理管理-主账号管理
export const mainMag = LoadableComponent(() => import('./../views/system/mainMag'))
// 系统管理管理-插件管理
export const plugMag = LoadableComponent(() => import('./../views/system/plugMag'))
// 数据报表
export const dataStatement = LoadableComponent(() => import('./../views/statement/dataStatement'))
//配置管理- 全局设置
export const globalSetting = LoadableComponent(() => import('@views/setting/globalSetting'))
// 配置管理- 自动回复
export const autoReply = LoadableComponent(() => import('@views/setting/autoReply'))
// 配置管理- 群发消息配置
export const messMessage = LoadableComponent(() => import('@views/setting/messMessage'))
// 配置管理- 群发朋友圈配置
export const massWechat = LoadableComponent(() => import('@views/setting/massWechat'))
// 素材管理-消息素材
export const materialNews = LoadableComponent(() => import('@views/material/news'))
// 素材管理-朋友圈素材
export const materialCircle = LoadableComponent(() => import('@views/material/circle'))





