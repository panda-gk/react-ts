
      /**
      * 【子账号管理】-子账号新增修改接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41535 {
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
   * 父级id
   */
  parentId: string;
  /**
   * 分组编号
   */
  bizNo: string;
  /**
   * 状态:0-禁用,1-正常
   */
  status: number;
  /**
   * userId
   */
  systemUserId: string;
}
    export class IResid41535 {
  code: string;
  msg: string;
  success: string;
}
    const http: Serve<IReqid41535, IResid41535['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/systemUser/saveOrUpdateSub',
        data: data
      }) 
    export default http