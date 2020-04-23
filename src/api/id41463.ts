
      /**
      * 【主账号管理】-主账号查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41463 {
  /**
   * 行记录数
   */
  rows: string | number;
  /**
   * 页码
   */
  page: string | number;
  /**
   * 手机号码
   */
  telephone?: string | number;
  /**
   * 主账号昵称
   */
  userName?: string | number;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string | number;
}
    export class IResid41463 {
  msg: string;
  code: number;
  data: {
    total: number;
    records: {
      /**
       * 用户昵称
       */
      userName: string;
      /**
       * 主账号userId
       */
      systemUserId: string;
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
      status: 0 | 1;
      /**
       * 创建时间
       */
      createAt: string;
      password: string;
    }[];
  };
}
    const http: Serve<IReqid41463, IResid41463['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemUser/list',
        params: data
      }) 
    export default http