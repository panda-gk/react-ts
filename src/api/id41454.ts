
      /**
      * 【登录页面】-登录接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41454 {
  /**
   * 用户名
   */
  userName: string | number;
  /**
   * 密码
   */
  password: string | number;
}
    export class IResid41454 {
  /**
   * 返回信息
   */
  message: string;
  /**
   * 返回状态
   */
  success: boolean;
  /**
   * 状态码
   */
  code: number;
  /**
   * 数据
   */
  data: {
    /**
     * 主键id
     */
    pkId: string;
    /**
     * 用户名
     */
    userName: string;
    /**
     * token
     */
    token: string;
  };
}
    const http: Serve<IReqid41454, IResid41454['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemUser/login',
        params: data
      }) 
    export default http