
      /**
      * 【微信号管理】-微信号新增/编辑接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41589 {
  /**
   * 设备微信号
   */
  storeWxId: string;
  /**
   * 子账号userId
   */
  systemUserId: string;
  /**
   * 主键
   */
  id: string;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string;
  /**
   * 通过好友请求类型，1-自动，2-手动
   */
  autoAddUserSwitch: number;
}
    export class IResid41589 {
  msg: string;
  code: number;
  success: boolean;
}
    const http: Serve<IReqid41589, IResid41589['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/store/addOrUpdate',
        data: data
      }) 
    export default http