
      /**
      * 【微信号管理】-微信号查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41580 {
  /**
   * 微信号
   */
  storeWxId: string | number;
  /**
   * 子账号
   */
  subUserName: string | number;
  /**
   * 主账号
   */
  mainUserName: string | number;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string | number;
  page: string | number;
  rows: string | number;
}
    export class IResid41580 {
  data: {
    total: number;
    records: {
      /**
       * 设备编号
       */
      storeNo: string;
      /**
       * 主键
       */
      id: string;
      /**
       * 设备微信号
       */
      storeWxId: string;
      /**
       * 设备手机号
       */
      storeTelephone: string;
      /**
       * 设备昵称
       */
      storeUserName: string;
      /**
       * 子账号userId
       */
      subSystemUserId: '1' | '2' | '3' | '4' | '';
      /**
       * 子账号用户名称
       */
      subUserName: string;
      /**
       * 子账号手机号码
       */
      subTelephone: string;
      /**
       * 主账号userId
       */
      mainSystemUserId: '1' | '2' | '3' | '4' | '';
      /**
       * 主账号用户名称
       */
      mainUserName: string;
      /**
       * 主账号手机号码
       */
      mainTelephone: string;
      /**
       * 状态：0-禁用,1-启用
       */
      status: 0 | 1;
      /**
       * 创建时间
       */
      createAt: string;
      /**
       * 头像
       */
      profilePhotoUrl: string;
      /**
       * 在线状态：1-在线，0-离线
       */
      onlineStatus: 0 | 1;
      /**
       * 通过好友请求类型，1-自动，2-手动
       */
      autoAddUserSwitch: 1 | 2;
    }[];
  };
  msg: string;
  code: number;
}
    const http: Serve<IReqid41580, IResid41580['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/store/list',
        params: data
      }) 
    export default http