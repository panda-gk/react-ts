
      /**
      * 【自动回复配置】-查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43761 {
  /**
   * 规则名称
   */
  replyName: string | number;
  /**
   * 设备微信昵称
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
  /**
   * 禁用状态，1-启用，0-禁用
   */
  replyEnable: string | number;
  rows: string | number;
  page: string | number;
}
    export class IResid43761 {
  data: {
    total: number;
    records: {
      /**
       * 规则编号
       */
      replyNo: string;
      /**
       * 规则名称
       */
      replyName: string;
      /**
       * 规则内容
       */
      replyContent: {
        /**
         * 素材编号
         */
        materialNo: string;
        /**
         * 素材内容
         */
        content: string;
        /**
         * 素材url
         */
        materialUrl: string;
        /**
         * 素材内容类型 1:文本、3:图片、43:视频、49:链接、文件、小程序
         */
        materialContentType: 1 | 3 | 43 | 49 | 50 | 51;
        /**
         * 链接标题
         */
        linkTitle: string;
        /**
         * 自定义图片url
         */
        linkImgUrl: string;
        /**
         * 链接内容
         */
        linkContent: string;
        /**
         * 文件名称
         */
        fileName: string;
        /**
         * 小程序封面url
         */
        appCoverUrl: string;
      }[];
      /**
       * 内容数量
       */
      replyContentTotal: number;
      /**
       * 设备数量
       */
      deviceTotal: number;
      /**
       * 设备列表
       */
      storeList: {
        /**
         * 设备编号
         */
        storeNo: string;
        /**
         * 设备微信昵称
         */
        storeWxNickName: string;
      }[];
      /**
       * 子账号userId
       */
      subSystemUserId: string;
      /**
       * 子账号用户名
       */
      subUserName: string;
      /**
       * 子账号手机号
       */
      subTelephone: string;
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
       * 状态，1-启用，0-禁用
       */
      replyStatus: '0' | '1';
      /**
       * 创建时间
       */
      createAt: string;
    }[];
  };
  msg: string;
  code: number;
}
    const http: Serve<IReqid43761, IResid43761['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/reply/list',
        params: data
      }) 
    export default http