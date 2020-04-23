import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { observer } from 'mobx-react'
import { asideRouter } from '../../../router/config'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

@observer
class Aside extends Component<RouteComponentProps, object>{

  routerTo = (path: string) => {
    this.props.history.push(path)
  }


  public render() {
    const pathname = this.props.location.pathname
    const subMenu = asideRouter.menus.find((item) => pathname.indexOf(item.path) !== -1)
    const MenuComponent = () => (
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[subMenu ? subMenu.path : '']}
        // theme={'dark'}
      >
        {
          asideRouter.menus.map((item: any) => {
            const ChildrenMenu = ({ childrenItem, ...other }: { childrenItem: any, key: any }) => (
              childrenItem.hidden ? '' : (
                ( !childrenItem.isHeader && childrenItem.children && childrenItem.children.length > 0) && (
                  <Menu.SubMenu key={childrenItem.path} title={<span><Icon type={childrenItem.meta.icon} /><span>{childrenItem.meta.title}</span></span>} {...other}>
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
              )
            )
            return (
              ChildrenMenu({ childrenItem: item, key: item.path })
            )
          })
        }
      </Menu>
    )

    return (
      <aside className={'layout-aside'} >
        <MenuComponent />
      </aside>
    )
  }
}

export default withRouter(Aside)
