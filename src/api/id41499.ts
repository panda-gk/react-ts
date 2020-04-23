
      /**
      * 【插件管理】-插件查询列表接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41499 {
  page: string | number;
  rows: string | number;
  /**
   * 状态：0-禁用,1-正常
   */
  status?: string | number;
}
    export class IResid41499 {
  data: {
    records: {
      /**
       * 版本号
       */
      version: string;
      /**
       * 更新内容
       */
      updateDesc: string;
      /**
       * 包大小
       */
      packageSize: string;
      /**
       * 更新方式 1:手动更新 2:强制更新
       */
      updateType: 1 | 2;
      /**
       * 手机型号
       */
      deviceType: string;
      /**
       * 状态：0-禁用,1-正常
       */
      status: '0' | '1';
      /**
       * 更新时间
       */
      updatedAt: string;
      id: string;
      url: string;
    }[];
    total: number;
  };
  success: boolean;
  code: number;
  msg: string;
}
    const http: Serve<IReqid41499, IResid41499['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/plugin/list',
        params: data
      }) 
    export default http