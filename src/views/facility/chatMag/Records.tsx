import React, { useState, useEffect, useRef } from 'react';
import API from '../../../api'
import {useSize}  from '../../../useHooks/useSize'
import { Tabs, Tag, Input, Button  } from 'antd'
import moment from 'moment'
const { TabPane } = Tabs;
const { TextArea } = Input;
import * as styles from './index.scss'
import Emoji from '../../../components/Emoji'
import Material from './Material'
import default_file  from '../../../assets/default_file.png'

interface IProps {
  weChat: any,
  fan: any,
}
const msgTypeDat = [
  {
    value: '',
    text: '全部',
  },
  {
    value: '1',
    text: '文本',
  },
  {
    value: '3',
    text: '图片',
  },
  {
    value: '33',
    text: '小程序',
  },
  {
    value: '35',
    text: '文件',
  },

  {
    value: '49',
    text: '链接',
  },
]
const Records = (props:IProps) => {
  const { weChat, fan } = props
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [textVal, setTextVal] = useState('')

  const [params, setParams] = useState({
    page:1,
    userNo: fan.userNo,
    storeNo: weChat.storeNo,
    msgType: ''
  })
  const chatRef = useRef()
  const text = useRef()

  const height = useSize().y - 94

  useEffect(() => {
    getRecords()
  }, [params])

  
  const getRecords = async () => {
    const params2 = {
      ...params,
      rows: 10,
    }
    
    const res = await API.id41616(params2)
    let lists = []
    if (res.total > list.length) {
      lists = [...res.records, ...list]
      setList(lists)
      setTotal(res.total)
    }
    
    if(params.page == 1 ) {
      chatRef.current.scrollTo(0,99999)
    }
  }

  const lookMore = () => {
    let num = params.page
    ++num
    const params2 = {
      ...params,
      rows: 10,
      page: num
    }
    setParams(params2)
  }

  const newsText = (item) => {
    return(
      <div className={`${styles.news} ${styles.news}-${item.senderType}`}>
        {/* 文本 */}
        {
          item.msgType == 1 &&
          <p className={`${styles.text} ${styles.text}-${item.senderType}`}  style={{wordBreak: 'break-all', textAlign:'left'}} >
            {item.msgContent}
          </p>
        }
        {/* 图片 */}
        {
          item.msgType == 3 &&
          // <p className={styles.headImg}>
            <div style={{marginTop: '10px'}}>
              <img src={item.msgContent} className={styles.material} alt=""/>
            </div>
          // </p>
        }
        {/* 文件 */}
        {
          item.msgType == 35 &&
          <div className={styles.fileMaterial}>
            <p>{item.materialFile.file_name}</p>
            <img src={default_file} alt=""/>
          </div>
        }
        {/* 小程序 */}
        {
          item.msgType == 33 &&
          <div className={styles.weChatMaterial}>
            <p className={styles.wechatMateriaTitle}>
              <img src={item.materialApplet.app_logo_url} alt=""/>
              <span>{item.materialApplet.app_username}</span>
            </p>
            <img className={styles.wechatMateriaPic} src={item.materialApplet.applet_cover_url}  alt=""/>
            <p className={styles.wechatMateriaTip}>小程序</p>
          </div>
        }
          {/* 视频 */}
         {
          item.msgType == 43 &&
         <div style={{marginTop: '10px'}}>
           <video src={item.msgContent}  className={styles.material} controls  ></video>
         </div>
        }
        {/* 链接 */}
        {
          item.msgType == 49 &&
          <p  className={styles.video}  style={{wordBreak: 'break-all', textAlign:'left'}}>{item.msgContent}</p>
        }
      </div>
    )
  }

  const tabClick = (msgType) => {
    const params2 = {
      ...params,
      page:1,
      msgType,
    }
    setList([])
    setParams(params2)
  }
  // 接受表情
  const receiveEmoji = (emo) => {
    const textEl = document.getElementById('text')
    setTextVal(insertion(textEl, emo ))
  }

  // 插入表情
  const insertion = (ele, str) => {
    const start = ele.selectionStart
    const end = ele.selectionEnd
    const iptVal = textVal
    const startStr = iptVal.substring(0, start)
    const endStr = iptVal.substring(end, iptVal.length)
    return `${startStr}${str}${endStr}`
  
  }

  // 推送文本
  const send = (material) => {
   if(!textVal && !material) return
   let msg
   if (material) {
    msg = material
   } else {
    msg = {
      nickName: weChat.storeWxNickName,
      msgType: 1,
      senderType: 1,
      msgContent: textVal,
      headImg: weChat.profilePhotoUrl
    }
   }
   msg.sendTime = moment().format('YYYY-MM-DD HH:mm:ss')
   console.log(msg)
    // 文本
    setList([...list, msg])
    // 滚动
    setTimeout(() => {
      const h = chatRef.current.scrollHeight
      chatRef.current.scrollTo(0, h)
    }, 0)
    setTextVal('')
  }
  // 推送素材
  const sendrecevieMaterial = (item) => {
    console.log(item)
    let msg = {
      nickName: weChat.storeWxNickName,
      msgType: item.msgType,
      senderType: 1,
      msgContent: '',
      headImg: weChat.profilePhotoUrl,
      materialApplet: {},
      materialFile: {}
    }

    if (item.msgType == 1) {
      msg.msgContent =  item.materialText.content
    } else if (item.msgType == 3) {
      msg.msgContent =  item.materialPic.img_url
      // 小程序
    } else if (item.msgType == 33) {
      msg.materialApplet =  item.materialApplet
      // 文件
    } else if (item.msgType == 35) {
      msg.materialFile =  item.materialFile
      // 视频
    } else if (item.msgType == 43) {
      msg.msgContent =  item.materialVideo.file_url
      // 分享链接
    }  else if (item.msgType == 49) {
      msg.msgContent =  item.materialLink.link_url
    } 
    send(msg)
  }
  return(
    <div className={styles.records} style={{height: `${height}px`}}>
      <span>消息记录  <Tag color="geekblue">{fan.nickName}</Tag></span>
      <Tabs defaultActiveKey=""  onTabClick={tabClick}>
        {
          msgTypeDat.map((tab, index) => (
            <TabPane tab={tab.text} key={tab.value} ></TabPane>
          ))
        }
      </Tabs>
      <ul className={styles.recordsBox} ref={chatRef}>
        {
         (( list.length < total && total > 10) &&  list.length !== 0 ) &&
          <li className={styles.lookMore} onClick={lookMore}>查看更多</li>
        }
        {
          list.length == 0 &&
          <li  className='tac'>暂无数据</li>
        }
        {
          list.map((item, index) => (
            // 1 自己 2客户
            item.senderType == 2 ?
            (
              <li key={index} className='clearfix' >
                <div className={`${styles.recordsItem} fl`} >
                  <img src={item.headImg} className={styles.headerImg} alt=""/>
                  <div  className='flex1'>
                    <a className={styles.nickName}>{item.nickName} {item.sendTime}</a>
                    {newsText(item)}
                  </div>
                </div>
              </li>
            )
            :
            (
              <li key={index}  className='clearfix' >
                <div className={`${styles.recordsItem} fr ${styles.recordsItem2}`}>
                  <div className='flex1'>
                    <p className={`${styles.nickName} tar`}>{item.sendTime} {item.nickName} </p>
                    {newsText(item)}
                  </div>
                  <img className={styles.headerImg} src={item.headImg} alt=""/>
                </div>
              </li>
            )
          ))
        }
      </ul>
      <div className={styles.sendBox}>
        <div className={styles.sendBoxTitle}>
          <Emoji
            receive={receiveEmoji} 
          />
          &nbsp;
          <Material
            recevieMaterial={sendrecevieMaterial}
          />
        </div>
        <div className={styles.sendBoxMain}>
          <TextArea 
            style={{maxHeight: '100%', minHeight: '70%', resize:'none'}} 
            onChange={(e) => setTextVal(e.target.value)}
            ref={text}
            id='text'
            value={textVal}
          />
          <Button  type="primary" className='fr' style={{marginTop: '5px'}}  onClick={() => send('')} >发送</Button>
        </div>
      </div>
    </div>
  )
}
export default Records