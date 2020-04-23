import React, {useState}  from 'react';
import* as styles from './index.scss'
import { Input, Select, Table, Button, message, Modal} from 'antd';
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import EditForm from './EditForm'
import API from '../../../api'
const { confirm } = Modal;
import {STATUS_OPTIONS, STATUS_DATA} from '../../../constants'
const { Option } = Select;
const formItem = [
  {
    label: '主账号',
    name: 'userName',
    Compontent: <Input placeholder="请输入主账号" />,
    initialValue:'',
  },
  {
    label: '手机号码',
    name: 'telephone',
    Compontent: <Input placeholder="请输入手机号码" />,
    initialValue:'',
  },
  {
    label: '状态',
    placeholder: '请选择',
    name: 'status',
    initialValue:'',
    Compontent: (
      <Select>
        {
          STATUS_OPTIONS.map((option, i) => (
            <Option value={option.value} key={i}>{option.label}</Option>
          ))
        }
      </Select>
    ),
  }
]


const mainMag = () => {

  const [btnDisabled, setBtnDisabled ] = useState(false)
  const [visible, setVisible ] = useState(false)
  // index > 1 编辑 -1 新增
  const [index, setIndex] = React.useState(-1)
  const columns = [
    {
      title: '主账号',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <div>
          <p> {record.userName}</p>
          <p>{record.telephone}</p>
        </div>
      ),
    },
    {
      title: '备注',
      dataIndex: 'desc',
      key: 'desc',
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
  const { list, getList, pagination } = usePagenationList(API.id41463)
  
  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    // setParams(params)
    getList(params)
  }

  const isforbidden = async (row) => {
    const statusData = {
      0:1, // 启用
      1:0, // 禁用
    }
    const params = {
      systemUserId: row.systemUserId,
      status:statusData[row.status]
    }
    if (btnDisabled) return
    setBtnDisabled(true)
    try {
    await API.id41490(params)
      setBtnDisabled(false)
      message.success('操作成功')
      getList()
    } catch (error) {
    setBtnDisabled(false)
      
    }
 }
 const showConfirm = (row) => {
  confirm({
    title: '禁用账号',
    content: '确认禁用吗？',
    onOk() {
      isforbidden(row)
    },
    onCancel() {},
  });
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
             <Button style={{ marginLeft: 8 }} onClick={() => openModal(-1)}>+添加主账号</Button>
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
          />
        }
       
      </div>
  )
}

export default mainMag