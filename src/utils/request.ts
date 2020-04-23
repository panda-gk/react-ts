import axios from 'axios'
import { message } from 'antd'

import EnvConfig from './../config'
import cache from '../contexts/cache'

axios.defaults.baseURL = EnvConfig.API_BASE_URL

axios.interceptors.request.use((config) => {
  const token = cache.token || ''

  if (EnvConfig.APP_ENV !== 'mock') {
    config.headers['X-TOKEN'] = token
  }
  for (const key in config.params) {
    if (config.params[key] === null || config.params[key] === '') {
      delete config.params[key]
    }
  }

  return config
}, (error) => {
  console.log(error) // for debug
  Promise.reject(error)
})

axios.interceptors.response.use((response) => {

  if (EnvConfig.API_BASE_URL.indexOf('yapi.ywwl') > -1) {
    return response.data.data
  }
  const { code } = response.data

  if (code === -1) {
    // 未登录
    // window.location.hash = '/login'
    window.location.replace(`${window.location.origin + '#/login'}`)
    return Promise.reject(response.data.data)
  } else if (code === 1) {
    return Promise.resolve(response.data.data)
  } else {
    message.warn(response.data.msg || '服务正忙，请稍后再试~')
    return Promise.reject(response.data.data)
  }
}, err => {
  message.error('服务正忙，请稍后再试~')
  return Promise.reject(err)
})

// export const Get = (url: string, params?: object) => axios.get(url, { params }) as Promise<any>

// export const Post = (url: string, data?: object) => axios.post(url, data) as Promise<any>

export default axios
