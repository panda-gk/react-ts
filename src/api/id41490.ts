
      /**
      * 【主账号管理】-主账号禁用接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41490 {
  /**
   * 用户id
   */
  systemUserId: string;
  /**
   * 状态：1-启用,0-禁用
   */
  status: string;
}
    export class IResid41490 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41490, IResid41490['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/systemUser/disable',
        data: data
      }) 
    export default http