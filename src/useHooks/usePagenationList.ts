import { useState, useEffect } from 'react'
/**
 * @param  {} apiGetList
 * api接口方法
 * @param  {} defaultParams
 * 请求参数默认值
 * @param  {} isUsePagination
 * 是否使用分页 默认使用
 */
function Index<T> (apiGetList, defaultParams = {}, isUsePagination = true) {

  const [params, setParams] = useState(isUsePagination ? {
    page: '1',
    rows: '10',
  } : {})
  const [list, setList] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)

  const onPageChange = (page: number, pageSize: number) => {
    const data = {
      page: String(page),
      rows: String(pageSize),
    }
    getList(data)
  }

  const getList = (data = {}) => {
    if (loading) { return }
    const newParams = {
      ...params,
      ...defaultParams,
      ...data,
    }
    setParams(newParams)
    setLoading(false)

    apiGetList(newParams).then(res => {
      setLoading(false)
      // 后端 records 、无records 2中情况
      const records = Object.prototype.toString.call(res) === '[object Array]' ? res : res.records
      setList(records)
      setTotal(res.total || 0)
    })
  }

  const pagination = isUsePagination ? {
    current: Number(params.page),
    pageSize: Number(params.rows),
    onChange: onPageChange,
    total: total,
  } : false as false

  useEffect(() => {
    getList()
  }, [])

  return {
    list,
    setList,
    getList,
    loading,
    setLoading,
    total,
    setTotal,
    params,
    setParams,
    pagination,
  }
}

export default Index
