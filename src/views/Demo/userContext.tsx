import * as React from 'react'
import { Button } from "antd"

import UserContext from '../../contexts/user'


const UserChild = (props) => {
  return (
    <UserContext.Consumer>
      {
        ({ user, updateUser }) => (
          <div>
            <div>username: {user.userName}</div>
            <div>telephone: {user.telephone}</div>
            <div>level: {user.level}</div>
            <div>systemUserId: {user.systemUserId}</div>
            <div>父组件name: {props.name}</div>
            <Button type="primary" onClick={updateUser} >更新用户信息</Button>
          </div>
        )
      }
    </UserContext.Consumer>
  )
}

const TTT1 = (Component) => {
  return (
    <div>
      <div>这是一个包裹组件</div>
      <Component name={'TTT1'}/>
    </div>
  )
}

export default () => {
  return (
    <UserContext.UserProvider>
      <div>111jhjhj</div>
      {
        TTT1(UserChild)
      }
    </UserContext.UserProvider>
  )
}
