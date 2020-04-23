
      /**
      * 【微信号管理】-新增页面查询主账号列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41760 {}
    export class IResid41760 {
  success: boolean;
  code: number;
  msg: string;
  data: {
    /**
     * 主账号用户名称
     */
    mainUserName: string;
    /**
     * 主账号手机号码
     */
    mainTelephone: string;
    /**
     * 主账号userId
     */
    mainSystemUserId: string;
  }[];
}
    const http: Serve<IReqid41760, IResid41760['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemUser/mainAccountList',
        params: data
      }) 
    export default http