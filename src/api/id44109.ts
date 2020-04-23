
      /**
      * 【标签管理】-新增用户标签
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid44109 {
  /**
   * 标签列表
   */
  tagNos: string[];
  /**
   * 用户编号
   */
  userNo: string;
}
    export class IResid44109 {
  msg: string;
  code: number;
}
    const http: Serve<IReqid44109, IResid44109['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/tag/saveUserTag',
        data: data
      }) 
    export default http