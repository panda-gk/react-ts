
      /**
      * 【自动回复配置】-删除接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43785 {
  /**
   * 规则编号
   */
  replyNo: string;
}
    export class IResid43785 {
  code: number;
  success: boolean;
  msg: string;
}
    const http: Serve<IReqid43785, IResid43785['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/reply/delete',
        data: data
      }) 
    export default http