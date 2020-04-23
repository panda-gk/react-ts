
      /**
      * 【群发朋友圈配置】-禁用或启用
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43827 {
  /**
   * 编号
   */
  momentsNo: string;
  momentsEnable: number;
}
    export class IResid43827 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43827, IResid43827['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/moments/enable',
        data: data
      }) 
    export default http