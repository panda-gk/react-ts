
      /**
      * 【登录页面】-用户信息
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41688 {}
    export class IResid41688 {
  msg: string;
  code: number;
  data: {
    /**
     * 用户名称
     */
    userName: string;
    /**
     * 手机号码
     */
    telephone: string;
    /**
     * 账号类型:1-admin,2-主账号,3-子账号
     */
    level: number;
    /**
     * 账号id
     */
    systemUserId: string;
    /**
     * 账号类型:0-不是组长，1-组长
     */
    leader: number;
  };
}
    const http: Serve<IReqid41688, IResid41688['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemUser/info',
        params: data
      }) 
    export default http