import React, { Component, useState } from 'react';
import Main from '../../material/components/Main'
import { Modal, Button, Icon } from 'antd';
import * as styles from './index.scss'

interface IProps {
  recevieMaterial?:(any) => void
}

const Material = (props:IProps) => {

  const [visible, setVisible] = useState(false)
  const [item, setItem] = useState(null)


  const send = () => {
    if (!item) return
    props.recevieMaterial(item)
    setVisible(false)
  }
  const recevieMaterial = (item) => {
    setItem(item)
  }
  return(
    <div>
      <Icon type="project" onClick={() => setVisible(true)}/>
      <Modal
        className={styles.materialModal}
        style={{width:'1000px', height:'800px'}}
        visible={visible}
        okText='发送'
        onOk={send}
        onCancel={() => setVisible(false)}
      >
        <Main  params={{materialBusinssType: 1}} recevieMaterial={recevieMaterial}></Main>
      </Modal>
    </div>
  )
}

export default Material
 