
      /**
      * 【 群发消息配置】-查询操作明细
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid44001 {
  /**
   * 业务类型 2.群发消息 3.朋友圈
   */
  businessType: string | number;
  /**
   * 业务编号
   */
  businessCode: string | number;
}
    export class IResid44001 {
  data: {
    operateDesc: string;
    operateNo: string;
    operateTime: string;
  }[];
  code: string;
  msg: string;
}
    const http: Serve<IReqid44001, IResid44001['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/mass/detailList',
        params: data
      }) 
    export default http