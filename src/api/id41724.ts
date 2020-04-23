
      /**
      * 【好友报表】-好友报表汇总列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41724 {
  /**
   * 子账号用户昵称
   */
  userName: string | number;
  /**
   * 微信号
   */
  storeWxNo: string | number;
  /**
   * 分组名称
   */
  bizName: string | number;
  /**
   * 主账号昵称
   */
  mainUserName: string | number;
  /**
   * 查询开始时间
   */
  queryStartTime: string | number;
  /**
   * 查询结束时间
   */
  queryEndTime: string | number;
  page: string | number;
  rows: string | number;
}
    export class IResid41724 {
  data: {
    records: {
      /**
       * 时间
       */
      calTime: string;
      /**
       * 微信号
       */
      storeWxNo: string;
      /**
       * 头像
       */
      headImg: string;
      /**
       * 昵称
       */
      nickName: string;
      /**
       * 子账号昵称
       */
      subUserName: string;
      /**
       * 子账号手机号码
       */
      subTelephone: string;
      /**
       * 新增好友数
       */
      userNum: number;
      /**
       * 总好友数
       */
      totalUserNum: number;
      /**
       * 活跃好友数
       */
      activeUserNum: number;
      /**
       * 消息数
       */
      msgNum: number;
      /**
       * 分组
       */
      bizName: string;
      /**
       * 归属主账号
       */
      mainUserName: string;
      /**
       * 主账号手机号
       */
      mainTelephone: string;
      /**
       * 掉粉数
       */
      brokeUserNum: number;
    }[];
    total: number;
    extObject: {
      /**
       * 新增好友数
       */
      addUserNum: number;
      /**
       * 掉粉数
       */
      brokeUserNum: number;
      /**
       * 消息数
       */
      msgNum: number;
      /**
       * 归属子账号数
       */
      subUserNum: number;
      /**
       * 总好友数
       */
      totalUserNum: number;
      /**
       * 微信号
       */
      wxNum: number;
    };
  };
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41724, IResid41724['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/dailyStatistic/list',
        params: data
      }) 
    export default http