import React, { useState, useEffect } from 'react';
import WeChatList from './WeChatList'
import FansList from './FansList'
import Records from './Records'
import FansInfo from './FansInfo'
import * as styles from './index.scss'
const ChatMag = () => {

  const [weChat, setWeChat] = useState({
    storeNo: ''
  })

  const [fan, setFan] = useState({
    userNo: '',
    headImg: ''
  })

  const getWeChat = (weChat, flag) => {
    setWeChat(weChat)
  }
  
  const getFan = (fan) => {
    setFan(fan)
  }



  return(
    <div className={styles.chat}>
      {/* 微信号 */}
      <div>
        <WeChatList
          getWeChat={getWeChat}
        />
      </div>
      {/* 好友列表 */}
      {
        weChat.storeNo && 
        <div key={weChat.storeNo}>
          <FansList
            weChat={weChat}
            getFan={getFan}
          />
        </div>
      }
      {/* 聊天记录 */}
      {
        fan.userNo &&   
        <div key={fan.userNo} className='flex1' >
          <Records
            weChat={weChat}
            fan={fan}
          />
        </div>
      }
      {/* 好友信息 */}
      {
        fan.userNo && 
        <div  key={fan.headImg}>
          <FansInfo
            fan={fan}
            weChat={weChat}
          />
        </div>
      }
    
    </div>
  )
}
export default ChatMag