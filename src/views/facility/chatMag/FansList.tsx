import React, { useState, useEffect } from 'react';
import API from '../../../api'
import { InfiniteLoader, List } from 'react-virtualized';
import {useSize}  from '../../../useHooks/useSize'
import { Input, Tabs, Badge   } from 'antd';
const { TabPane } = Tabs;
const { Search } = Input;
import * as styles from './index.scss'
interface IProps {
  weChat: any,
  getFan: (any) => void
}
const WeChatList = (props:IProps) => {
  const { weChat } = props
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState({
    page:1,
    queryKey: '',
    msgType: '1',
    storeNo: weChat.storeNo
  })
  const [selectId, setSelectId] = useState(0)

  const height = useSize().y - 230

  useEffect(() => {
    getFans()
  }, [params])


  // useEffect(() => {
  //   if (testObj.userWxNo) {
  //     const newLists = list
  //     newLists.unshift(testObj)
  //     let newTotal = total
  //     ++ newTotal
  //     setTotal(newTotal)
  //     setList(newLists)
  //   }
    

  // }, [testObj])

  const isRowLoaded = ({index}) => {
    return !!list[index];
  }
  
  const getFans = async () => {
    const params2 = {
      ...params,
      rows: 20,
    }
   const res = await API.id41607(params2)
   const lists = [...list, ...res.records]
   if (params.page === 1) {
    // 选中的好友
    props.getFan(lists[0] || {})
    const userNo = lists[0] ? lists[0].userNo : ''
    setSelectId(userNo)
    // 第一个好友的消息数清零
    if ( lists[0] ) lists[0].memberNum = 0
  }
   setTotal(res.total)
   setList(lists)

  }

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    let num = params.page
    ++num
    const upDateParams = {
      ...params,
      page:num,
    }
    setParams(upDateParams)
  }

  const rowRenderer = ({ key, index, style}) => {
    const item = list[index]
    return (
      <div
        key={key}
        style={style}
        className={`${selectId === item.userNo ? 'active' : ''} ${styles.fansItem}`}
        onClick={() => itemClick(item, index)}
      > 
        <div className={styles.info}>
          <img src={item.headImg} alt=""/>
          <div className='flex1' style={{overflow: 'hidden'}}>
            <p className={styles.userName}>{item.nickName}  </p>
            <p>{item.userWxNo}</p>
          </div>
          <Badge count={item.memberNum} overflowCount={99} style={{marginRight:'10px'}} />
        </div>
      </div>
    )
  }

  const getNickName = (queryKey) => {

    const params2 = {
      ...params,
      page:1,
      queryKey
    }
    setList([])
    setParams(params2)
  }

  const itemClick = (item, index) => {
    // 选中的好友消息数清零
    list[index].memberNum = 0
    setSelectId(item.userNo)
    props.getFan(item)

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
  return(
    <div className={styles.fans}>
      <div>
        <Tabs defaultActiveKey="1" onChange={tabClick} >
          <TabPane tab="私聊消息" key="1">
          </TabPane>
          <TabPane tab="群聊消息" key="2">
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.iptBox}>
        <Search
          placeholder="请输入昵称"
          onSearch={value => getNickName(value)}
          style={{ width: '100%' }}
        />
      </div>
       <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
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