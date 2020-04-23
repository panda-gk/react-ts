
      /**
      * 【 群发朋友圈配置】-查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43815 {
  /**
   * 设备微信号
   */
  storeNickName: string | number;
  /**
   * 子账号昵称
   */
  subUserName: string | number;
  /**
   * 主账号昵称
   */
  mainUserName: string | number;
  rows: string | number;
  page: string | number;
  /**
   * 0-禁用，1-未开始，2-进行中，3-已完成
   */
  momentsStatus: string | number;
  /**
   * 任务名称
   */
  momentsName: string | number;
}
    export class IResid43815 {
  data: {
    total: number;
    records: {
      /**
       * 朋友圈编号
       */
      momentsNo: string;
      /**
       * 朋友圈名称
       */
      momentsName: string;
      /**
       * 朋友圈内容
       */
      momentsContent: {
        /**
         * 素材编号
         */
        materialNo: string;
        /**
         * 内容
         */
        content: string;
        materialUrl: string;
        materialContentType: 3 | 43 | 49;
        linkTitle: string;
        linkImgUrl: string;
        linkContent: string;
        fileName: string;
        appCoverUrl: string;
        /**
         * 朋友圈文本内容
         */
        textContent: string;
        /**
         * 素材业务类型为朋友圈类型时，是否点赞，1-点赞，0-取消点赞
         */
        tapLike: number;
        /**
         * 素材业务类型为朋友圈类型时，评论内容有值
         */
        comment: string;
      }[];
      /**
       * 主账号userId
       */
      mainSystemUserId: string;
      /**
       * 主账号用户名
       */
      mainUserName: string;
      /**
       * 主账号手机号
       */
      mainTelephone: string;
      /**
       * 子账号userId
       */
      subSystemUserId: string;
      /**
       * 子账号昵称
       */
      subUserName: string;
      /**
       * 子账号手机号
       */
      subTelephone: string;
      /**
       * 群发类型状态，1-启用，0-禁用
       */
      momentsEnable: 1 | 0;
      /**
       * 0-禁用，1-未开始，2-进行中，3-已完成
       */
      momentsStatus: 0 | 1 | 2 | 3;
      /**
       * 创建时间
       */
      createAt: string;
      /**
       * 发送类型 1:立即发送 2：定时发送
       */
      sendType: 1 | 2;
      /**
       * 发送时间
       */
      sendTime: string;
      storeList: {
        storeNo: string;
        storeWxNickName: string;
      }[];
      deviceTotal: number;
      /**
       * 点赞评论延迟
       */
      likeCommentDelay: number;
      delDelay: number;
    }[];
    field_1: string;
  };
  msg: string;
  field_12: string;
}
    const http: Serve<IReqid43815, IResid43815['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/moments/list',
        params: data
      }) 
    export default http