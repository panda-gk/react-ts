
      /**
      * 【群发消息配置】-删除接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43809 {
  /**
   * 规则编号
   */
  massNo: string;
}
    export class IResid43809 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43809, IResid43809['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/mass/delete',
        data: data
      }) 
    export default http