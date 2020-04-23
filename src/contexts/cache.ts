/**
 * 缓存应用级别数据库
 */
class Cache {

  token: string = null

  constructor() {
    this.init()
  }

  /**
   * 同步更新变量和缓存
   */
  set(key: keyof Cache, value) {
    localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
    this[key] = value
    console.log('更新缓存', key, value)
  }

  remove(key: keyof Cache) {
    console.log('即将删除缓存', key, this[key])
    localStorage.removeItem(key)
    this[key] = null
  }

  clear() {
    console.log('即将清空缓存', Object.keys(this))
    Object.keys(this).forEach(key => {
      this[key] = null
    })
    localStorage.clear()
  }

  /**
   * 初始化缓存到变量上
   */
  private init() {
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        this[key] = this.translateData(localStorage.getItem(key)) || null
      }
    }
    console.log('缓存初始化完成', this)
  }

  private translateData(data: string) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }

}

export default new Cache()