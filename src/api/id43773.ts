
      /**
      * 【自动回复配置】-禁用或启用
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43773 {
  /**
   * 规则编号
   */
  replyNo: string;
  /**
   * 禁用状态，1-启用，0-禁用
   */
  replyEnable: number;
}
    export class IResid43773 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43773, IResid43773['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/reply/enable',
        data: data
      }) 
    export default http