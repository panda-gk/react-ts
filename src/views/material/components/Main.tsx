import React, { Component, useEffect, useState } from 'react'
import { Input, Select, Table, Button, message, Modal,  Pagination} from 'antd';
import * as styles from './index.scss'
import Texts from './Texts'
import Images from './Images'
import Link from './Link'
import Videos from './Videos'
import File from './File'
import Wechat from './Wechat'
import Edit from './Edit'
import SearchForm from '../../../components/SearchForm'
import usePagenationList from '../../../useHooks/usePagenationList'
import { MSG_TYPE_OPTIONS, FANS_TYPE_OPTIONS } from '../../../constants'
const { Option } = Select;

import API from '../../../api'
interface IProps  {
  params: {
    materialBusinssType: number,
  },
  recevieMaterial?: (any) => void
}

const Main = (props:IProps) => {
  const { list, getList, pagination, params } = usePagenationList(API.id43359, {...props.params, page: '1', rows: '20'})
  
  const [visible, setVisible  ] = useState(false)
  const [item, setItem  ] = useState({
    materialNo: '',
    materialName: '', // 素材标题
    materialContentType: 3,
    materialBusinssType: props.params.materialBusinssType,
    content: '',
    imgUrl: '',
    tapLike: 0,
    comment: '',
    linkTitle: '',
    linkImgUrl: '',
    linkContent: '',
    fileName: '',
    appCoverUrl: ''
  })

  const [materialNo, setMaterialNo] = useState('')
  // 删除
  const del = (flag) => {
    const params2 = {
      ...params,
      page: '1',
    }
    getList(params2)
  }

  const getParams =  (values) => {
    const params = {
      ...values,
      page: '1',
    }
    getList(params)
  }

  const formItem = [
      {
        label: '素材标题',
        name: 'materialName',
        Compontent: <Input placeholder="请输入" />,
        initialValue:'',
      },
      {
        label: '创建人',
        name: 'createUserName',
        Compontent: <Input placeholder="请输入" />,
        initialValue:'',
      },
      {
        label: '素材类型',
        placeholder: '请选择',
        name: 'materialContentType',
        initialValue:'',
        Compontent: (
          <Select style={{width: '150px'}}>
            {
              props.params.materialBusinssType == 1 ?
              MSG_TYPE_OPTIONS.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
              :
              FANS_TYPE_OPTIONS.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
           
          </Select>
        ),
      }
  ]

  // 选中状态
  const selectMaterial = (item) => {
    setMaterialNo(item.materialNo)
    props.recevieMaterial &&  props.recevieMaterial(item)
  }

  const renderContent = (item) => {
    if (item.materialContentType == 1) {
      return <div className={materialNo == item.materialNo ? 'active' : ''} onClick={() => selectMaterial(item)} key={item.materialNo}>
              <Texts {...item}  del={del} saveClose = {saveClose}  />
            </div> 
    } else if (item.materialContentType == 3) {
      return <div className={materialNo == item.materialNo ? 'active' : ''} onClick={() => selectMaterial(item)} key={item.materialNo}>
                <Images {...item}   del={del} saveClose = {saveClose} onClick={() => selectMaterial(item)} />
              </div>
    } else if (item.materialContentType == 43) {
      return <div className={materialNo == item.materialNo ? 'active' : ''} onClick={() => selectMaterial(item)} key={item.materialNo}>
                <Videos  {...item} del={del} saveClose = {saveClose} onClick={() => selectMaterial(item)} />
              </div>
    } else if (item.materialContentType == 49) {
      return <div className={materialNo == item.materialNo ? 'active' : ''} onClick={() => selectMaterial(item)} key={item.materialNo} > 
                <Link  {...item} del={del} saveClose = {saveClose} onClick={() => selectMaterial(item)} />
              </div>
    } else if (item.materialContentType == 50) {
      return  <div className={materialNo == item.materialNo ? 'active' : ''} onClick={() => selectMaterial(item)} key={item.materialNo}>
                  <File  {...item}   del={del} saveClose = {saveClose} onClick={() => selectMaterial(item)} />
                </div>
    }  else if (item.materialContentType == 51) {
      return  <div className={materialNo == item.materialNo ? 'active' : ''} onClick={() => selectMaterial(item)} key={item.materialNo}>
                  <Wechat  {...item}   del={del} saveClose = {saveClose} onClick={() => selectMaterial(item)} />
              </div>
    }
  }
  
  const onClose = () => {
    setVisible(false)
  }
  const onSaveClose = () => {
    setVisible(false)
    const params2 = {
      ...params,
      page: '1',
    }
    getList(params2)
  }

  const saveClose = () => {
    const params2 = {
      ...params,
      page: '1',
    }
    getList(params2)
  }

  return (
    <div className={styles.main}>
      <SearchForm
        formItem={formItem}
        getParams={getParams}
      >
        <Button style={{ marginLeft: 8 }} onClick={() => setVisible(true)}>+添加素材</Button>
      </SearchForm>
      <div className={styles.newsMain} >
        {
         list.length !=0 && list.map((item, i) => (
            renderContent(item)
          ))
        }
    
      </div>
      {
          list.length == 0 &&
          <div className='tac' style={{marginTop: '20px'}}>
            暂无数据
          </div>
        }
      <Pagination  {...pagination} className={styles.paging} />
      {
        visible && 
        <Edit
          index={-1}
          item={item}
          onSaveClose={onSaveClose}
          visible={visible}
          onClose={onClose}
        />
      }
    
    </div>
  )
}
export default Main