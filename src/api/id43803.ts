
      /**
      * 【群发消息配置】-禁用或启用
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43803 {
  /**
   * 编号
   */
  massNo: string;
  massEnable: number;
}
    export class IResid43803 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43803, IResid43803['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/mass/enable',
        data: data
      }) 
    export default http