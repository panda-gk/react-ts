
      /**
      * [全局配置]-查询配置列表
      * 配置类型 1:自动通过好友请求时间间隔	 2:自动通过好友请求上限 3:加好友渠道

当配置类型configType =1时，自动通过好友请求时间间隔的上下限键key分别为autoAddUserTimeUpper、autoAddUserTimeLower

当配置类型configType =2时，自动通过好友请求上限键key分别为autoAddUserTotalUpper、

当配置类型configType =3时，加好友渠道键key分别为autoAddUserChannel
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43353 {}
    export class IResid43353 {
  data: {
    id: number;
    /**
     * 配置编号
     */
    configNo: string;
    /**
     * 配置类型 1:自动通过好友请求时间间隔	 2:自动通过好友请求上限 3:加好友渠道
     */
    configType: 1 | 2 | 3;
    /**
     * 配置key，详情见备注
     */
    configKey: 'autoAddUserTime' | 'autoAddUserTotalUpper' | 'autoAddUserChannel';
    /**
     * 配置value
     */
    configValue: string;
    autoAddUserTimeLower: string;
    autoAddUserTimeUpper: string;
  }[];
  msg: string;
  code: number;
}
    const http: Serve<IReqid43353, IResid43353['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/systemConfig/list',
        params: data
      }) 
    export default http