
      /**
      * 【好友管理】-查询好友列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41715 {
  /**
   * 客户微信号
   */
  userWxNo: string | number;
  /**
   * 归属微信号
   */
  storeWxNo: string | number;
  /**
   * 归属子账号
   */
  subUserName: string | number;
  /**
   * 分组名称
   */
  bizName: string | number;
  page: string | number;
  rows: string | number;
}
    export class IResid41715 {
  data: {
    records: {
      /**
       * 客户微信号
       */
      userWxNo: string;
      /**
       * 客户昵称
       */
      userWxNickName: string;
      /**
       * 客户手机号码
       */
      userPhone: string;
      /**
       * 设备微信号
       */
      storeWxNo: string;
      /**
       * 归属设备用户昵称
       */
      storeUserName: string;
      /**
       * 归属设备手机号码
       */
      storeTelephone: string;
      /**
       * 归属设备微信号昵称
       */
      wxNickName: string;
      /**
       * 性别：[1-男;2-女;0-未知]
       */
      sex: 0 | 1 | 2;
      /**
       * 地区
       */
      area: string;
      /**
       * 交友时间
       */
      makeFriendsTime: string;
      /**
       * 添加好友类型  0:未知 1:粉丝加我们 2:我们主动加粉丝
       */
      addFriendType: 0 | 1 | 2;
      /**
       * 备注
       */
      desc: string;
      /**
       * 最后对话时间
       */
      lastChatTime: string;
      /**
       * 加好友渠道
       */
      addFriendsChannel: string;
      /**
       * 标签列表
       */
      tagList: {
        /**
         * 标签编号
         */
        tagNo: string;
        /**
         * 标签名称
         */
        tagName: string;
      }[];
    }[];
    total: number;
  };
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41715, IResid41715['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/user/page',
        params: data
      }) 
    export default http