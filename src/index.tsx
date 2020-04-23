import './common.scss'

import 'core-js/fn/object/entries'
import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { configure } from 'mobx'
import { createHashHistory } from 'history'
// import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import registerServiceWorker from './sw'
import App from './App'
import AppConfig from './config'
// import UserContexts from './contexts/user'

console.log(AppConfig.API_BASE_URL)

// 去掉生产环境log
if (AppConfig.APP_ENV === 'prod') {
// tslint:disable-next-line: only-arrow-functions
  window.console.log = function() {}
}

moment.locale('zh-cn')

registerServiceWorker()
// configure({ enforceActions: 'observed' })

const hashHistory = createHashHistory()

const render = Component => {
  const element = (
    <LocaleProvider locale={zh_CN}>
      {/* <UserContexts.UserProvider> */}
        <Router history={hashHistory}>
          <Component />
        </Router>
      {/* </UserContexts.UserProvider> */}
    </LocaleProvider>
  )
  ReactDOM.render(element, document.getElementById('root') as HTMLElement)
}

render(App)
