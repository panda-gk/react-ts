
      /**
      * 【主账号管理】-主账号新增/修改接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41481 {
  /**
   * 主账号昵称
   */
  userName: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 手机号码
   */
  telephone: string;
  /**
   * 备注
   */
  desc: string;
  /**
   * 状态:0-禁用,1-正常
   */
  status: number;
  /**
   * userId
   */
  systemUserId: string;
}
    export class IResid41481 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41481, IResid41481['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/systemUser/saveOrUpdate',
        data: data
      }) 
    export default http