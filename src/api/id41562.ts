
      /**
      * 【分组管理】-分组新增修改接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41562 {
  /**
   * 分组名称
   */
  bizName: string;
  /**
   * 分组编号
   */
  bizNo: string;
  /**
   * 用户id
   */
  systemUserId: string;
  /**
   * 归属主账号id
   */
  relegationUserId: string;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string;
}
    export class IResid41562 {
  msg: string;
  code: number;
  success: boolean;
}
    const http: Serve<IReqid41562, IResid41562['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/biz/saveOrUpdate',
        data: data
      }) 
    export default http