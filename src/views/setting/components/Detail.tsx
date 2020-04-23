import React, { Component, useState, useEffect } from 'react';
import { Input, Select, Modal, message, Form, Button, Icon, Menu, Dropdown,  Checkbox, Row, Radio, DatePicker } from 'antd'
import API from '../../../api'
import * as styles from './index.scss'

interface IProps {
  list: any,
  index: number,
  visible: boolean,
  onClose: () => void,
  type:number,
}
const Detail = (props:IProps) => {
  const { visible, onClose, list, index, type } =  props

  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    const item = list[index]
    getList(item.massNo || item.momentsNo)
  }, [index])

  const getList = async (businessCode) => {
    const params = {
      businessType: type,
      businessCode
    }
    const res = await API.id44001(params)
    setMsgs(res)
  }

  return(
    <Modal
      title='任务明细'
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
      bodyStyle={{maxHeight:'500px', overflow: 'auto'}}
      destroyOnClose={true}
    >
      <div>
        {
          msgs.map((el,i) =>  <p key={i}> {el.operateTime} {el.operateDesc}</p> )
        }
      </div>
    </Modal>
  )
}
export default Detail