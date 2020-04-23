
      /**
      * 【全局配置】-查询添加好友渠道配置列表
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43665 {}
    export class IResid43665 {
  code: number;
  success: boolean;
  msg: string;
  data: string[];
}
    const http: Serve<IReqid43665, IResid43665['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemConfig/addUserConfigList',
        params: data
      }) 
    export default http