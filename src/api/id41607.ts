
      /**
      * 【聊天管理】-微信联系人查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41607 {
  /**
   * 设备编号
   */
  storeNo: string | number;
  /**
   * 消息类型 1:私聊消息 2:群聊消息
   */
  msgType: string | number;
  /**
   * 查询关键词
   */
  queryKey: string | number;
  rows: string | number;
  page: string | number;
}
    export class IResid41607 {
  data: {
    total: number;
    records: {
      /**
       * 好友昵称/群名称
       */
      nickName: string;
      /**
       * 好友头像/群头像
       */
      headImg: string;
      /**
       * 好友微信号/群微信号
       */
      userWxNo: string;
      /**
       * 用户编号/群编号
       */
      userNo: string;
      /**
       * 群成员数量
       */
      memberNum: number;
    }[];
  };
  success: boolean;
  code: number;
  msg: string;
}
    const http: Serve<IReqid41607, IResid41607['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/msg/friendList',
        params: data
      }) 
    export default http