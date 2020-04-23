import * as React from 'react'
import id41688, { IResid41688 } from '@api/id41688'
import { allRouters } from '../router/config'

const { createContext, useState, useEffect } = React

interface IUserValue {
  /**
   * 用户信息
   */
  user?: IResid41688['data'],
  /**
   * 接口更新用户信息方法
   */
  updateUser?: () => any,
  /**
   * 路由信息 高亮菜单栏
   */
  routePath?: {
    headerDefaultSelectedKey: string,
    headerDefaultOpenKeys: any,
  },
  updateRoutePath?: (path: string) => void,
}

const { Provider, Consumer } = createContext<IUserValue>({})

const UserProvider = (props: any) => {

  const [user, setUser] = useState<IResid41688['data']>({
    userName: '',
    telephone: '',
    level: 0,
    systemUserId: '',
    leader: null
  })

  const [routePath, setRoutePath] = useState({
    headerDefaultSelectedKey: window.location.hash.split('#')[1] || '/dataStatement',
    headerDefaultOpenKeys: {},
  })

  const updateUser = async () => {
    // id41688().then(res => {
    //   console.log(res)
    //   setUser(res)
    // })
    try {
      const res = await id41688()
      setUser(res)
    } catch (error) {
      
    }
  }

  const updateRoutePath = (path: string) => {
    const value = {
      headerDefaultSelectedKey: path,
      headerDefaultOpenKeys: allRouters.menus.find((item) => path.indexOf(item.path) !== -1),
    }
    setRoutePath(value)
  }

  const value: IUserValue = {
    user,
    updateUser: updateUser,
    routePath,
    updateRoutePath,
  }

  useEffect(() => {
      const hash = window.location.hash
      hash.indexOf('login') !== -1
      if ( hash.indexOf('login') == -1) {
        updateUser()
      }
  }, [])

  return (
    <Provider value={value}>
      {props.children}
    </Provider>
  )
}

export default {
  UserProvider,
  Consumer,
}
