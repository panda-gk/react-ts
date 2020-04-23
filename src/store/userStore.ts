import { observable, action, runInAction } from 'mobx'
import API from '@api/index'
// tslint:disable-next-line: no-var-requires
import { allRouters } from '../router/config'

class UserStore {

  @observable token: string = ''

  @observable user = {
    userName: '',
    level: 1, // 权限 账号类型:1-admin,2-主账号,3-子账号
    telephone: '',
  }


  @observable headerDefaultSelectedKey: string = '' // 头部默认选中的路由
  @observable headerDefaultOpenKeys:any  = {} // 头部默认打开路由

  constructor() {
    const token = window.localStorage.getItem('ZB_BUSINESS_token') || ''
    const path = window.location.hash.split('#')[1] || '/dataStatement'
    this.token = token
    this.updateUser()
    this.updateHeaderRouter(path )
  }

  @action
  updateToken(token: string) {
    this.token = token
    if (token) {
      window.localStorage.setItem('ZB_BUSINESS_token', token)
    } else {
      window.localStorage.removeItem('ZB_BUSINESS_token')
    }
  }

  @action signOut = () => {
    this.updateToken('')
  }
  @action
  async updateUser() {
    try {
      const res = await API.id41688()
      runInAction(() => {
        Object.assign(this.user, res)
        localStorage.setItem('user', JSON.stringify(this.user))
      })
    } catch (error) {
      
    }
   
  }

  @action
  updateHeaderRouter(path) {
    this.headerDefaultSelectedKey = path
    this.headerDefaultOpenKeys = allRouters.menus.find((item) => path.indexOf(item.path) !== -1)
  }
}

const userStore = new UserStore()

export type IUserStore = Readonly<typeof userStore>

// interface Child {
//   height: number,
// }

// export type Foo = ClassOf<{ info: Child, age: number }, 'info'>

export default userStore
