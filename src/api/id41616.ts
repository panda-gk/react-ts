
      /**
      * 【聊天管理】-微信聊天记录查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41616 {
  /**
   * 设备编号
   */
  storeNo: string | number;
  /**
   * 好友编号
   */
  userNo: string | number;
  /**
   * 查询类型 1:好友聊天记录 2:群聊天记录
   */
  queryType: string | number;
  /**
   * 消息类型 1:文本 3: 图片  43:视频 34:语音 10000:系统 37:好友验证
   */
  msgType: string | number;
  /**
   * 页码
   */
  page: string | number;
  /**
   * 条数
   */
  rows: string | number;
}
    export class IResid41616 {
  data: {
    total: number;
    records: {
      /**
       * 头像
       */
      headImg: string;
      /**
       * 用户昵称
       */
      nickName: string;
      /**
       * 发送者用户类型:1-客服 2-客户
       */
      senderType: 1 | 2;
      /**
       * 发送时间
       */
      sendTime: string;
      /**
       * 消息类型 1:文本 3: 图片  43:视频 34:语音 10000:系统 37:好友验证
       */
      msgType: '1' | '43' | '3' | '34' | '1000' | '37';
      /**
       * 消息内容
       */
      msgContent: string;
      /**
       * 消息编号
       */
      msgNo: string;
    }[];
  };
  msg: string;
  code: number;
}
    const http: Serve<IReqid41616, IResid41616['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/msg/list',
        params: data
      }) 
    export default http