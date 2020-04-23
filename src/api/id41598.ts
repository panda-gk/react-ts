
      /**
      * 【微信号管理】-微信号禁用接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41598 {
  /**
   * 设备编号
   */
  storeNo: string;
  /**
   * 状态：[1-正常，0-不可用]
   */
  status: number;
}
    export class IResid41598 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41598, IResid41598['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/store/disable',
        data: data
      }) 
    export default http