
      /**
      * 【素材管理】-删除素材
      * 
      **/
      
    import request from '../utils/request'
    type Serve<T, G> = (data?: T) => Promise<G>
    export class IReqid43371 {
  /**
   * 素材编号
   */
  materialNo: string;
}
    export class IResid43371 {
  msg: string;
  code: number;
  success: string;
}
    const http: Serve<IReqid43371, IResid43371['data'] > = (data?) =>  request({
        method: 'POST',
        url: '/api/material/delete',
        data: data
      }) 
    export default http