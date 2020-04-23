
      /**
      * 【群发朋友圈配置】-删除接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43839 {
  /**
   * 编号
   */
  momentsNo: string;
}
    export class IResid43839 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43839, IResid43839['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/moments/delete',
        data: data
      }) 
    export default http