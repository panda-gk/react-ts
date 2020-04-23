import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'

import * as pages from './views'
import {allRouters} from './config'
import Loadable from 'react-loadable'
import PageLoading from '@components/PageLoading'
// import Error from '@components/Error'
// import PrivateRoute from '@shared/PrivateRoute'
// import IntlWrapper from './IntlWrapper'

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '@views/login'),
  loading: PageLoading
})
interface IRouterItem {
  path: string,
  component?: string,
  children: any,
}

export default class MenuRouter extends Component {
  public render() {
    const token = localStorage.getItem('token')
    return (
      <div className="main-page-container">
        <Switch>
          {/* {
            allRouters.menus.map((menuItem: IRouterItem) => {
              const route = (r: any) => {
                const ComponentItem = pages[r.component]
                return (
                  <Route path={r.path} component={ComponentItem} key={r.path} exact />
                )
              }
              return menuItem.component ? route(menuItem) : menuItem.children.map((r: IRouterItem) => route(r))
            })
          } */}
          {
            token ?  
            allRouters.menus.map((menuItem: IRouterItem) => {
              const route = (r: any) => {
                const ComponentItem = pages[r.component]
                return (
                  <Route path={r.path} component={ComponentItem} key={r.path} exact />
                )
              }
              return menuItem.component ? route(menuItem) : menuItem.children.map((r: IRouterItem) => route(r))
            })
            :
            <Route path="/" component={Login} />
          }
          <Route render={() => <Redirect to='/dataStatement' />} />
          {/* <Route render={() => <Redirect to={allRouters.menus[0].children ? allRouters.menus[0].children[0].path : allRouters.menus[0].path} />} /> */}

        </Switch>
      </div>
    )
  }
}
