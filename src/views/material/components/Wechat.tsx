import React, { Component } from 'react';
import Card from './Card'
import { IProps } from './interface'
import * as styles from './index.scss'
const Wechat = (props:IProps) => {
  return(
    <div className={styles.texts}>
      <Card
        {...props}
      >
        <h4 className={styles.omit}>{props.materialName}</h4>
        <p className={styles.creat}>
          <span>{props.createUserName}</span>
          <span style={{marginLeft: '30px'}}>{props.createAt}</span>
        </p>
        <div className={styles.contentWechat}>
          <img src={props.appCoverUrl} alt=""/>
        </div>
      </Card>
    </div>
  )
}
export default Wechat