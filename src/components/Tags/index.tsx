import React, { Component, useEffect, useState } from 'react';
import { Button, Tag, Modal,  Input, message, Icon } from 'antd'
const { Search } = Input;
const { CheckableTag } = Tag;
import API from '../../api'
import * as styles from './index.scss'
interface IProps {
  visible:boolean,
  onClose: () => void,
  onOk: () => void,
  info: any,
  tagList: any,
  weChat: any
}

let disabled = false
const Tags = (props:IProps) => {

  const { visible, onClose, tagList, info, onOk, weChat } =  props

  const [ labels, setLabels ] = useState([])

  const submit = async () => {
    const fakeLabels = []
    labels.forEach(el => {
      if (el.checked) {
        fakeLabels.push(el.tagNo)
      }
    })
    const params = {
      userNo: info.userNo,
      tagNos:fakeLabels,
      storeNo: weChat.storeNo
    }
    if (disabled) return
    disabled = true
      try {
        await API.id44109(params)
        disabled = false
        onOk()
      } catch (error) {
        disabled = false
      }
  }


  const getTags = async () => {
    const params =  {
      storeNo: weChat.storeNo,
      userNo: info.userNo,
    }
    const res = await API.id43851(params)
    res.forEach((el, i) => {
      el.checked = false
    })
    setLabels(res)
  }

  const selectTag = (val, index) => {
    const fakelabels = JSON.parse(JSON.stringify(labels))
    fakelabels[index].checked = val
    setLabels(fakelabels)
  }

  // 新增标签
  const addTag = async (value) => {
    if (!value) return
    const params = {
      tagName:value,
      storeNo: weChat.storeNo
    }
    if (disabled) return
    disabled = true
    try {
      await API.id43869(params)
      message.success('添加成功')
      disabled = false
      getTags()
    } catch (error) {
      disabled = false
    }
  }

  useEffect(() => {
    getTags()
    disabled = false
  }, [info])

  return(
    <Modal
      title="标签"
      visible={visible}
      onOk={submit}
      onCancel={onClose}
      bodyStyle={{maxHeight: '500px', overflow: 'auto'}}
      okText="确认"
      cancelText="取消"
    >
      <div className={styles.tagsModal}>
        <Search
          placeholder="请输入"
          onSearch={value => addTag(value)}
          enterButton={'添加标签'}
          size='small'
          style={{ width: 300 }}
        />
        <h3 style={{fontWeight: '600', marginTop: '20px'}}>请选择标签</h3>
        <div className={styles.tagsMain}>
          {
            labels.map((el,i) => <CheckableTag key={i} className='checkTag' checked={el.checked} onChange={(val) => selectTag(val, i)} >{el.tagName} </CheckableTag>  )
          }
        </div>
      </div>
    </Modal>
  )
}
export default Tags