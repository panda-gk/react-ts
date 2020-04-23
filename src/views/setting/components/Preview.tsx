import React, { Component } from 'react';
import * as styles from './index.scss'
import { Modal } from 'antd';
 
import defaultFile from '../../../assets/default_file.png'

interface IProps  {
  replyContent: any,
  visible: boolean,
  onClose: ()=> void,
  type:number
}

const Preview = (props:IProps) => {
  const { visible, replyContent, onClose, type} = props

  const renderContent = (matter, index) => {
    return(
      <div  key={index}>
        {
          matter.materialContentType == 1 &&
          <div className='textBox mb10'>
            {matter.content}
          </div>
        }
        {
          matter.materialContentType == 3 &&
          <div className='imgBox mb10 df' >
            <img style={{maxWidth: '100%'}} src={matter.content} alt=""/>
          </div>
        }
        {
          matter.materialContentType == 43 &&
          <div className='videoBox mb10 df' >
            <video src={matter.content} controls></video>
          </div>
        }
        {/* 链接 */}
        {
          matter.materialContentType == 49 &&
          <div className='fileBox df mb10' >
            <p>{matter.linkTitle}</p>
            <div className='fileContent'>
              <div>
               {
                 matter.linkContent
               }
              </div>
              {matter.linkImgUrl && <img src={matter.linkImgUrl} alt=""/> } 
            </div>
          </div>
        }
        {/* 文件*/}
        {
          matter.materialContentType == 50 &&
          <div className='linkBox mb10 df' >
            <p>{matter.fileName}</p>
            <img src={defaultFile} alt=""/>
          </div>
        }
        {/* 小程序封面 */}
        {
          matter.materialContentType == 51 &&
          <div className='imgBox df mb10' >
            <img style={{maxWidth: '100%'}} src={matter.appCoverUrl} alt=""/>
          </div>
        }
      </div>
    )
  }

  const renderFansContent = (matter, index) => {
    return(
      <div  key={index} className='renderContent mb10'>
        <div className='renderContentMain'>
          <div className='substance'>
          {matter.textContent}
          </div>
          {
            matter.materialContentType == 3 &&
            <div className='imgBox2' >
                {
                  (matter.content.split(',')).map((el, i) => el &&  <img src={el} key={i} alt=""/> )
                }
            </div>
          }
          {
            matter.materialContentType == 43 &&
            <div className='videoBox df flex1 jcfe' >
              <video src={matter.content} controls style={{maxWidth: '100%'}}></video>
            </div>
          }
          {/* 链接 */}
          {
            matter.materialContentType == 49 &&
            <div className='fileBox df flex1 jcfe' >
              <p>{matter.linkTitle}</p>
              <div className='fileContent'>
                <div>
                {
                  matter.linkContent
                }
                </div>
                {matter.linkImgUrl && <img src={matter.linkImgUrl} alt=""/> } 
              </div>
            </div>
          }
          <div className='addition'>
            {
              matter.tapLike == 1 && 
              <div className='like'>
                <i className='iconfont-guanzhu iconfont' style={{fontSize: '12px'}}></i> 点赞
              </div>
            }
            <div className='comment'>
              &nbsp;&nbsp;&nbsp;&nbsp;评论：<span>{matter.comment}</span>
            </div>
          </div>
      </div>
    </div>
    )
  }

  return(
  // 素材内容类型 1:文本、3:图片、43:视频、49:链接、50文件、51小程序
    <div >
      <Modal
        title="查看内容"
        visible={visible}
        footer={false}
        bodyStyle={{overflow: 'auto', maxHeight:'800px'}}
        className={styles.previewModal}
        onCancel={() => onClose()}
        destroyOnClose={true}
        >

          <div  className={`${styles.editForm} previewMass`}>
            <div className={styles.materialBox2}>
                {
                  type == 3 ?
                  replyContent.map((matter, index) =>  renderFansContent(matter, index) )
                  :
                  replyContent.map((matter, index) =>  renderContent(matter, index) )
                }
            </div>
          </div>
      </Modal>
    </div>
  )
}
export default Preview