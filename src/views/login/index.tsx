import * as React from 'react'
// import md5 from 'md5'
import { hot } from 'react-hot-loader'
// import { observable } from 'mobx'
import { RouteComponentProps } from 'react-router-dom'
import IProps from './interFace'
import Login from './Login'
// import ChangePsd from './ChangePsd'
class UserLogin extends React.Component<IProps & RouteComponentProps, {}> {
  render() {
    return(
      <div>
        {/* 登录页 */}
        <Login />
        {/* <ChangePsd  {...this.props} /> */}
      </div>
    )
  }
}

export default hot(module)(UserLogin)
