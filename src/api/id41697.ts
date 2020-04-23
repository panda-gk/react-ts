
      /**
      * 【登录页面】-修改密码
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41697 {
  /**
   * 手机号
   */
  telephone: string;
  /**
   * 新密码
   */
  newPwd: string;
}
    export class IResid41697 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41697, IResid41697['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/systemUser/alterPwd',
        data: data
      }) 
    export default http