
      /**
      * 【素材管理】-预览详情接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43377 {
  /**
   * 编号
   */
  materialNo: string | number;
}
    export class IResid43377 {
  code: number;
  msg: string;
  success: string;
  data: {
    /**
     * 素材编号
     */
    materialNo: string;
    /**
     * 素材标题
     */
    materialName: string;
    /**
     * 素材内容类型 1:文本、3:图片、43:视频、49:链接、文件、小程序
     */
    materialContentType: number;
    /**
     * 素材业务类型 1:消息素材、3:朋友圈素材
     */
    materialBusinssType: number;
    /**
     * 素材内容
     */
    materialContent: string;
    /**
     * 创建人
     */
    createBy: string;
    /**
     * 创建时间
     */
    createAt: string;
  };
}
    const http: Serve<IReqid43377, IResid43377['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/material/detail',
        params: data
      }) 
    export default http