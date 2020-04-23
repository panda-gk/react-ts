import React, {useState}  from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import* as styles from './index.scss'
import { Input, Select, Table, Button, message, Modal, Pagination } from 'antd';
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import EditForm from './EditForm'
import API from '../../../api'
import {STATUS_OPTIONS, STATUS_DATA} from '../../../constants'
const { Option } = Select;
const { confirm } = Modal;
const formItem = [
  [
    {
      label: '分组',
      name: 'bizName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
    {
      label: '子账号',
      name: 'subUserName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
    {
      label: '手机号码',
      name: 'subTelephone',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
    {
      label: '主账号',
      name: 'mainUserName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
   
  ],
  {
    label: '状态',
    placeholder: '请选择',
    name: 'status',
    initialValue:'',
    Compontent: (
      <Select style={{width: '150px'}}>
        {
          STATUS_OPTIONS.map((option, i) => (
            <Option value={option.value} key={i}>{option.label}</Option>
          ))
        }
      </Select>
    ),
  }
]


const sonAccountMag = (props:RouteComponentProps) => {

  const [btnDisabled, setBtnDisabled ] = useState(false)
  const [visible, setVisible ] = useState(false)
  // index > 1 编辑 -1 新增
  const [index, setIndex] = React.useState(-1)
  const columns = [
    {
      title: '子账号',
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
      title: '分组',
      dataIndex: 'bizName',
      key: 'bizName',
    },
    {
      title: '归属主账号',
      dataIndex: 'parentUserName',
      key: 'parentUserName',
      render: (text, record) => (
        <div>
          <p> {record.parentUserName}</p>
          <p>{record.parentTelephone}</p>
        </div>
      ),
    },
    {
      title: '设备数',
      dataIndex: 'storeSum',
      key: 'storeSum',
      render: (text, record) => (
        <a onClick={goWeChatMag}> {record.storeSum} </a>
      )
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
            record.status == 0 ? 
            <Button type='primary' onClick={() => isforbidden(record)}>启用</Button>
            :
            <Button  onClick={() => showConfirm(record)} type='danger'>禁用</Button>
          }
        </div>
      ),
    }
  ];
  const { list, getList, pagination } = usePagenationList(API.id41526)
  
  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    getList(params)
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
    await API.id41544(params)
      setBtnDisabled(false)
      message.success('操作成功')
      getList()
    } catch (error) {
    setBtnDisabled(false)
    }
  }

  const goWeChatMag = () => {
    props.history.push('/facilityMag/weChatMag')
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
             <Button style={{ marginLeft: 8 }} onClick={() => openModal(-1)}>+添加子账号</Button>
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

export default withRouter(sonAccountMag)