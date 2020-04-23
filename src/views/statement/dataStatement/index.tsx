import React, {useState, useEffect} from 'react'
import* as styles from './index.scss'
import { Input, Table, DatePicker} from 'antd'
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import API from '../../../api'
import moment from 'moment'
const { RangePicker } = DatePicker;
const DataStatement = () => {
  const { list, getList, pagination, total, params } = usePagenationList(API.id41724, { queryStartTime:moment().format('YYYY-MM-DD'), queryEndTime: moment().format('YYYY-MM-DD'),  })
  // 好友数据汇总
  const [ allData, setAllData ] = useState({
    userNum: 0, // 好友数
    activeUserNum: 0, // 活跃好友数
    msgNum: 0, // 消息数
    totalUserNum: 0, // 总好友数
  })

  const [ dateTime, setDateTime] = useState({
    queryStartTime: '', 
    queryEndTime: '', 
  })

  // 好友数据汇总
  const [ tableData, setTableData ] = useState({
    userNum: 0, // 新增好友数
    brokeUserNum: 0, // 掉粉数
    msgNum: 0, // 消息数
    subUserNum: 0, // 归属子账号
    totalUserNum: 0, // 总好友数
    wxNum: 0, // 微信号
    activeUserNum: 0, // 活跃好友数
  })

  useEffect(() => {
    getAllData()
    getTableData({ queryStartTime:moment().format('YYYY-MM-DD'), queryEndTime: moment().format('YYYY-MM-DD'),  })
  }, [])

  const getAllData = async () => {
    const res = await API.id41742()
    setAllData(res)
  }

  const getTime = (dates, dateStrings) => {
    setDateTime({
      queryStartTime: dateStrings[0], 
      queryEndTime:  dateStrings[1], 
    })
  }

  const getTableData =  async (params) => {
    const res = await API.id42453(params)
    setTableData(res)
  }
  const formItem = [
    [
      {
        label: '子账号',
        name: 'userName',
        Compontent: <Input placeholder="请输入子账号" />,
        initialValue:'',
      },
      {
        label: '分组',
        name: 'bizName',
        Compontent: <Input placeholder="请输入分组" />,
        initialValue:'',
      },
      {
        label: '主账号',
        name: 'mainUserName',
        Compontent: <Input placeholder="请输入" />,
        initialValue:'',
      },
      {
        label: '日期',
        name: 'date',
        Compontent: (
          <RangePicker
            ranges={{
              '今日': [moment(), moment()],
              '昨天': [moment().subtract('days', 1), moment()],
              '七天': [moment().subtract('days', 6), moment()],
            }}
            onChange={getTime}
          />
        ),
        initialValue: [moment(), moment()],
      }
    ],
    {
      label: '微信号',
      name: 'storeWxNo',
      Compontent: <Input placeholder="请输入微信号" />,
      initialValue:'',
    },
 
  ]
  // index > 1 编辑 -1 新增
  const columns = [
    {
      title: '日期 ',
      dataIndex: 'calTime',
      key: 'calTime',
    },
    {
      title: '微信号',
      dataIndex: 'address',
      key: 'address',
      width:240,
       ellipsis: true,
      render: (text, record) => (
        <div className='df ac'>
          <div style={{width: '40px', height: '40px', display:'block'}}>
            <img src={record.headImg} alt="" style={{width: '40px', height: '40px', display:'block'}} />
          </div>
          <div style={{marginLeft: '10px'}} className='flex1'>
            <p style={{margin: 0}}> {record.nickName}</p>
            <span>{record.storeWxNo}</span>
          </div>
        </div>
      ),
    },
    {
      title: '归属子账号',
      render: (text, record) => (
        <div>
          <p> {record.subUserName}</p>
          <p>{record.subTelephone}</p>
        </div>
      ),
    },
    {
      title: '归属主账号',
      render: (text, record) => (
        <div>
          <p> {record.mainUserName}</p>
          <p>{record.mainTelephone}</p>
        </div>
      ),
    },
    {
      title: '分组',
      dataIndex: 'bizName',
      key: 'bizName',
    },
    {
      title: '总好友数',
      dataIndex: 'totalUserNum',
      key: 'totalUserNum',
    },
    {
      title: '新增好友数',
      dataIndex: 'userNum',
      key: 'userNum',
    },
    {
      title: '掉粉数',
      dataIndex: 'brokeUserNum',
      key: 'brokeUserNum',
    },
    {
      title: '活跃好友数',
      dataIndex: 'activeUserNum',
      key: 'activeUserNum',
    },
    {
      title: '消息数',
      dataIndex: 'msgNum',
      key: 'msgNum',
      render: (text, record) => (
        <div>
          <p> { toThousand(record.msgNum)  }</p>
        </div>
      ),
    },
  ];

  const getParams =  (values) => {
    console.log(values)
    const params = {
      userName: values.userName,
      storeWxNo: values.storeWxNo,
      bizName: values.bizName,
      mainUserName: values.mainUserName,
      page: '1',
      queryStartTime: values.date[0] ?  values.date[0].format('YYYY-MM-DD') : '', 
      queryEndTime:  values.date[1] ?  values.date[1].format('YYYY-MM-DD') : '', 
      // ...dateTime
    }
    // setParams(params)
    getList(params)
    getTableData(params)
  }

  const toThousand = (num) => {
    if (num > 10000) {
      return `${(num / 10000).toFixed(2)}万`
    }
    return num
  }


  return(
    <div className={styles.dataStatement}>
      <div className={styles.collect}>
        <div>
          <p>今日新增好友</p>
          <p className='ft700'>{allData.userNum}</p>
        </div>
        <div>
          <p>今日活跃好友数</p>
          <p  className='ft700'>{allData.activeUserNum}</p>
        </div>
        <div>
          <p>今日消息</p>
          <p  className='ft700'> {toThousand(allData.msgNum) }</p>
        </div>
        <div>
          <p>总好友数</p>
          <p  className='ft700'>{allData.totalUserNum}</p>
        </div>
      </div>
      <div className='title' style={{marginTop: '24px'}}>
        <SearchForm
          formItem={formItem}
          row={26}
          col={5}
          getParams={getParams}
        >
        </SearchForm>
      </div>
      <div className='table'>
        <div className={styles.tableTitle}>
          当前查询结果{total}项，微信号：{tableData.wxNum}个 归属子账号：{tableData.subUserNum}个
          总好友数：{tableData.totalUserNum}个, 新增好友数：{tableData.userNum}, 掉粉数：{tableData.brokeUserNum},
          消息数：{ toThousand(tableData.msgNum)}, 活跃好友：{tableData.activeUserNum} 个
        </div>
        <Table
          columns={columns}
          dataSource={list}
          pagination={pagination}
        />
      </div>
    </div>
  )
}
export default DataStatement