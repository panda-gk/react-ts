
      /**
      * 【插件管理】-插件上传文件功能
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41940 {
  /**
   * 文件
   */
  file: string | number;
  /**
   * 文件名
   */
  title: string | number;
  /**
   * 值为5
   */
  mediaType: string | number;
}
    export class IResid41940 {
  success: boolean;
  code: number;
  msg: string;
}
    const http: Serve<IReqid41940, IResid41940['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/fileUpload/upload',
        params: data
      }) 
    export default http