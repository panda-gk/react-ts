import React, { Component, useState, useEffect, useRef } from 'react';
import { Input, Spin, Modal, Tabs, Form, Upload, Icon, Button, Radio, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const { TabPane } = Tabs;
const { TextArea } = Input;
import * as styles from './index.scss'
import API from '../../../api'
import Emoji from '../../../components/Emoji'

import config from '../../../config'

interface IProps extends FormComponentProps {
  item: any,
  index: number | string,
  visible: boolean,
  onClose: () => void,
  onSaveClose: ()=> void,
  onOk: () => void,

}
const Edit = (props:IProps) => {
  const { item, index, visible } =  props
  const [disabled, setDisabeld] = useState(false)

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form

  const [tabIndex, setTabIndex] = useState(String(item.materialContentType))

  const [imgUrl, setImgUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('') // 文件名称

  const [weChatUrl, setWeChatUrl] = useState('') // 小程序封面
  const [weChatUrlLogo, setWeChatUrlLogo] = useState('') // 小程序logo

  const [imgUrls, setImgUrls] = useState([])

  const [textContent, setTextContent] = useState('') // 朋友圈文本
  const [fansTextContent, setFansTextContent] = useState('') // 朋友圈评论
  const [wechatContent, setWechatContent] = useState('') // 小程序链接文本

  const [linkUrl, setLinkUrl] = useState('')

  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    const tabIndex = String(item.materialContentType)
    if(tabIndex == '1') {
      setTextContent(item.content)
    } else if (tabIndex == '3') {
      if (item.materialBusinssType == '1') {
        setImgUrl(item.content)
      } else {
        setFansTextContent(item.textContent)
        setImgUrls((item.content && item.content.split(',')) || [] )
      }
    } else if (tabIndex == '43') {
      if (item.materialBusinssType == '1') {
          setVideoUrl(item.content)
      } else {
        setFansTextContent(item.textContent)
        setVideoUrl(item.content)
      }
    } else if (tabIndex == '49'){
      if (item.materialBusinssType == '1') {
        setLinkUrl(item.content)
      } else {
        setFansTextContent(item.textContent)
        setLinkUrl(item.content)
      }
    } else if (tabIndex == '50') {
      setFileUrl(item.content)
      setFileName(item.fileName)
    } else if (tabIndex == '51') {
      setWeChatUrl(item.appCoverUrl)
      setWechatContent(item.content)
      setWeChatUrlLogo(item.appLogoUrl)
    }
  }, [index])


  const submit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // 普通素材 图文
        if (tabIndex == '3' && item.materialBusinssType == '1' && !imgUrl) {
          message.error('请上传图片')
          return
        }
        if (tabIndex == '43' && !videoUrl) {
          message.error('请上传视频')
          return
        }
        if (tabIndex == '50' && !fileUrl) {
          message.error('请上传文件')
          return
        }
        if (tabIndex == '51' && !weChatUrl) {
          message.error('请上传小程序封面图')
          return
        }
        if (tabIndex == '51' && !weChatUrlLogo) {
          message.error('请上传小程序logo')
          return
        }
        if(disabled) return
        setDisabeld(true)
        // 文本
        let params = {
        }
        if (tabIndex == '1') {
          params = {
            materialNo: item.materialNo || null,
            materialName: values.materialName,
            materialContentType: tabIndex,
            materialBusinssType: item.materialBusinssType,
            content: values.textContent,
          }
          // 图文
        } else if (tabIndex == '3') {
         
          // 普通素材
          if(item.materialBusinssType == '1') {
            params = {
              materialNo: item.materialNo || null,
              materialName: values.materialName,
              materialContentType: tabIndex,
              materialBusinssType: item.materialBusinssType,
              content: imgUrl
            }
          // 朋友圈素材
          
          } else {
            params = {
              materialNo: item.materialNo || null,
              materialName: values.materialName,
              materialContentType: tabIndex,
              materialBusinssType: item.materialBusinssType,
              content: imgUrls.join(),
              tapLike: values.tapLike,
              comment: values.comment,
              textContent: values.fansTextContent
            }
          }
          // 视频
        } else if (tabIndex == '43') {
          if(item.materialBusinssType == '1') {
            params = {
              materialNo: item.materialNo || null,
              materialName: values.materialName,
              materialContentType: tabIndex,
              materialBusinssType: item.materialBusinssType,
              content: videoUrl,
            }
           } else {
            params = {
              materialNo: item.materialNo || null,
              materialName: values.materialName,
              materialContentType: tabIndex,
              materialBusinssType: item.materialBusinssType,
              content: videoUrl,
              tapLike: values.tapLike,
              comment: values.comment,
              textContent: values.fansTextContent,
            }
          }
    
          // 链接
        } else if (tabIndex == '49') {
          if(item.materialBusinssType == '1') { 
            params = {
              materialNo: item.materialNo || null,
              materialName: values.materialName,
              materialContentType: tabIndex,
              materialBusinssType: item.materialBusinssType,
              content: values.linkUrl,
              linkTitle: values.linkTitle,
              linkImgUrl: values.linkImgUrl,
              linkContent: values.linkContent
            }
          } else {
            params = {
              materialNo: item.materialNo || null,
              materialName: values.materialName,
              materialContentType: tabIndex,
              materialBusinssType: item.materialBusinssType,
              content: values.linkUrl,
              linkTitle: values.linkTitle,
              linkImgUrl: values.linkImgUrl,
              linkContent: values.linkContent,
              textContent:values.fansTextContent,
              tapLike: values.tapLike,
              comment: values.comment,
            }
          }
          // 文件
        } else if (tabIndex == '50') {
          params = {
            materialNo: item.materialNo || null,
            materialName: values.materialName,
            materialContentType: tabIndex,
            materialBusinssType: item.materialBusinssType,
            content: fileUrl,
            fileName:fileName,
          }
          // 小程序
        } else if (tabIndex == '51') {
          params = {
            ...values,
            materialNo: item.materialNo || null,
            materialName: values.materialName,
            materialContentType: tabIndex,
            materialBusinssType: item.materialBusinssType,
            content: values.wechatContent,
            appCoverUrl:weChatUrl,
            appLogoUrl:weChatUrlLogo
          }
          // 小程序
        }

        API.id43365(params).then(res => {
          setDisabeld(false)
          message.success('操作成功')
          props.onSaveClose()
        }).catch(err => {
          setDisabeld(false)
          console.log(err)
        })
      }
    });
  }

  const onClose = () => {
    // console.log('关闭')
    props.onClose()

  }



  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    },
  };


  const getTabs = (num) => {
    setTabIndex(num)
  }
  // 上传图片
  const uploadImgProps = {
    name: 'file',
    method:'post',
    data: {
      mediaType: 5
    },
    action: `${config.API_BASE_URL}/api/fileUpload/upload`,
    showUploadList: false,
    onChange(info) {
      console.log(info)
      setSpinning(true)
      if (info.file.status == 'done') {
        // 消息素材
        if (tabIndex == '3') {
          if(item.materialBusinssType == 1) {
            setImgUrl(info.file.response.data.fullPath)
          } else {
            const arr = imgUrls
            arr.push(info.file.response.data.fullPath)
            setImgUrls(arr)
          }
          // 视频
        } else if(tabIndex == '43'){
          setVideoUrl(info.file.response.data.fullPath)
          // 文件
        } else if (tabIndex == '50') {
          setFileUrl(info.file.response.data.fullPath)
          setFileName(info.file.response.data.fileName)
        } else if (tabIndex == '51') {
          setWeChatUrl(info.file.response.data.fullPath)
        }
        setSpinning(false)
       
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setSpinning(false)
      }
    },
  }
  const uploadImgProps2 = {
    ...uploadImgProps,
    onChange(info) {
      setSpinning(true)
      if (info.file.status == 'done') {
        setWeChatUrlLogo(info.file.response.data.fullPath)
        setSpinning(false)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setSpinning(false)
      }
    }
  }
  // 删除图片
  const delImg = (num) => {
    const imgArr = JSON.parse(JSON.stringify(imgUrls))
    imgArr.forEach((el, i, arr) => {
      if (i == num) {
        arr.splice(i,1)
      }
    })
    setImgUrls(imgArr)
  }

  const receiveFansContent = (str) => {
    const ipt = document.querySelector('#fansTextContent')
    setFieldsValue({
      fansTextContent: insertion(ipt, 'fansTextContent', str )
    })
  }

  const receiveTextContent = (str) => {
    const ipt = document.querySelector('#textContent')
    setFieldsValue({
      textContent: insertion(ipt, 'textContent', str )
    })
  }

  const receiveDiscuss = (str) => {
    const ipt = document.querySelector('#comment')
    setFieldsValue({
      comment: insertion(ipt, 'comment', str )
    })
  }
  
  // 插入表情
  const insertion = (ele, key, str) => {
    const start = ele.selectionStart
    const end = ele.selectionEnd
    const iptVal = getFieldValue(key) || ''
    const startStr = iptVal.substring(0, start)
    const endStr = iptVal.substring(end, iptVal.length)
    return `${startStr}${str}${endStr}`
  
  }

  return(
      <Modal
        title={ index > -1 ? '编辑素材' : '新增素材'}
        visible={visible}
        onOk={submit}
        style={{width: '800px'}}
        className={styles.edit}
        onCancel={() => onClose()}
        destroyOnClose={true}
      >
       <Form onSubmit={submit} className="login-form" {...formItemLayout}>
        <Form.Item label="素材标题">
            {getFieldDecorator('materialName', {
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
              initialValue: item.materialName
            })(<Input />)}
        </Form.Item>
        {
          item.materialBusinssType == 3 &&
          <Form.Item label="朋友圈内容" className='fansTextContent'>
            <Emoji receive={receiveFansContent }/>
              {getFieldDecorator('fansTextContent', {
                rules: [
                  {
                    required: true,
                    message: '请输入',
                  },
                ],
                initialValue: fansTextContent
              })(<TextArea rows={6}/>)}
          </Form.Item>
        }
        <div style={{margin: '0 20px'}}>
          <Tabs defaultActiveKey={tabIndex} onChange={getTabs}>
            {
              item.materialBusinssType == 1 &&
              <TabPane tab="文本" key="1" >
                {
                  tabIndex == '1' && 
                  <Form.Item  label="文本内容" className='fansTextContent'>
                    <Emoji receive={receiveTextContent }/>
                    {getFieldDecorator('textContent', {
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                      initialValue: textContent
                    })(<TextArea id='textContent'  />)}
                  </Form.Item>
                }
              </TabPane>
            }
        
            <TabPane tab={  item.materialBusinssType == 1 ?'图片': '图文'} key="3">
              {/* 普通素材上传一张图片 */}
              {
                item.materialBusinssType == 1 &&
                <div>
                  <img src={imgUrl} alt="" style={{width: '100px', height: '100px'}} />
                  <Upload {...uploadImgProps} style={{marginLeft:' 20px'}} disabled={spinning}  accept="image/*">
                    <Button>
                      <Icon type="upload"  /> {!spinning ? '上传图片' : '上传中...'} 
                    </Button>
                  </Upload>
                </div>
              }
              {
                item.materialBusinssType == 3 &&
                <div>
                  {
                    imgUrls.map((el, i) => (
                      <div className={styles.imgUrls} key={i}>
                         <img src={el} alt="" style={{width: '100px', height: '100px'}} />
                         <Icon type="close" onClick={() => delImg(i)} className='close' />
                      </div>
                    ))
                  }
                  {
                    imgUrls.length < 9 &&    
                    <Upload {...uploadImgProps} style={{margin:'20px'}} disabled={spinning}>
                      <Button>
                        <Icon type="upload" /> {!spinning ? '上传图片' : '上传中...'} 
                      </Button>
                    </Upload>
                  }
                </div>
              }
            </TabPane>
            <TabPane tab="视频" key="43">
              <div style={{display:'flex', alignItems:'center'}}>
               {videoUrl && <video src={videoUrl}  controls style={{width: '100px', height: '110px',border: '1px solid #ccc'}} />}  
                <Upload {...uploadImgProps} style={{marginLeft:' 20px'}} disabled={spinning}>
                  <Button>
                    <Icon type="upload"  /> {!spinning ? '上传视频' : '上传中...'} 
                  </Button>
                </Upload>
              </div>
            </TabPane>
            <TabPane tab="链接" key="49">
              {
                tabIndex == '49' && 
                <div>
                  <Form.Item label="链接地址">
                    {getFieldDecorator('linkUrl', {
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                      initialValue: linkUrl
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="链接标题">
                    {getFieldDecorator('linkTitle', {
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                      initialValue: item.linkTitle
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="自定义图片url">
                    {getFieldDecorator('linkImgUrl', {
                      initialValue: item.linkImgUrl
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="链接内容">
                      {getFieldDecorator('linkContent', {
                        rules: [
                          {
                            required: true,
                            message: '请输入',
                          },
                        ],
                        initialValue: item.linkContent
                      })(<TextArea />)}
                    </Form.Item>
                </div>
              }
            </TabPane>
            {
              item.materialBusinssType == 1 &&
              <TabPane tab="文件" key="50" >
                  <p>{fileUrl}</p>
                  <Upload {...uploadImgProps}  disabled={spinning} accept='.rar,.zip,.doc,.docx,.pdf'>
                    <Button>
                      <Icon type="upload" />  {!spinning ? '上传文件' : '上传中...'}
                    </Button>
                    <p>支持扩展名：.rar .zip .doc .docx .pdf</p>
                  </Upload>
              </TabPane>
            }
           {
             item.materialBusinssType == 1 && 
             <TabPane tab="小程序" key="51">
                <Form.Item label="小程序封面" >
                  <img src={weChatUrl} alt="" style={{width: '100px', height: '100px', marginRight:'8px'}}  />
                  <Upload {...uploadImgProps} disabled={spinning}  accept="image/*">
                    <Button>
                      <Icon type="upload" /> {!spinning ? '小程序封面' : '上传中...'} 
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item label="小程序logo" >
                  <img src={weChatUrlLogo} alt="" style={{width: '100px', height: '100px', marginRight:'8px'}}  />
                  <Upload {...uploadImgProps2} disabled={spinning}  accept="image/*">
                    <Button>
                      <Icon type="upload" /> {!spinning ? '小程序logo' : '上传中...'} 
                    </Button>
                  </Upload>
                </Form.Item>
                {
                  tabIndex == '51' &&
                    <div>
                      <Form.Item label="小程序链接" style={{marginTop: '20px'}}>
                        {getFieldDecorator('wechatContent', {
                          rules: [
                            {
                              required: true,
                              message: '请输入',
                            },
                          ],
                          initialValue: wechatContent
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="小程序标题" style={{marginTop: '20px'}}>
                        {getFieldDecorator('appTitle', {
                          rules: [
                            {
                              required: true,
                              message: '请输入',
                            },
                          ],
                          initialValue: item.appTitle
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="小程序名称" style={{marginTop: '20px'}}>
                        {getFieldDecorator('appDisplayName', {
                          rules: [
                            {
                              required: true,
                              message: '请输入',
                            },
                          ],
                          initialValue: item.appDisplayName
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="小程序userName" style={{marginTop: '20px'}}>
                        {getFieldDecorator('appUsername', {
                          rules: [
                            {
                              required: true,
                              message: '请输入',
                            },
                          ],
                          initialValue: item.appUsername
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="小程序appid" style={{marginTop: '20px'}}>
                        {getFieldDecorator('appAppid', {
                          rules: [
                            {
                              required: true,
                              message: '请输入',
                            },
                          ],
                          initialValue: item.appAppid
                         })(<Input />)}
                      </Form.Item>
                    </div>
                }
              </TabPane>
           }
          </Tabs>
        </div>
        {
          item.materialBusinssType == 3 &&
          <Form.Item label="朋友圈点赞" style={{marginTop: '20px'}}>
            {getFieldDecorator('tapLike', {
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
              initialValue: String(item.tapLike),
            })(
              <Radio.Group>
                <Radio value="0">取消点赞</Radio>
                <Radio value="1">点赞</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        }
        {
          item.materialBusinssType == 3 && 
          <Form.Item label="评论内容"  className='fansTextContent'>
            <Emoji receive={receiveDiscuss }/>
            {getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
              initialValue: String(item.comment),
            })(<TextArea id='comment' />)}
          </Form.Item>
        }
       </Form>
      </Modal>
  )
}
export default  Form.create()(Edit)