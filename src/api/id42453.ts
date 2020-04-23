
      /**
      * 【好友报表】-查询总计
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid42453 {
  userName: string | number;
  storeWxNo: string | number;
  bizName: string | number;
  mainUserName: string | number;
  queryStartTime: string | number;
  queryEndTime: string | number;
}
    export class IResid42453 {
  data: {
    userNum: number;
    brokeUserNum: number;
    subUserNum: number;
    msgNum: number;
    totalUserNum: number;
    wxNum: number;
    activeUserNum: number;
  };
  code: string;
  msg: string;
  success: string;
}
    const http: Serve<IReqid42453, IResid42453['data'] > = (data?) =>  request({
        method: 'GET',
        url: '/api/dailyStatistic/totalInfo',
        params: data
      }) 
    export default http