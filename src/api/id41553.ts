
      /**
      * 【分组管理】-分组查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41553 {
  /**
   * 行记录数
   */
  rows: string | number;
  /**
   * 页码
   */
  page: string | number;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string | number;
  /**
   * 子账号userName
   */
  subUserName: string | number;
  /**
   * 子账号手机号码
   */
  subTelephone: string | number;
  /**
   * 分组名称
   */
  bizName: string | number;
  /**
   * 主账号用户名称
   */
  mainUserName: string | number;
}
    export class IResid41553 {
  msg: string;
  code: number;
  data: {
    total: number;
    records: {
      /**
       * 分组名称
       */
      bizName: string;
      /**
       * 分组编号
       */
      bizNo: string;
      /**
       * 组长子账号id
       */
      field_4: string;
      /**
       * 组长子账号用户名称
       */
      subUserName: string;
      /**
       * 组长子账号手机号
       */
      subTelephone: string;
      /**
       * 归属主账号id
       */
      field_5: string;
      /**
       * 归属主账号昵称
       */
      mainUserName: string;
      /**
       * 归属主账号手机号
       */
      mainTelephone: string;
      /**
       * 子账号数量
       */
      accountNum: number;
      /**
       * 状态:0-禁用,1-正常
       */
      status: '0' | '1';
      /**
       * 创建时间
       */
      createAt: string;
      /**
       * 主账号
       */
      mainSystemUserId: string;
      /**
       * 子账号
       */
      subSystemUserId: string;
      id: string;
    }[];
  };
}
    const http: Serve<IReqid41553, IResid41553['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/biz/list',
        params: data
      }) 
    export default http