import React, { useState, useEffect } from 'react';
import API from '../../../api'
import { InfiniteLoader, List } from 'react-virtualized';
import {useSize}  from '../../../useHooks/useSize'
import { Input } from 'antd';
const { Search } = Input;
interface IProps {
  getWeChat: (any, flag?:boolean) => void
}
import * as styles from './index.scss'
const WeChatList = (props: IProps) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [fold, setFold] = useState(false)

  const [selectId, setSelectId] = useState(0)
  const [params, setParams] = useState({
    page:1,
    storeWxNickName: ''
  })

  const height = useSize().y - 250

  useEffect(() => {
    getWeChats()
  }, [params])

  const isRowLoaded = ({index}) => {
    return !!list[index];
  }
  
  const getWeChats = async () => {
    const params2 = {
      rows: 20,
      ...params
    }
   const res = await API.id42084(params2)
   const lists = [...list, ...res.records]
  //  console.log(lists)
   if (params.page === 1) {
    props.getWeChat(lists[0] || {})
    const storeWxNo = lists[0] ? lists[0].storeWxNo : ''
    setSelectId(storeWxNo)
   }
   setList(lists)
   setTotal(res.total)
  }

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    let num = params.page
    const storeWxNickName = params.storeWxNickName
    ++num
    const upDateParams = {
      page:num,
      storeWxNickName,
    }
    setParams(upDateParams)
  }

  const rowRenderer = ({ key, index, style}) => {
    const item = list[index]
    return (
      <div
        key={key}
        style={style}
        className={`${selectId === item.storeWxNo ? 'active' : ''} ${styles.wechatItem}`}
        onClick={() => itemClick(item, index)}
      > 
        <div className={styles.info}>
          <img src={item.profilePhotoUrl} alt=""/>
          {
            !fold && 
            <div className='flex1' style={{overflow: 'hidden'}}>
              <p className={styles.userName}>{item.storeWxNickName}</p>
              <p>{item.storeWxNo}</p>
            </div>
          }
        </div>
      </div>
    )
  }

  const getNickName = (storeWxNickName) => {

    const params = {
      page:1,
      storeWxNickName
    }
    setList([])
    setParams(params)
  }

  const itemClick = (item, index) => {
    setSelectId(item.storeWxNo)
    props.getWeChat(item, true)
  }

  const handleFold = () => {
    const flag = fold
    setFold(!flag)
  }

  return(
    <div className={`${styles.weChat} ${ fold ? 'active' : ''}`}>
      <p className={`tac ${styles.weChatTitle}`} > 
        { !fold && <span>微信号列表</span> } 
        <i className='iconfont iconfont-zhediedaohang_o flod-i' onClick={handleFold}></i>
     </p>
      
      {
        !fold && 
        <div className={styles.iptBox}>
          <Search
            placeholder="请输入昵称"
            onSearch={value => getNickName(value)}
            style={{ width: '100%' }}
          />
        </div>
      }
       <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          className='fold'
          rowCount={total}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              height={height}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={list.length}
              rowHeight={70}
              rowRenderer={rowRenderer}
              width={250}
            />
          )}
        </InfiniteLoader>,
    </div>
  )
}
export default WeChatList