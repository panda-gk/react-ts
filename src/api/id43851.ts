
      /**
      * 【标签管理】-查询标签列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43851 {}
    export class IResid43851 {
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
    const http: Serve<IReqid43851, IResid43851['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/tag/list',
        params: data
      }) 
    export default http