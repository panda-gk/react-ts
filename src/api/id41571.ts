
      /**
      * 【分组管理】-分组禁用接口
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid41571 {
  /**
   * 分组编号
   */
  bizNo: string;
  /**
   * 状态:0-禁用,1-正常
   */
  status: string;
}
    export class IResid41571 {
  code: number;
  msg: string;
  success: boolean;
}
    const http: Serve<IReqid41571, IResid41571['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/biz/disable',
        data: data
      }) 
    export default http