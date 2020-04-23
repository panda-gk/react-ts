
      /**
      * 【插件管理】-插件新增/修改接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41508 {
  /**
   * 版本号
   */
  version: string;
  /**
   * 上传路径
   */
  url: string;
  /**
   * 更新日志
   */
  updateDesc: string;
  /**
   * 更新方式 1:手动更新 2:强制更新
   */
  updateType: number;
  /**
   * 手机型号
   */
  deviceType: string;
  /**
   * 包大小
   */
  packageSize: string;
  /**
   * 状态：0-禁用,1-正常
   */
  status: number;
  /**
   * 主键
   */
  id: number;
}
    export class IResid41508 {
  success: boolean;
  code: number;
  msg: string;
}
    const http: Serve<IReqid41508, IResid41508['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/plugin/saveOrUpdate',
        data: data
      }) 
    export default http