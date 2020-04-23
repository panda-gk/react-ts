
      /**
      * 【标签管理】-新增标签
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43869 {
  tagName: string;
}
    export class IResid43869 {
  msg: string;
  code: number;
}
    const http: Serve<IReqid43869, IResid43869['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/tag/save',
        data: data
      }) 
    export default http