
      /**
      * 【 群发消息配置】-新增或编辑
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43797 {
  /**
   * 规则名称
   */
  massTitle: string;
  /**
   * 规则编号
   */
  massNo: string;
  /**
   * 素材内容编号列表
   */
  materialNos: string[];
  /**
   * 子账号userId
   */
  subSystemUserId: string;
  /**
   * 禁用状态,1-启用，0-禁用
   */
  massEnable: number;
  /**
   * 设备编号
   */
  storeNoList: string[];
  /**
   * 发送目标 1:好友 2:群
   */
  sendTargetType: number[];
  /**
   * 消息发送间隔
   */
  sendMsgInterval: string;
  /**
   * 对象发送间隔
   */
  sendObjectInterval: string;
  /**
   * 发送时间
   */
  sendTime: string;
  /**
   * 发送类型 1:立即发送 2：定时发送
   */
  sendType: number;
}
    export class IResid43797 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43797, IResid43797['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/mass/saveOrUpdate',
        data: data
      }) 
    export default http