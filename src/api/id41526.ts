
      /**
      * 【子账号管理】-子账号查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41526 {
  page: string | number;
  rows: string | number;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string | number;
  /**
   * 子账号手机号码
   */
  subTelephone: string | number;
  /**
   * 子账号账号昵称
   */
  subUserName: string | number;
  /**
   * 主账号昵称
   */
  mainUserName: string | number;
  /**
   * 分组名称
   */
  bizName: string | number;
}
    export class IResid41526 {
  data: {
    records: {
      /**
       * 用户昵称
       */
      userName: string;
      /**
       * userId
       */
      systemUserId: string;
      /**
       * 手机号码
       */
      telephone: string;
      /**
       * 分组名称
       */
      bizName: string;
      /**
       * 父级userName
       */
      parentUserName: string;
      /**
       * 父级手机号码
       */
      parentTelephone: string;
      /**
       * 设备数
       */
      storeSum: number;
      /**
       * 状态:0-禁用,1-正常
       */
      status: 0 | 1;
      /**
       * 创建时间
       */
      createAt: string;
      password: string;
      bizNo: string;
    }[];
    total: number;
  };
  success: boolean;
  code: number;
  msg: string;
}
    const http: Serve<IReqid41526, IResid41526['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemUser/subList',
        params: data
      }) 
    export default http