
      /**
      * 【聊天管理】-查询微信号列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid42084 {
  /**
   * 关键词
   */
  queryKey: string | number;
}
    export class IResid42084 {
  data: {
    records: {
      /**
       * 设备编号
       */
      storeNo: string;
      /**
       * 微信昵称
       */
      storeWxNickName: string;
      /**
       * 微信号
       */
      storeWxNo: string;
      /**
       * 头像
       */
      profilePhotoUrl: string;
      /**
       * 未读消息数量
       */
      msgNum: number;
    }[];
    total: number;
  };
  code: string;
  msg: string;
  success: string;
}
    const http: Serve<IReqid42084, IResid42084['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/msg/getWxList',
        params: data
      }) 
    export default http