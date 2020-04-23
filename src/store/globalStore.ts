import { observable, action } from 'mobx'

class GlobalStore {
  /**
   * 菜单栏折叠
   *
   * @type {boolean}
   * @memberof GlobalStore
   */
  @observable
  sideBarCollapsed: boolean = localStorage.getItem('ZB_BUSINESS_SIDE_BAR_COLLAPSED') === '1'

  /**
   * 菜单栏主题
   */
  @observable
  sideBarTheme: string = 'light'

    /**
     * 打开的菜单key
     *
     * @type {string[]}
     * @memberof GlobalStore
     */
    @observable
    navOpenKeys: string[] = JSON.parse(localStorage.getItem('ZB_BUSINESS_NAV_OPEN_KEYS')) || []

    @action
    toggleSideBarCollapsed = () => {
      this.sideBarCollapsed = !this.sideBarCollapsed
      localStorage.setItem('ZB_BUSINESS_SIDE_BAR_COLLAPSED', this.sideBarCollapsed ? '1' : '0')
    }

    @action
    setOpenKeys = (openKeys: string[]) => {
      this.navOpenKeys = openKeys
      localStorage.setItem('ZB_BUSINESS_NAV_OPEN_KEYS', JSON.stringify(openKeys))
    }

}

const globalStore = new GlobalStore()

export type IGlobalStore = Readonly<typeof globalStore>

export default globalStore
