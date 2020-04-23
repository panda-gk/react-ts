import React, { Component } from 'react';
import Card from './Card'
import { IProps } from './interface'
import * as styles from './index.scss'
const Images = (props:IProps) => {
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
        {
          props.materialBusinssType == 3 &&
          <p className='textContent'>
            {props.textContent}
          </p>
        }
        {
         props.materialBusinssType == 1 ?
         <div className={styles.contentImg}>
            <img src={props.content} alt=""/>
          </div>
          :
          <div className={styles.contentImgs}>
            {
              (props.content.split(',')).map((el, i) => el &&  <img src={el} key={i} alt=""/> )
            }
          </div>
          
        }
        <div className='discuss'>
            {
              String(props.tapLike) == '1' && props.materialBusinssType == 3 &&
                <div className={styles.praise}>
                <i className='iconfont-guanzhu iconfont' style={{fontSize: '12px'}}></i> 点赞
              </div>
            }
            {
                props.materialBusinssType == 3 &&
                <div className={`${styles.comment}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;评论：<span>{props.comment}</span>
                </div>
            }
        </div>
     
      </Card>
    </div>
  )
}
export default Images