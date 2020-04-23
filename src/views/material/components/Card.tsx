import React, { Component, useState } from 'react';
import* as styles from './index.scss'
import { Tag, Modal, message  } from 'antd';
import { IProps } from './interface'
import { MSG_TYPE, FANS_MSG_TYPE } from '../../../constants'
import default_file  from '../../../assets/default_file.png'
import API from '../../../api'
import Edit from './Edit'


const { confirm } = Modal;
const Card = (props:IProps) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [btnDisabled, setBtnDisabled ] = useState(false)
  const [visible, setVisible  ] = useState(false)

  const showConfirm = () => {
    confirm({
      title: '删除',
      content: '确定要删除该素材吗？',
      onOk() {
        isDel()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  const isDel = async () => {
    const params = {
      materialNo: props.materialNo,
    }
    if (btnDisabled) return
      setBtnDisabled(true)
    try {
    await API.id43371(params)
      setBtnDisabled(false)
      message.success('操作成功')
      props.del(true)
    } catch (error) {
     setBtnDisabled(false)
    }
  }

  const onClose = () => {
    setVisible(false)
  }
  const onSaveClose = () => {
    setVisible(false)
    props.saveClose()
  }


  return(
    <div className={styles.card} >
      <div className={styles.content}> 
        {props.children}
      </div>
      <div className={styles.footer}>
        <span onClick={() => setPreviewVisible(true)}>预览</span>
        <span onClick={() => setVisible(true)}>编辑</span>
        <span onClick={showConfirm}>删除</span>
      </div>
      <div className={styles.tags}>
        <Tag color="orange">{ props.materialBusinssType == 1 ? MSG_TYPE[props.materialContentType] : FANS_MSG_TYPE[props.materialContentType]}</Tag>
      </div>
      {/* 预览 */}
      <Modal
        title={props.materialName}
        visible={previewVisible}
        onOk={() => setPreviewVisible(false)}
        okText='关闭'
        className={styles.preview}
        destroyOnClose={true}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        >
          {/* 文本 */}
          {
            props.materialContentType == 1 &&
            <div className={styles.contentText}>
              {props.content}
            </div>
          }
          {/* 图片 图文 */}
          {
             props.materialContentType == 3 &&
             <div>
                {
                  props.materialBusinssType == 3 &&
                  <p  className='textContent'>
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
                      
                      ((props.content.split(',')) || []).map((el, i) => el && <img src={el} key={i} alt=""/> )
                    }
                  </div>
                  
                }
                <div className='discuss'>
                  {
                    props.tapLike == '1' && props.materialBusinssType == 3 &&
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
             
             </div>
          }
          {/* 视频 */}
          {
             props.materialContentType == 43 &&
            <div className={styles.contentVideo}>
              {
                  props.materialBusinssType == 3 &&
                  <p  className='textContent'>
                    {props.textContent}
                  </p>
              }
              <video src={props.content} controls ></video>
              <div className='discuss'>
                {
                  props.tapLike == '1' && props.materialBusinssType == 3 &&
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
               
            </div>
          }
          {/* 链接 */}
          {
            props.materialContentType == 49 &&
            <a className={styles.contentLink} style={{display: 'block'}} href={props.content} target='_blank'>
              {
                props.materialBusinssType == 3 &&
                <p className='textContent'>
                  {props.textContent}
                </p>
              }
              <p className={`${styles.title}`}>
                {props.linkTitle}
              </p>
              <div className={styles.main}>
                <div>
                  {props.linkContent}
                </div>
                <img src={props.linkImgUrl} alt=""/>
              </div>
              <div className='discuss'>
                {
                  props.tapLike == '1' && props.materialBusinssType == 3 &&
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
           
            </a>
          }
          {/* 文件 */}
          {
            props.materialContentType == 50 &&
            <div className={styles.contentFile}>
              <a href={props.content} download={props.content} className='download'>
                {props.fileName}
                <img src={default_file} alt=""/>
              </a>
             
            </div>
          }
          {/* 小程序 */}
          {
            props.materialContentType == 51 &&
            <div className={styles.contentWechat}>
              <img src={props.appCoverUrl} alt=""/>
            </div>
          }
        </Modal>
      {
        visible && 
        <Edit
          index={props.materialNo}
          item={props}
          visible={visible}
          onSaveClose={onSaveClose}
          onClose={onClose}
        />
      }
    </div>
  )
}
export default Card