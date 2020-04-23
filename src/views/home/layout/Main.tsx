import React, { Component } from 'react'
import MenuRouter from '../../../router/index'
import {  withRouter, RouteComponentProps } from 'react-router-dom'
import Header from './Header'


class Main extends Component<RouteComponentProps, any> {
  public render() {
    return (
      <section>
        <Header />
        <div>
          <MenuRouter />
        </div>
      </section>
    )
  }
}

export default withRouter(Main)
