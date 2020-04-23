
      /**
      * 【素材管理】-新增或编辑
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43365 {
  /**
   * 素材编号
   */
  materialNo: string;
  /**
   * 素材标题
   */
  materialName: string;
  /**
   * 素材内容类型 1:文本、3:图片、43:视频、49:链接、50:文件、51:小程序
   */
  materialContentType: number;
  /**
   * 素材业务类型 1:消息素材、3:朋友圈素材
   */
  materialBusinssType: number;
  /**
   * 当素材类型为文本时，则为文本内容； 当素材类型为图片时，则为图片url； 当素材类型为链接时，则为链接地址； 当素材类型为视频，文件，小程序时,则为视频或者文件，小程序链接。
   */
  content: string;
  /**
   * 素材业务类型为朋友圈类型时，是否点赞，1-点赞，0-取消点赞
   */
  tapLike: number;
  /**
   * 素材业务类型为朋友圈类型时，评论内容有值
   */
  comment: string;
  /**
   * 当素材类型为链接类型，链接标题
   */
  linkTitle: string;
  /**
   * 当素材类型为链接类型，自定义图片url
   */
  linkImgUrl: string;
  /**
   * 当素材类型为链接类型，链接内容
   */
  linkContent: string;
  /**
   * 当素材类型为文件时，为文件名称
   */
  fileName: string;
  /**
   * 当素材类型为小程序时，为小程序图片链接
   */
  appCoverUrl: string;
  /**
   * 文本内容
   */
  textContent: string;
}
    export class IResid43365 {
  msg: string;
  code: number;
  success: string;
}
    const http: Serve<IReqid43365, IResid43365['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/material/saveOrUpdate',
        data: data
      }) 
    export default http