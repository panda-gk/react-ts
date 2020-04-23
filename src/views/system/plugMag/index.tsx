import React, {useState}  from 'react'
import* as styles from './index.scss'
import { Input, Select, Table, Button, message} from 'antd'
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import EditForm from './EditForm'
import API from '../../../api'
import CopyToClipboard from 'react-copy-to-clipboard'
import {STATUS_OPTIONS, STATUS_DATA, UPDARE_TYPE} from '../../../constants'
const { Option } = Select;
const formItem = [
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


const groupMag = () => {

  const [visible, setVisible ] = useState(false)
  // index > 1 编辑 -1 新增
  const [index, setIndex] = React.useState(-1)
  const columns = [
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '更新内容',
      dataIndex: 'updateDesc',
      key: 'updateDesc',
    },
    {
      title: '包大小',
      dataIndex: 'packageSize',
      key: 'packageSize',
    },
    {
      title: '更新方式',
      dataIndex: 'updateType',
      key: 'updateType',
      render: (text, record) => (
        <span> { UPDARE_TYPE[record.updateType]}</span>
      ),
    },
    {
      title: '手机型号',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <p> {STATUS_DATA[record.status]}</p>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <Button type="primary" className='mr10' onClick={() => openModal(index)}>编辑</Button>
          <CopyToClipboard
            text={record.url}
            onCopy={copyUrl}
          >
            <Button type='primary' > 复制链接  </Button>
          </CopyToClipboard>
        </div>
      ),
    }
  ];
  const { list, getList, pagination } = usePagenationList(API.id41499)
  
  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    // setParams(params)
    getList(params)
  }

  const copyUrl = (url) => {
    message.success('复制成功')
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
             <Button style={{ marginLeft: 8 }} onClick={() => openModal(-1)}>+添加</Button>
          </SearchForm>
        </div>
        <div className='table'>
          <Table
            columns={columns}
            dataSource={list}
            pagination={pagination}
          />,
        </div>
        <EditForm
          list={list}
          index={index}
          visible={visible}
          key={index}
          onClose={() => setVisible(false)}
          onOk={save}
        >
        </EditForm>
      </div>
  )
}

export default groupMag