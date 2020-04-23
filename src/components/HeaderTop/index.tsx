import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { headerRouter, asideRouter } from '../../router/config'

import UserContexts from '../../contexts/user'
import * as styles from './index.scss'

const { Header } = Layout

class HeaderTop extends Component<RouteComponentProps> {

  routerTo = (path: string) => {
    this.props.history.push(path)
  }

  loginOut() {
    const { origin } = window.location
    const url = `${origin}/#/login`
    window.location.replace(url)
  }
  componentDidMount
  render() {
    return (
      <UserContexts.Consumer>
        {
          ({ user, routePath, updateRoutePath, updateUser }) => (
            <Header className="header-top jsb">
              <div className='df  flex1'>
                <div className='cff' style={{fontSize: '30px'}}>
                  遥望电豹
                </div>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  className='flex1'
                  defaultSelectedKeys={[routePath.headerDefaultSelectedKey]}
                  // defaultOpenKeys={[headerDefaultOpenKeys? headerDefaultOpenKeys.path : '']}
                  style={{ lineHeight: '63px' , marginLeft: '50px'}}
                >
                  {
                    headerRouter.menus.map((item: any) => {
                      const ChildrenMenu = ({ childrenItem, ...other }: { childrenItem: any, key: any }) => (
                       ( childrenItem.level == user.level) ? '' : (
                          (  childrenItem.children && childrenItem.children.length > 0) ? (
                            <Menu.SubMenu key={childrenItem.path} title={childrenItem.meta.title} {...other}>
                              {
                                childrenItem.children.map((menuItem: any) => {
                                  return (
                                    <Menu.Item key={menuItem.path}>
                                      <Link to={menuItem.path}>{menuItem.meta.title}</Link>
                                    </Menu.Item>
                                  )
                                })
                              }
                            </Menu.SubMenu>
                          ) : (
                            (
                              <Menu.Item key={item.path} {...other} onClick={() => this.routerTo(item.path)}>
                                <span>
                                  {item.meta.title}
                                </span>
                              </Menu.Item>
                            )
                          )
                        )
                      )
                      return (
                        ChildrenMenu({ childrenItem: item, key: item.path })
                      )
                    })
                  }
                  {
                    user.level == 1 &&
                    asideRouter.menus.map((item: any) => {
                      const ChildrenMenu = ({ childrenItem, ...other }: { childrenItem: any, key: any }) => (
                        <Menu.SubMenu className='fr' key={childrenItem.path} title={<i className='iconfont-shezhi2 iconfont'></i>} {...other}>
                          {
                            childrenItem.children.map((menuItem: any) => {
                              return (
                                <Menu.Item key={menuItem.path}>
                                  <Link to={menuItem.path}>{menuItem.meta.title}</Link>
                                </Menu.Item>
                              )
                            })
                          }
                        </Menu.SubMenu>
                      )
                      return (
                        ChildrenMenu({ childrenItem: item, key: item.path })
                      )
                    })
                    }
                </Menu>
              </div>
              <div className={styles.sys}>
                <div className="user">
                  <img src='http://fashion-ywwl.oss-cn-hangzhou.aliyuncs.com/fashion/2019/12/24873682856032306.jpg' alt=""/>
                  <p className={styles.userName}>{user.userName}</p>
                  <ul className="handle">
                    {/* <li>
                      修改密码
                    </li> */}
                    <li onClick={this.loginOut.bind(this)}>
                      退出
                    </li>
                  </ul>
                </div>
              </div>
            </Header>
          )
        }
      </UserContexts.Consumer>
    )
  }
}
export default withRouter(HeaderTop)
