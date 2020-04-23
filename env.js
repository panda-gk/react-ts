//


module.exports = {
  "mock": {
    // "API_BASE_URL": "http://192.168.200.226:8030",
    "API_BASE_URL": "http://yapi.ywwl.org/mock/276",
    
  },
  "development": {
    // "API_BASE_URL": "http://192.168.200.220:8078", // 孙库
    // "API_BASE_URL": "http://192.168.202.202:8078", // 韩涛
    "API_BASE_URL": "http://172.16.5.213:8078" // 测试

  },
  "debug": {
    // "API_BASE_URL": "http://192.168.43.117:8078",
    // "API_BASE_URL": "http://172.16.5.211:8078", // 联调
    "API_BASE_URL": "http://172.16.5.213:8078" // 测试
    // "API_BASE_URL": "http://192.168.202.202:8078", // 韩涛
    // "API_BASE_URL": "http://192.168.200.220:8078", // 孙库
    

  },
  "test": {
    "API_BASE_URL": "http://172.16.5.213:8078"
  },
  "prod": {
    "API_BASE_URL": "http://116.62.12.153:8069"
  }
}