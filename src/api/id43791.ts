
      /**
      * 【 群发消息配置】-查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43791 {
  /**
   * 任务名称
   */
  massTitle: string | number;
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
  /**
   * 禁用状态，0-禁用，1-未开始，2-进行中，3-已完成
   */
  massStatus: string | number;
  rows: string | number;
  page: string | number;
}
    export class IResid43791 {
  data: {
    total: number;
    records: {
      /**
       * 任务编号
       */
      massNo: string;
      /**
       * 任务名称
       */
      massTitle: string;
      /**
       * 微信昵称列表
       */
      storeList: {
        /**
         * 设备编号
         */
        storeNo: string;
        /**
         * 微信昵称
         */
        storeWxNickName: string;
      }[];
      /**
       * 群发内容
       */
      massContent: {
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
       * 群发进度
       */
      massSchedule: string;
      /**
       * 内容数量
       */
      massContentTotal: number;
      /**
       * 设备数
       */
      deviceTotal: 3 | 4 | 5;
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
       * 禁用状态，0-禁用，1-启用
       */
      massEnable: 0 | 1;
      /**
       * 0-禁用，1-未开始，2-进行中，3-已完成
       */
      massStatus: 0 | 1 | 2 | 3;
      /**
       * 创建时间
       */
      createAt: string;
      /**
       * 发送目标 1:好友 2:群
       */
      sendTargetType: number[];
      /**
       * 发送时间
       */
      sendTime: string;
      /**
       * 发送类型 1:立即发送 2：定时发送
       */
      sendType: 1 | 2;
      /**
       * 消息发送间隔
       */
      sendMsgInterval: string;
      /**
       * 对象发送间隔
       */
      sendObjectInterval: string;
    }[];
  };
  msg: string;
  code: number;
}
    const http: Serve<IReqid43791, IResid43791['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/mass/list',
        params: data
      }) 
    export default http