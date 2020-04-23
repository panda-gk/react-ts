
      /**
      * [素材管理]-查询素材列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43359 {
  /**
   * 素材内容类型 1:文本、3:图片、43:视频、49:链接、50::文件、51:小程序
   */
  materialContentType: string | number;
  /**
   * 素材业务类型 1:消息素材、3:朋友圈素材
   */
  materialBusinssType: string | number;
  /**
   * 素材标题
   */
  materialName: string | number;
  /**
   * 页码
   */
  page: string | number;
  /**
   * 行数
   */
  rows: string | number;
  /**
   * 创建人
   */
  createUserName: string | number;
}
    export class IResid43359 {
  data: {
    total: number;
    records: {
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
      materialContentType: 3 | 43 | 49;
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
      tapLike: string;
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
       * 创建人
       */
      createUserName: string;
      /**
       * 创建时间
       */
      createAt: string;
      /**
       * 文件名称
       */
      fileName: string;
      /**
       * 小程序封面url
       */
      appCoverUrl: string;
      /**
       * 文本内容
       */
      textContent: string;
    }[];
  };
  msg: string;
  code: string;
}
    const http: Serve<IReqid43359, IResid43359['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/material/list',
        params: data
      }) 
    export default http