
      /**
      * 【聊天管理】-编辑微信好友个人信息
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41634 {
  /**
   * 用户编号
   */
  userNo: string;
  /**
   * 性别：[1-男;2-女;0-未知]
   */
  sex: number;
  /**
   * 地区
   */
  area: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 备注
   */
  desc: string;
  /**
   * 加好友渠道
   */
  addFriendsChannel: string;
}
    export class IResid41634 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41634, IResid41634['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/user/update',
        data: data
      }) 
    export default http