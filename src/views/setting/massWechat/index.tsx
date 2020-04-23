import React, {useState}  from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Input, Select, Table, Button, message, Modal,Tooltip } from 'antd';
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import Preview from '../components/Preview'
import API from '../../../api'
import EditForm from '../components/EditForm'
import Detail from '../components/Detail'
import {MASS_ENABLE_OPTIONS, MASS_ENABLE_TYPE, SEND_TYPE} from '../../../constants'
const { Option } = Select;
const { confirm } = Modal;
const formItem = [
  [
    {
      label: '设备昵称',
      name: 'storeNickName',
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
      label: '子账号昵称',
      name: 'subUserName',
      Compontent: <Input placeholder="请输入" />,
      initialValue:'',
    },
    {
      label: '状态',
      placeholder: '请选择',
      name: 'momentsStatus',
      initialValue:'',
      Compontent: (
        <Select style={{width: '150px'}}>
          {
            MASS_ENABLE_OPTIONS.map((option, i) => (
              <Option value={option.value} key={i}>{option.label}</Option>
            ))
          }
        </Select>
      ),
    }
  ],

  {
    label: '任务名称',
    name: 'momentsName',
    Compontent: <Input placeholder="请输入" />,
    initialValue:'',
  },
  
 


]


const MassWechat = (props:RouteComponentProps) => {

  const [btnDisabled, setBtnDisabled ] = useState(false)
  const [visible, setVisible ] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const [previewModal, setPreviewModal ] = useState(false)
  const [replyContent, setReplyContent ] = useState([])
  const [isLook, setIsLook ] = useState(false)
  // index > 1 编辑 -1 新增
  const [index, setIndex] = React.useState(-1)
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'momentsName',
      key: 'momentsName',
    },
    {
      title: '任务设备',
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
      title: '群发内容',
      dataIndex: 'momentsContent',
      key: 'momentsContent',
      render: (text, record) => (
        <a onClick={() => openPreview(record.momentsContent)}>查看 （{record.momentsContent.length}）</a>
      ),
    },
    {
      title: '归属子账号',
      dataIndex: 'subUserName',
      key: 'subUserName',
      render: (text, record) => (
        <div>
          <p> {record.subUserName}</p>
          <p>{record.subTelephone}</p>
        </div>
      ),
    },
    {
      title: '归属主账号',
      dataIndex: 'mainUserName',
      key: 'mainUserName',
      render: (text, record) => (
        <div>
          <p> {record.mainUserName}</p>
          <p>{record.mainTelephone}</p>
        </div>
      ),
    },
    {
      title: '群发类型',
      dataIndex: 'sendType',
      key: 'sendType',
      render: (text, record) => (
        <div>
          <p> {SEND_TYPE[record.sendType]}</p>
          {
            record.sendTime && <p>{record.sendTime}</p>
          }
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'momentsStatus',
      key: 'momentsStatus',
      render: (text, record) => (
        <div>
          <p> {MASS_ENABLE_TYPE[record.momentsStatus]}</p>
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
      width: '320px',
      render: (text, record, index) => (
        <div>
          <Button type="primary" className='mr10' onClick={() => openDetailModal(index)}>明细</Button>
          {
            record.momentsStatus == 3 ?
            <Button type="primary" className='mr10' onClick={() => look(index)}>查看</Button>
            :
            <Button type="primary" className='mr10' onClick={() => edit(index)}>编辑</Button>
          }
          <Button type="danger" className='mr10' onClick={() => del(record.momentsNo)}>删除</Button>
          {
            record.momentsEnable == 0 ? 
            <Button type='primary' onClick={() => isforbidden(record)}>启用</Button>
            :
            <Button  onClick={() => showConfirm(record)} type='danger'>禁用</Button>
          }
        </div>
      ),
    }
  ];
  const { list, getList, pagination, params } = usePagenationList(API.id43815)
  
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
      momentsNo: row.momentsNo,
      momentsEnable:statusData[row.momentsEnable]
    }
    if (btnDisabled) return
    setBtnDisabled(true)
    try {
      await API.id43827(params)
        setBtnDisabled(false)
        message.success('操作成功')
        getList()
      } catch (error) {
      setBtnDisabled(false)
    }
  }

  const openDetailModal = (index) => {
    setDetailModal(true)
    setIndex(index)
  }

 const openModal = (index) => {
   setVisible(true)
   setIndex(index)
 }

 const del = (momentsNo) => {
  confirm({
    title: '删除',
    content: '确认删除吗？',
    onOk() {
      isDel(momentsNo)
    },
    onCancel() {},
  });
 }

 const isDel = async (momentsNo) => {
  if (btnDisabled) return
  setBtnDisabled(true)
  try {
    await API.id43839({momentsNo})
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
  //  console.log('保存')
  getList()
  setVisible(false)
 }

//  打开预览
 const openPreview = (momentsContent) => {
  setPreviewModal(true)
  setReplyContent(momentsContent)
 }

 const look = (index) => {
  openModal(index)
  setIsLook(true)
}

const edit = (index) => {
  openModal(index)
  setIsLook(false)
}

const add = () => {
  openModal(-1)
  setIsLook(false)
}
  return(
      <div >
        <div className='title'>
          <SearchForm
            formItem={formItem}
            getParams={getParams}
            >
            <Button style={{ marginLeft: 8 }} onClick={add}>+添加群发朋友圈</Button>
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
            type={3}
            onClose={() => setPreviewModal(false)}
          />
        }
        {
          detailModal && 
          <Detail
            list={list}
            index={index}
            visible={detailModal}
            key={index}
            onClose={() => setDetailModal(false)}
            type={3}
          >
          </Detail>
        }
        {
          visible &&   
          <EditForm
            list={list}
            index={index}
            visible={visible}
            isLook={isLook}
            key={index}
            onClose={() => setVisible(false)}
            onOk={save}
            type={3}
          >
          </EditForm>
        }
      </div>
  )
}

export default withRouter(MassWechat)