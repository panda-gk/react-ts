import React, { Component } from 'react'
import { Breadcrumb} from 'antd';
import { observer } from 'mobx-react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import {allRouters} from '../../../router/config'

@observer
class Header extends Component<RouteComponentProps, object> {
  breadcrumbList: any[] = []
  mainRouter: any = {}
  childRouter: any = {}
  handleBreadcrumbList(menus = allRouters.menus) {
    const nowPath = this.props.location.pathname || '/dataStatement'
    const breadcrumbItem = menus.find((item) => {
      return nowPath.indexOf(item.path) > -1
    })
    if (breadcrumbItem && breadcrumbItem.children) {
      this.childRouter = breadcrumbItem.children.find((item) => {
        return nowPath === item.path
      })
    }
    this.mainRouter = breadcrumbItem
  }


  render() {
    this.handleBreadcrumbList()
    // console.log(this.mainRouterTitle)
    const flag = window.location.href.indexOf('chatMag') != -1
    return (
      <React.Fragment>
        {
          !flag &&
          <header className={'layout-header pt20 mb20'}  >
            <div className={'layout-header-breadcrumb'}>
              <Breadcrumb>
                <Breadcrumb.Item>{ this.mainRouter ? this.mainRouter.meta.title : ''}</Breadcrumb.Item>
                <Breadcrumb.Item >{ (this.mainRouter && this.mainRouter.children) ? this.childRouter.meta.title : ''}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </header>
        }
      
      </React.Fragment>
    )
  }
}

export default withRouter(Header)
