
      /**
      * 【微信号管理】-根据账号查询设备查询列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43965 {
  /**
   * 微信号
   */
  systemUserId: string | number;
}
    export class IResid43965 {
  msg: string;
  code: number;
  data: {
    storeNo: string;
    /**
     * 设备微信号
     */
    storeWxNo: string;
    /**
     * 设备微信昵称
     */
    storeWxNickName: string;
  }[];
}
    const http: Serve<IReqid43965, IResid43965['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/store/storeListByAccountId',
        params: data
      }) 
    export default http