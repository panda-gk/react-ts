
      /**
      * 【标签管理】-查询用户标签
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43857 {
  /**
   * 用户编号
   */
  userNo: string | number;
}
    export class IResid43857 {
  data: {
    /**
     * 标签名称
     */
    tagName: string;
    /**
     * 标签编号
     */
    tagNo: string;
  }[];
  msg: string;
  code: number;
}
    const http: Serve<IReqid43857, IResid43857['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/tag/userTagList',
        params: data
      }) 
    export default http