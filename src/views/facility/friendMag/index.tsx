import React, {useState} from 'react';
import* as styles from './index.scss'
import { Input, Select, Table, Button, message, Modal} from 'antd';
import usePagenationList from '../../../useHooks/usePagenationList'
import  SearchForm from '../../../components/SearchForm'
import { SEX_DATA, FANS_SOURCE} from '../../../constants'
import API from '../../../api'
const friendMag = () => {
  
  const formItem = [
    {
      label: '客户微信号',
      name: 'userWxNo',
      Compontent: <Input placeholder="请输入微信号" />,
      initialValue:'',

    },
    // {
    //   label: '归属子账号',
    //   name: 'subUserName',
    //   Compontent: <Input placeholder="请输入子账号" />,
    //   initialValue:'',
    // },
    {
      label: '归属微信号',
      name: 'storeWxNo',
      Compontent: <Input placeholder="请输入归属微信号" />,
      initialValue:'',

    },
    // {
    //   label: '分组',
    //   name: 'bizName',
    //   Compontent: <Input placeholder="请输入分组" />,
    //   initialValue:'',
    // }
  ]
  // index > 1 编辑 -1 新增
  const columns = [
    {
      title: '客户微信号',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <div>
          <p> {record.userWxNickName}</p>
          <p>{record.userWxNo }</p>
        </div>
      ),
      // width: 150,
      // ellipsis: true,

    },
    {
      title: '归属微信号',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <p> {record.storeUserName}</p>
          <p>{record.storeWxNo}</p>
        </div>
      ),
      // ellipsis: true,

    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => (
        <p>{SEX_DATA[record.sex]}</p>
      ),
      width: 100,
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'userPhone',
      key: 'userPhone',
      width: 150,
    },
    {
      title: '加好友时间',
      dataIndex: 'makeFriendsTime',
      key: 'makeFriendsTime',
      // width: 150,
      // ellipsis: true,
    },
    {
      title: '好友标签',
      dataIndex: 'tagList',
      key: 'tagList',
      width: 150,
      render: (text, record) => (
        <p className='omit'>{ record.tagList && record.tagList.map(el => el.tagName).join(',')}</p>
      ),
      ellipsis: true,
    },
    {
      title: '加好友渠道',
      dataIndex: 'addFriendsChannel',
      key: 'addFriendsChannel',
      render: (text, record) => (
        <p>{record.addFriendsChannel || '未知'}</p>
      ),
      width: 150,
    },
    {
      title: '备注',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '最后对话时间',
      dataIndex: 'lastChatTime',
      key: 'lastChatTime',
      ellipsis: true,

    },
  ];
  const { list, getList, pagination } = usePagenationList(API.id41715)
  
  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    // setParams(params)
    getList(params)
  }
  return(
    <div className={styles.friendMag}>
       <div className='title'>
          <SearchForm
            formItem={formItem}
            getParams={getParams}
          >
          </SearchForm>
        </div>
        <div className='table'>
          <Table
            columns={columns}
            dataSource={list}
            pagination={pagination}
          />
        </div>
    </div>
  )
}
export default friendMag