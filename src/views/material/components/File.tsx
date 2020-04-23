import React, { Component } from 'react';
import Card from './Card'
import { IProps } from './interface'
import * as styles from './index.scss'
import default_file  from '../../../assets/default_file.png'
const File = (props:IProps) => {
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
        <div className={styles.contentFile}>
          {props.fileName}
          <img src={default_file} alt=""/>
        </div>
      </Card>
    </div>
  )
}
export default File