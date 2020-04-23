
// 获取 process 上变量参数
const NODE_ENV = process.env.NODE_ENV as 'development' | 'production'
const APP_ENV = process.env.APP_ENV as 'mock' | 'debug' | 'test' | 'prod'
const API_BASE_URL = process.env.API_BASE_URL as string

export default {
  NODE_ENV,
  APP_ENV,
  API_BASE_URL,
}
