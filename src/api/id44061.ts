
      /**
      * 【标签管理】-删除标签
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid44061 {
  /**
   * 标签编号
   */
  tagNo: string;
  /**
   * 用户编号
   */
  userNo: string;
}
    export class IResid44061 {
  msg: string;
  code: number;
}
    const http: Serve<IReqid44061, IResid44061['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/tag/delete',
        data: data
      }) 
    export default http