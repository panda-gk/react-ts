import * as React from 'react'
import { hot } from 'react-hot-loader'
import * as styles from './App.scss'
import Loadable from 'react-loadable'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Config from './config'
import PageLoading from '@components/PageLoading'
// import Error from '@components/Error'
// import PrivateRoute from '@shared/PrivateRoute'
// import IntlWrapper from './IntlWrapper'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '@views/home'),
  loading: PageLoading
})
const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '@views/login'),
  loading: PageLoading
})

const Demo = Loadable({
  loader: () => import(/* webpackChunkName: "Demo" */ '@views/Demo'),
  loading: PageLoading
})

const AppWrapper = props => <div className={styles.appWrapper} id="appWrapper" >{props.children}</div>

class AppRouter extends React.Component<{}> {
  
  render() {
    return (
      <AppWrapper>
        <Router>
          <Switch>
            {
              Config.NODE_ENV === 'development' && (
                <Route exact path="/demo" component={Demo} />
              )
            }
            <Route  path="/login" component={Login} />
            <Route path="/" component={Home} />
            {/* <Route path="/" component={Login} /> */}

            {/* <Route component={Error} /> */}
          </Switch>
        </Router>
      </AppWrapper>
    )
  }
}

export default hot(module)(AppRouter)
