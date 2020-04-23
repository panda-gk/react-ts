import React, {useState}  from 'react';
import* as styles from './index.scss'
import { Input, Select, Table, Button, message, Modal} from 'antd';
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import EditForm from './EditForm2'
import API from '../../../api'
import {LOGIN_DATA, STATUS_OPTIONS, STATUS_DATA, FANS_REQUEST_DATA} from '../../../constants'
const { Option } = Select;



const FacilityMag = () => {

  const [btnDisabled, setBtnDisabled ] = useState(false)
  const [visible, setVisible ] = useState(false)
  // index > 1 编辑 -1 新增
  const [index, setIndex] = React.useState(-1)
  const formItem = [
    {
      label: '微信号',
      placeholder: '请输入微信号',
      name: 'storeWxId',
      Compontent: <Input placeholder="请输入微信号" />,
      initialValue:'',
    },
    {
      label: '子账号',
      placeholder: '请输入子账号',
      name: 'subUserName',
      Compontent: <Input placeholder="请输入子账号" />,
      initialValue:'',
    },
    {
      label: '主账号',
      placeholder: '请输入主账号',
      name: 'mainUserName',
      Compontent: <Input placeholder="请输入主账号" />,
      initialValue:'',
    },
    {
      label: '状态',
      placeholder: '请选择',
      name: 'status',
      initialValue:'',
      Compontent: (
        <Select style={{width: '100px'}}>
          {
            STATUS_OPTIONS.map((option, i) => (
              <Option value={option.value} key={i}>{option.label}</Option>
            ))
          }
        </Select>
      ),
    }
  ]
  const columns = [
    {
      title: '微信号',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <div>
          <p>{record.storeUserName}</p>
          <p> {record.storeWxId}</p>
        </div>
      ),
    },
    {
      title: '归属子账号',
      dataIndex: 'age',
      key: 'age',
      render: (text, record) => (
        <div>
          <p> {record.subUserName}</p>
          <p>{record.subTelephone}</p>
        </div>
      ),
    },
    {
      title: '归属主账号',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <p> {record.mainUserName}</p>
          <p>{record.mainTelephone}</p>
        </div>
      ),
    },
   
    {
      title: '登录状态',
      dataIndex: 'onlineStatus',
      key: 'onlineStatus',
      render: (text, record) => (
        <div>
          <p> {LOGIN_DATA[record.onlineStatus]}</p>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div>
          <p> {STATUS_DATA[record.status]}</p>
        </div>
      ),
    },
    {
      title: '通过好友请求',
      dataIndex: 'autoAddUserSwitch',
      key: 'autoAddUserSwitch',
      render: (text, record) => (
        <div>
          <p> {FANS_REQUEST_DATA[record.autoAddUserSwitch]}</p>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <Button type="primary" className='mr10' onClick={() => openModal(index)}>编辑</Button>
          {
            record.status === 0 ? 
            <Button type='primary' onClick={() => isforbidden(record)}>启用</Button>
            :
            <Button  onClick={() => showConfirm(record)} type='danger'>禁用</Button>
          }
        </div>
      ),
    }
  ];
  const { list, getList, pagination } = usePagenationList(API.id41580)
  
  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    // setParams(params)
    getList(params)
  }

  const showConfirm = (row) => {
    Modal.confirm({
      title: '禁用账号',
      content: '确认禁用吗？',
      onOk() {
        isforbidden(row)
      },
      onCancel() {},
    });
   }

  const isforbidden = async (row) => {
    const statusData = {
      0:1, // 启用
      1:0, // 禁用
    }
    const params = {
      storeNo: row.storeNo,
      status:statusData[row.status]
    }
    if (btnDisabled) return
    setBtnDisabled(true)
    try {
    await API.id41598(params)
      setBtnDisabled(false)
      message.success('操作成功')
      getList()
    } catch (error) {
    setBtnDisabled(false)
      
    }
  }

 const openModal = (index) => {
   setVisible(true)
   setIndex(index)
 }

 const save = () => {
  getList()
  setVisible(false)
 }

  return(
    <div className={styles.weChatMag}>
        <div className='title'>
          <SearchForm
            formItem={formItem}
            getParams={getParams}
          >
             <Button style={{ marginLeft: 8 }} onClick={() => openModal(-1)}>+添加微信号</Button>
          </SearchForm>
        </div>
        <div className='table'>
          <Table
            columns={columns}
            dataSource={list}
            pagination={pagination}
          />,
        </div>
        {
          visible && 
          <EditForm
            list={list}
            index={index}
            visible={visible}
            key={index}
            onClose={() => setVisible(false)}
            onOk={save}
          >
        </EditForm>
        }
        
      </div>
  )
}

export default FacilityMag