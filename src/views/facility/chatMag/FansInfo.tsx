import React, { useState, useEffect } from 'react';
import API from '../../../api'
import {useSize}  from '../../../useHooks/useSize'
import * as styles from './index.scss'
import { Button, Tag, Icon, message } from 'antd'

import {SEX_DATA, FANS_SOURCE} from '../../../constants'
import  EditForm from './EditForm'
import Tags from '../../../components/Tags'
interface IProps {
  fan: any;
  weChat: any;
}
const FansInfo = (props:IProps) => {
  const height = useSize().y - 94
  const { fan, weChat } = props
  
  const [info, setInfo] = useState({
    nickName: '',
    headImg: '',
    sex: 0,
    area: '',
    phone: '',
    makeFriendsTime: '',
    addFriendsChannel: '',
    lastChatTime: '',
    desc: '',
    userNo: ''
  })

  const [visible, setVisible] = useState(false)
  const [tagVisible, setTagVisible] = useState(false)


  const [tags, setTags] = useState([])

  useEffect(() => {
    getInfo()
    getTags()
  }, [fan])

  const getInfo = async () => {
    const params = {
      userNo: fan.userNo,
      storeNo: weChat.storeNo
    }
    const res = await API.id41625(params)
    setInfo(res)
  }

  const save = () => {
    getInfo()
    setVisible(false)
  }

  const getTags = async () => {
    const params = {
      userNo: fan.userNo,
      storeNo: weChat.storeNo
    }
    const res = await API.id43857(params)
    setTags(res)
  }

  const saveTag = () => {
    setTagVisible(false)
    getTags()
  }
  // 删除标签
  const delTag = async (item) => {
    const params = {
      tagNo: item.tagNo,
      userNo: fan.userNo,
      storeNo: weChat.storeNo
    }
    await API.id44061(params)
    message.success('删除成功')
    getTags()
  }

  return(
    <div className={styles.fansInfo} style={{height: `${height}px`}}>
      <p>客户资料</p>
      <div>
        <div className={styles.infoTitle}>
          <img src={info.headImg} alt=""/>
          <div className='oh flex1'>
            <p className='omit'>{info.nickName}</p>
            <span style={{width: '100%', display:'inline-block'}} className='omit'>{info.userWxNo}</span>
          </div>
          <a className='handelBtn' onClick={() => setVisible(true)}>编辑</a>
        </div>
        
        <div style={{marginTop: '40px'}}>
          <p>性别：{SEX_DATA[info.sex]}</p>
          <p>地区：{info.area}</p>
          <p>手机号：{info.phone}</p>
          <p>加好友时间：{info.makeFriendsTime}</p>
          <p>加好友渠道：{info.addFriendsChannel || '未知'}</p>
          <p>最后对话时间：{info.lastChatTime}</p>
          <p>备注：{info.desc}</p>
        </div>
        <div className='tag'>
          <div className='tagTitle'>
            <h3 style={{fontWeight: '600'}}>好友标签</h3>
            <Button type='link' onClick={() => setTagVisible(true)}> 打标签 </Button>
          </div>
          <div className='tagContent'>
            {
              tags.map((el, i) => <Tag 
                                    color="#f50"
                                    key={el.tagNo}
                                    style={{margin: '5px'}} 
                                    >
                                      {el.tagName}
                                      <Icon type="close" onClick={() => delTag(el)} />
                                  </Tag>)
            }
          </div>
        </div>
        {
          tagVisible && 
          <Tags
            visible={tagVisible}
            info={fan}
            tagList={tags}
            weChat={weChat}
            onClose={() => setTagVisible(false)}
            onOk={saveTag}
          />
        }
       
        <EditForm
          visible={visible}
          info={info}
          weChat={weChat}
          onClose={() => setVisible(false)}
          onOk={save}
        >
        </EditForm>
      </div>
    </div>
  )
}
export default FansInfo