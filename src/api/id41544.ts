
      /**
      * 【子账号管理】-子账号禁用接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41544 {
  /**
   * 用户编号
   */
  systemUserId: string;
  status: number;
}
    export class IResid41544 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41544, IResid41544['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/systemUser/disableSub',
        data: data
      }) 
    export default http