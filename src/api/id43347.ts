
      /**
      * [全局配置]-新增或编辑配置
      * 配置类型 1:自动通过好友请求时间间隔	 2:自动通过好友请求上限 3:加好友渠道

格式为
[{
"configType": 1,
"configKey": "autoAddUserTime",
"configValue": {
"autoAddUserTimeLower": 10,
"autoAddUserTimeUpper": 30
}
}, {
"configType": 2,
"configKey": "autoAddUserTotalUpper",
"configValue": 200
}, {
"configType": 3,
"configKey": "autoAddUserChannel",
"configValue": 1
}]
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export type IReqid43347 = {
  /**
   * 1:自动通过好友请求时间间隔 2:自动通过好友请求上限 3:加好友渠道
   */
  configType: number;
  /**
   * 配置键
   */
  configKey: string;
  /**
   * 配置值
   */
  configValue:
    | {
        [k: string]: any;
      }
    | number;
}[];
    export class IResid43347 {
  /**
   * 返回信息
   */
  msg: string;
  /**
   * 返回码
   */
  code: number;
  success: boolean;
}
    const http: Serve<IReqid43347, IResid43347['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/systemConfig/saveOrUpdate',
        data: data
      }) 
    export default http