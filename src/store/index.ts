import { RouterStore } from 'mobx-react-router'

import globalStore from './globalStore'
import userStore from './userStore'

const routerStore = new RouterStore()

const store = {
  routerStore,
  globalStore,
  userStore,
}

export type IStore = Readonly<typeof store>

export default store
