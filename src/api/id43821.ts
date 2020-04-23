
      /**
      * 【 群发朋友圈配置】-新增或编辑
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43821 {
  /**
   * 群发朋友圈规则名称
   */
  momentsName: string;
  /**
   * 群发朋友圈编号
   */
  momentsNo: string;
  /**
   * 素材编号列表
   */
  materialNos: string[];
  /**
   * 子账号userId
   */
  subSystemUserId: string;
  /**
   * 禁用状态,1-启用，0-禁用
   */
  momentsEnable: number;
  /**
   * 发送类型,1-立即发送，2-定时发送
   */
  sendType: number;
  /**
   * 发送时间
   */
  sendTime: string;
  /**
   * 发送时间
   */
  sendMsgInterval: string;
  /**
   * 点赞评论延迟
   */
  likeCommentDelay: number;
  /**
   * 删除延迟
   */
  delDelay: number;
  /**
   * 设备编号列表
   */
  storeNoList: string[];
  /**
   * 0-禁用，1-未开始，2-进行中，3-已完成
   */
  momentsStatus: number;
}
    export class IResid43821 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43821, IResid43821['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/moments/saveOrUpdate',
        data: data
      }) 
    export default http