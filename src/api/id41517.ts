
      /**
      * 【插件管理】-插件复制链接
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41517 {
  /**
   * 插件id
   */
  id: string | number;
}
    export class IResid41517 {
  msg: string;
  code: number;
  success: boolean;
  data: {
    /**
     * 下载链接
     */
    url: string;
  };
}
    const http: Serve<IReqid41517, IResid41517['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/plugin/copyUrl',
        params: data
      }) 
    export default http