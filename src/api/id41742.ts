
      /**
      * 【好友管理】-今日汇总数据
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41742 {
  /**
   * 子账号用户昵称
   */
  subUserName: string | number;
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
}
    export class IResid41742 {
  code: number;
  msg: string;
  success: boolean;
  data: {
    /**
     * 好友数
     */
    userNum: number;
    /**
     * 活跃好友数
     */
    activeUserNum: number;
    /**
     * 消息数
     */
    msgNum: number;
    /**
     * 总好友数
     */
    totalUserNum: number;
  };
}
    const http: Serve<IReqid41742, IResid41742['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/dailyStatistic/summary',
        params: data
      }) 
    export default http