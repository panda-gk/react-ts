import React, {useState}  from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import* as styles from './index.scss'
import { Input, Select, Table, Button, message, Modal,Tooltip } from 'antd';
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import Preview from '../components/Preview'
import API from '../../../api'
import EditForm from '../components/EditForm'
import {STATUS_OPTIONS, STATUS_DATA} from '../../../constants'
const { Option } = Select;
const { confirm } = Modal;
const formItem = [
  [
    {
      label: '任务名称',
      name: 'replyName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
    {
      label: '子账号昵称',
      name: 'subUserName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
  
    {
      label: '主账号昵称',
      name: 'mainUserName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
    {
      label: '状态',
      placeholder: '请选择',
      name: 'replyEnable',
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
  ],
  {
    label: '设备昵称',
    name: 'storeNickName',
    Compontent: <Input placeholder="请输入" />,
    initialValue:'',
  },

]


const autoReply = (props:RouteComponentProps) => {

  const [btnDisabled, setBtnDisabled ] = useState(false)
  const [visible, setVisible ] = useState(false)
  const [previewModal, setPreviewModal ] = useState(false)
  const [replyContent, setReplyContent ] = useState([])

  // index > 1 编辑 -1 新增
  const [index, setIndex] = React.useState(-1)
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'replyName',
      key: 'replyName',
    },
    {
      title: '回复内容',
      dataIndex: 'replyContent',
      key: 'replyContent',
      render: (text, record) => (
        <a onClick={() => openPreview(record.replyContent)}>查看 （{record.replyContent.length}）</a>
      ),
    },
    {
      title: '应用设备',
      dataIndex: 'deviceTotal',
      key: 'deviceTotal',
      render: (text, record) => {
         const title = record.storeList.map(el => el && el.storeWxNickName)
         return(
          <Tooltip
            title={title.join()}
            className='storeNickNames'
            placement="topLeft"
            trigger='click'
            overlayClassName='storeNickNames'
          >
            <a>{record.deviceTotal}</a>
          </Tooltip>
         )
      },
    },
    {
      title: '创建子账号',
      dataIndex: 'address',
      key: 'address',
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
      title: '状态',
      dataIndex: 'replyEnable',
      key: 'replyEnable',
      render: (text, record) => (
        <div>
          <p> {STATUS_DATA[record.replyEnable]}</p>
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
      width: '240px',
      render: (text, record, index) => (
        <div>
          <Button type="primary" className='mr10' onClick={() => openModal(index)}>编辑</Button>
          <Button type="danger" className='mr10' onClick={() => del(record.replyNo)}>删除</Button>
          {
            record.replyEnable == 0 ? 
            <Button type='primary' onClick={() => isforbidden(record)}>启用</Button>
            :
            <Button  onClick={() => showConfirm(record)} type='danger'>禁用</Button>
          }
        </div>
      ),
    }
  ];
  const { list, getList, pagination, params } = usePagenationList(API.id43761)
  
  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    getList(params)
  }

  const showConfirm = (row) => {
    confirm({
      title: '禁用',
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
      replyNo: row.replyNo,
      replyEnable:statusData[row.replyEnable]
    }
    if (btnDisabled) return
    setBtnDisabled(true)
    try {
      await API.id43773(params)
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

 const del = (replyNo) => {
  confirm({
    title: '删除',
    content: '确认删除吗？',
    onOk() {
      isDel(replyNo)
    },
    onCancel() {},
  });
 }

 const isDel = async (replyNo) => {
  if (btnDisabled) return
  setBtnDisabled(true)
  try {
    await API.id43785({replyNo})
      setBtnDisabled(false)
      message.success('操作成功')
      const params2 = {
        ...params,
        page: '1',
      }
      getList(params2)
    } catch (error) {
    setBtnDisabled(false)
  }
 }

 const save = () => {
  getList()
  setVisible(false)
 }

//  打开预览
 const openPreview = (replyContent) => {
  setPreviewModal(true)
  setReplyContent(replyContent)
 }

  return(
    <div className={styles.autoReply}>
        <div className='title'>
          <SearchForm
            formItem={formItem}
            getParams={getParams}
            >
            <Button style={{ marginLeft: 8 }} onClick={() => openModal(-1)}>+添加规则</Button>
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
          previewModal &&
          <Preview
            visible={previewModal}
            replyContent={replyContent}
            type={1}
            onClose={() => setPreviewModal(false)}
          />
        }
        {
          visible &&   
          <EditForm
            list={list}
            index={index}
            visible={visible}
            key={index}
            onClose={() => setVisible(false)}
            onOk={save}
            type={1}
          >
          </EditForm>
        }
      </div>
  )
}

export default withRouter(autoReply)