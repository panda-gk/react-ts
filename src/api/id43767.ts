
      /**
      * 【自动回复配置】-新增或编辑
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43767 {
  /**
   * 规则名称
   */
  replyName: string;
  /**
   * 规则编号
   */
  replyNo: string;
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
  replyEnable: string;
  /**
   * 设备编号列表
   */
  storeNoList: string[];
}
    export class IResid43767 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43767, IResid43767['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/reply/saveOrUpdate',
        data: data
      }) 
    export default http