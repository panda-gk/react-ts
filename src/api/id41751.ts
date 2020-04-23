
      /**
      * 【微信号管理】-新增页面查询子账号列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41751 {
  /**
   * 主账号userId
   */
  systemUserId: string | number;
}
    export class IResid41751 {
  success: boolean;
  code: number;
  msg: string;
  data: {
    /**
     * 子账号用户名称
     */
    subUserName: string;
    /**
     * 子账号手机号码
     */
    subTelephone: string;
    /**
     * 子账号用户id
     */
    subSystemUserId: string;
    /**
     * 父级账号用户id
     */
    parentId: string;
  }[];
}
    const http: Serve<IReqid41751, IResid41751['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemUser/subAccountList',
        params: data
      }) 
    export default http