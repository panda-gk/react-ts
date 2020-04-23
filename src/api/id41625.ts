
      /**
      * 【聊天管理】-微信好友个人信息
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41625 {
  /**
   * 好友编号
   */
  userNo: string | number;
}
    export class IResid41625 {
  code: number;
  msg: string;
  success: boolean;
  data: {
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 头像
     */
    headImg: string;
    /**
     * 用户微信号
     */
    userWxNo: string;
    /**
     * 性别：[1-男;2-女;0-未知]
     */
    sex: 1 | 2 | 0;
    /**
     * 地区
     */
    area: string;
    /**
     * 手机号码
     */
    phone: string;
    /**
     * 加好友时间
     */
    makeFriendsTime: string;
    /**
     * 添加好友类型  0:未知 1:粉丝加我们 2:我们主动加粉丝
     */
    addFriendType: 0 | 1 | 2;
    /**
     * 最后对话时间
     */
    lastChatTime: string;
    /**
     * 备注
     */
    desc: string;
    /**
     * 加好友渠道
     */
    addFriendsChannel: string;
  };
}
    const http: Serve<IReqid41625, IResid41625['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/user/info',
        params: data
      }) 
    export default http