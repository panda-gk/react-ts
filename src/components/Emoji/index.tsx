import React, { Component, useState } from 'react'
import { Input, Icon, Table, Button, message, Modal} from 'antd';
import emojis from './emoji.json'
import * as styles from './index.scss'
interface IProps  {
  receive: (any) => void
}
const Emoji = (props:IProps) => {

 const [visible, setVisible] = useState(false)
 

  const saveEmoji = (str) => {
    setVisible(false)
    props.receive(str)
  }
  return(
    <div className={styles.emoji}>
      <Icon type="smile" onClick={() => setVisible(true)} />
      <Modal
          title="表情"
          visible={visible}
          className={styles.emojiModal}
          footer={false}
          onCancel={() => setVisible(false)}
        >
         <div>
           {
             emojis.map((el, i) => <span className='emojiItem' onClick={() => saveEmoji(el.char)} key={i}>{el.char}</span> )
           }
         </div>
        </Modal>
    </div>
  )
}
export default Emoji