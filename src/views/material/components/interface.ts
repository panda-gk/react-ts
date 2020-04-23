import { IResid43359 } from '@/api/id43359'

export type IItem = IResid43359['data']['records'][0]

export interface IProps  {
  children?: any,
  materialNo: string,
  materialName: string,
  materialContentType: number,
  materialBusinssType: number,
  content: any,
  tapLike?: string,
  comment?: string,
  linkTitle?: string,
  linkImgUrl?: string,
  linkContent?: string,
  createUserName: string,
  createAt: string,
  imgUrl?: string,
  fileName?: string,
  appCoverUrl?:string,
  del?: (flag:any) => void,
  saveClose?: () => void,
  textContent?: string,
  recevieMaterial?: (any) => void
}
