import React, { Component, useEffect, useState } from 'react';
import { Input, Select, Modal, message, Form, Button, Icon, Menu, Dropdown,  Checkbox, Row, Radio, DatePicker, Col } from 'antd'
import API from '../../../api'
import * as styles from './index.scss'
import moment from 'moment'
import { FormComponentProps } from 'antd/lib/form'
import { MSG_TYPE_OPTIONS, FANS_TYPE_OPTIONS ,STATUS_OPTIONS2 } from '../../../constants'
import defaultFile from '../../../assets/default_file.png'
import UserContexts from '../../../contexts/user'
import { regs,integers } from '../../../utils/validator'


interface IProps extends FormComponentProps {
  user: any,
  visible:boolean,
  onClose: () => void,
  onOk: () => void,
  list: any,
  index:number,
  type: number,
  isLook?: false,
}

const InputGroup = Input.Group;
const { Option } = Select;

let disabled = false 


const EditForm = (props:IProps) => {
  const { visible, onClose, list, index, user, type, onOk, isLook } =  props
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const [ initialValues, setInitialValues] = useState({
    replyNo: '',
    replyName: '',
    replyContent:[],
    subSystemUserId: '',
    mainSystemUserId: '',
    replyEnable: 1,
    specialMainSystemUserId: "",
    storeList: [],
    newStoreList: [],
    massTitle: '', // 群发消息任务
    massEnable: 1,
    sendTargetType: ['1', '2'],
    sendObjectStart: 5,
    sendObjectEnd: 15 ,
    sendMsgIntStart: 2,
    sendMsgIntEnd: 5,
    sendType: 1,
    sendTime: moment(new Date(), dateFormat),
    momentsName: '',  // 群发朋友圈任务
    momentsEnable: 1,
    delDelay: '', // 删除发送朋友圈时间
    likeCommentDelay: '', // 点赞和评论时间
  })

  const [sendType, setSendType] = useState( initialValues.sendType  ) // 发送类型
  const [isDelDelay, setIsDelDelay] = useState(false ) // 是否删除朋友圈
  const [isShowLink, setIsShowLink] = useState( false ) // 点赞

  const [selectStore, setSelectStore] = useState('0')




  const [material, setMaterial] = useState([]) // 素材库列表

  const [addMaterials, setAddMaterials] = useState([]) // 添加的素材库

  const [selectMaterialIndex, setSelectMaterialIndex] = useState(null) // 选择的素材索引
  // 设备
  const [facilitys, setFacilitys] = useState([])
   // 查询子账号
   const [sonAccount, setsonAccount]  = useState([])
   // const { list, getList, pagination } = usePagenationList(API.id41751)
   // // 查询主账号
   const [mainAccount, setMainAccount]  = useState([])
  
  //  类型数据
   let typeData = {
    1:{
      value: String(initialValues.replyEnable),
      label: 'replyEnable',
      name: 'replyName',
      nameValue: initialValues.replyName
    },
    2:{
      value: String(initialValues.massEnable),
      label: 'massEnable',
      name: 'massTitle',
      nameValue: initialValues.massTitle
    },
    3:{
      value:  String(initialValues.momentsEnable),
      label: 'momentsEnable',
      name: 'momentsName',
      nameValue: initialValues.momentsName
    }
  }

   const getMainAccount = async (systemUserId) => {
    const params = {
      systemUserId
    }
    const res = await API.id41760(params)
    setMainAccount(res)
    if (index <= -1) { // 编辑数据回显
      // 新增
      // user.level != '1'
      // 主账号
      let id 
      if (user.level == 1) {
        id = ''
      } else if (user.level == 2) {
        id = user.systemUserId
        getSonAccount(id)
      } else {
        id = user.parentId
        getSonAccount(id)
      }
    } else {
      // 编辑
      getSonAccount(list[index].mainSystemUserId)
    }
  }

  const getSonAccount = async (systemUserId) => {
    const params = {
      level: user.level,
      systemUserId
    }
    const res = await API.id41751(params)
    setsonAccount(res)
  }
  
  const changeMainAccount = (value) => {
    // const {setFieldsValue } = formRef
    setFieldsValue({
      subSystemUserId: ''
    })

    getSonAccount(value)
  }


  useEffect(() => {
    if(index> -1) {
      let item = list[index]
      // 权限控制
      if (user.level == 1) {
        item.specialMainSystemUserId = item.mainSystemUserId 
      } else if (user.level == 2) {
        item.specialMainSystemUserId = user.systemUserId
      } else {
        item.specialMainSystemUserId = user.parentId
        item.subSystemUserId = user.systemUserId
      }
      item.newStoreList =  item.storeList.map(el => el && el.storeNo)
      // 1 自动回复配置 2 群发消息配置
      if (type == 1) {
        typeData[1].value = item.replyEnable
        typeData[1].nameValue = item.replyName
        setAddMaterials(item.replyContent)
      } else if (type == 2) {
        item.sendObjectStart = item.sendObjectInterval && item.sendObjectInterval.split(',')[0]
        item.sendObjectEnd=  item.sendObjectInterval && item.sendObjectInterval.split(',')[1] 
        item.sendMsgIntStart =item.sendMsgInterval && item.sendMsgInterval.split(',')[0]
        item.sendMsgIntEnd = item.sendMsgInterval && item.sendMsgInterval.split(',')[1]
        typeData[2].value = item.massEnable
        typeData[2].nameValue = item.massTitle
        setAddMaterials(item.massContent)
      } else {
        typeData[3].value = item.massStatus
        typeData[3].nameValue = item.momentsName
        setAddMaterials(item.momentsContent)
      }
      getFacilitys(item.subSystemUserId) // 获取设备
      setSendType(item.sendType) // 发送类型
      setIsDelDelay(Boolean(item.delDelay)) // 是否删除朋友圈
      setIsShowLink(Boolean(item.likeCommentDelay)) // 点赞和评论时间
      setInitialValues(list[index])
      setSelectStore(String(item.allCheck)) // 设备
    } else {
      if (user.level == 1) {
        initialValues.specialMainSystemUserId = initialValues.mainSystemUserId
      
      } else if (user.level == 2) {
        initialValues.specialMainSystemUserId = user.systemUserId
      } else {
        initialValues.specialMainSystemUserId = user.parentId
        initialValues.subSystemUserId = user.systemUserId
        getFacilitys(user.systemUserId) // 获取设备
      }
      setInitialValues(initialValues)
    }
    disabled = false
    getMainAccount(user.systemUserId)
    getMaterial(type == 3 ? 3 : 1)
  }, [index, list])

  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 16
    },
  };

  const submit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (!addMaterials.length) {
          message.error('请添加内容')
          return
        }
        if (type == 3 && addMaterials.length >  1 ) {
          message.error('朋友圈内容只能添加一项')
          return
        }
        if(isLook) {
          onClose()
          return
        }
        if (disabled) {
          message.error('正在提交中...')
          return
        }
        disabled = true
        if (type == 1) {
          const params = {
            ...values,
            replyNo:  list[index] && list[index].replyNo || '',
            materialNos: addMaterials.map(el=> el && el.materialNo),
            allCheck: selectStore,
          }
          API.id43767(params).then(res => {
            message.success('操作成功')
            disabled = false
            onOk()
          }).catch(err => {
            disabled = false
          })
        } else if (type == 2) {
          const params = {
            ...values,
            massNo: list[index] && list[index].massNo || '',
            materialNos: addMaterials.map(el=> el && el.materialNo),
            sendTime: values['sendType'] == 2 ? values['sendTime'] && values['sendTime'].format(dateFormat) :  moment(new Date()).format(dateFormat),
            sendObjectInterval: `${values.sendObjectStart},${values.sendObjectEnd}`,
            sendMsgInterval:`${values.sendMsgIntStart},${values.sendMsgIntEnd}`,
            allCheck: selectStore,
          }
          API.id43797(params).then(res => {
            message.success('操作成功')
            disabled = false
            onOk()
          }).catch(err => {
            disabled = false
          })
        } else {
          const params = {
            ...values,
            momentsNo: list[index] && list[index].momentsNo || '',
            materialNos: addMaterials.map(el=> el && el.materialNo),
            sendTime: values['sendType'] == 2 ? values['sendTime'] && values['sendTime'].format(dateFormat) : moment(new Date()).format(dateFormat),
            delDelay: isDelDelay? values['delDelay'] : 0,
            likeCommentDelay: isShowLink? values['likeCommentDelay'] : 0,
            allCheck: selectStore,
          }
        
          API.id43821(params).then(res => {
            message.success('操作成功')
            disabled = false
            onOk()
          }).catch(err => {
            disabled = false
          })
        }
      }
    });
  }

  // 获取素材
  const getMaterial = async (materialContentType) => {
    const params = {
      materialContentType ,
      materialBusinssType: type == 3 ? 3 : 1,
      materialName: '',
      createUserName: '',
      page:1,
      rows:1000,
    }
    const res = await API.id43359(params)
    setMaterial(res.records)
    setSelectMaterialIndex(undefined)

  }
  // 菜单
  const menu = (index) => (
    <Menu>
      <Menu.Item onClick={() => upMaterials(index)}>
        上移
      </Menu.Item>
      <Menu.Item onClick={() => downMaterials(index)} >
       下移
      </Menu.Item>
      <Menu.Item onClick={()=> delSelectMaterial(index)}>
        删除
      </Menu.Item>
    </Menu>
  )
  // 素材渲染
  const renderContent = (matter, index) => {
    return(
      <div  key={index} className='renderContent mb10'>
        {
          matter.materialContentType == 1 &&
            <div className='textBox  flex1'>
              {matter.content}
            </div>
        }
        {
          matter.materialContentType == 3 &&
          <div className='imgBox df flex1 jcfe' >
            <img style={{maxWidth: '50%'}} src={matter.content} alt=""/>
          </div>
        }
        {
          matter.materialContentType == 43 &&
          <div className='videoBox df flex1 jcfe' >
            <video src={matter.content} controls style={{maxWidth: '50%'}}></video>
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
        {/* 文件*/}
        {
          matter.materialContentType == 50 &&
          <div className='linkBox df flex1 jcfe' >
            <p>{matter.fileName}</p>
            <img src={defaultFile} alt=""/>
          </div>
        }
        {/* 小程序封面 */}
        {
          matter.materialContentType == 51 &&
          <div className='imgBox df flex1 jcfe' >
            <img style={{maxWidth: '100%'}} src={matter.appCoverUrl} alt=""/>
          </div>
        }
         <Dropdown overlay={() => menu(index)} placement="bottomLeft" >
          <Icon type="ellipsis" className='ellipsis' />
        </Dropdown>
      
      </div>
    )
  }
  // 朋友圈素材渲染
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
            <div className='videoBox' >
              <video src={matter.content} controls style={{maxWidth: '100%'}}></video>
            </div>
          }
          {/* 链接 */}
          {
            matter.materialContentType == 49 &&
            <div className='fileBox' >
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
       <Dropdown overlay={() => menu(index)} placement="bottomLeft" >
        <Icon type="ellipsis" className='ellipsis' />
      </Dropdown>
    </div>
    )
  }
  // 添加素材
  const addMaterial = () => {
    if (!material[selectMaterialIndex]) return
    const arr = [...addMaterials, material[selectMaterialIndex]]
    if (type == 3 && arr.length >  1 ) {
      message.error('朋友圈内容只能添加一项')
      return
    }
    setAddMaterials(arr)
    setSelectMaterialIndex(undefined)
    
  }
  
  // 删除选择的素材
  const delSelectMaterial = (index) => {
    const materialsArr = JSON.parse(JSON.stringify(addMaterials))
    materialsArr.forEach((el, i, arr) => {
      if (i == index) {
        arr.splice(i, 1)
      }
    })
    setAddMaterials(materialsArr)
  }

  // 上移
  const upMaterials = (index) => {
    if (index == 0) return
    const materialsArr = JSON.parse(JSON.stringify(addMaterials))
    materialsArr.forEach((el, i, arr) => {
      if (i == index) {
        const upItem = arr[i-1]
        arr.splice(i-1, 2, el, upItem)
      }
    })
    setAddMaterials(materialsArr)
  }
  // 下移
  const downMaterials = (index) => {
    if (index == addMaterials.length -1) return
    const materialsArr = JSON.parse(JSON.stringify(addMaterials))
    materialsArr.forEach((el, i, arr) => {
      if (i == index) {
        const upItem = arr[i+1]
        arr.splice(i, 2,upItem, el)
      }
    })
    setAddMaterials(materialsArr)
  }

  // 获取子账号下面的设备
  const getFacilitys = async (systemUserId) => {
    const res = await API.id43965({systemUserId})
    setFacilitys(res)
  }

  const renderType1 = () => {
    // 24/14/14
    // 24/6/10
    return (
      <Form.Item label="对象发送间隔" style={{ marginBottom: 0 }}>
        <Form.Item
          labelAlign="left"
          className='sendObjectStart'
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          {
            getFieldDecorator(`sendObjectStart`, {
              rules: [
                { required: true, message: '此项必填' },
                {
                  pattern: regs.integers, message: '请输入整数'
                },
              ],
              initialValue: initialValues.sendObjectStart
            })(
              <Input  disabled={isLook} style={{width: '100%'}} addonAfter="秒" />
            )
          }
        </Form.Item>
        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
        <Form.Item  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          {
            getFieldDecorator(`sendObjectEnd`, {
              rules: [
                { required: true, message: '此项必填' },
                {
                  pattern: regs.integers, message: '请输入整数'
                },
                {
                  validator: (rule, value, callback) => {
                    value = Number(value)
                    const prevValue = Number(getFieldValue(`sendObjectStart`) || 0)
                    if (value < prevValue || value === prevValue) {
                      callback(`必须大于${prevValue}`)
                    } else {
                      callback()
                    }
                  }
                }
              ],
              initialValue: initialValues.sendObjectEnd
            })(
              <Input disabled={isLook} style={{ width: '100%' }} addonAfter="秒" />
            )
          }
        </Form.Item>
      </Form.Item>
         
    )
  }

  const renderType2 = () => {
    // 24/14/14
    // 24/6/10
    return (
      <Form.Item label="消息发送间隔" style={{ marginBottom: 0 }}>
        <Form.Item
          labelAlign="left"
          className='sendObjectStart'
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          {
            getFieldDecorator(`sendMsgIntStart`, {
              rules: [
                { required: true, message: '此项必填' },
                {
                  pattern: regs.integers, message: '请输入整数'
                },
              ],
              initialValue: initialValues.sendMsgIntStart
            })(
              <Input disabled={isLook} style={{width: '100%'}} addonAfter="秒" />
            )
          }
        </Form.Item>
        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
        <Form.Item  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          {
            getFieldDecorator(`sendMsgIntEnd`, {
              rules: [
                { required: true, message: '此项必填' },
                {
                  pattern: regs.integers, message: '请输入整数'
                },
                {
                  validator: (rule, value, callback) => {
                    value = Number(value)
                    const prevValue = Number(getFieldValue(`sendMsgIntStart`) || 0)
                    if (value < prevValue || value === prevValue) {
                      callback(`必须大于${prevValue}`)
                    } else {
                      callback()
                    }
                  }
                }
              ],
              initialValue: initialValues.sendMsgIntEnd
            })(
              <Input disabled={isLook} style={{ width: '100%' }} addonAfter="秒" />
            )
          }
        </Form.Item>
      </Form.Item>
         
    )
  }
  // 选择发送类型
  const changeSendType = (e) => {
    setSendType(e.target.value)
  }

  return(
    <Modal
      title={ index > -1 ? '编辑' : '新增'}
      visible={visible}
      onOk={submit}
      className={styles.editForm}
      onCancel={onClose}
      destroyOnClose={true}
    >
      <Form onSubmit={submit} className="login-form" {...formItemLayout}>
        <Form.Item label="任务标题">
          {getFieldDecorator(typeData[type].name, {
            rules: [
              {
                required: true,
                message: '请输入',
              },
            ],
            initialValue: typeData[type].nameValue
          })(<Input disabled={isLook} />)}
        </Form.Item>
        {
          type == 3 &&
          <div>
            <Form.Item label='朋友圈内容'>
              <InputGroup compact className='ac'  style={{display: 'flex', marginTop: '5px'}}>
                <Select defaultValue={3} disabled={isLook} onChange={(val) => getMaterial(val)}>
                  {
                    FANS_TYPE_OPTIONS.map((el, i) =>  el.value && <Option key={el.value} value={el.value}>{el.label}</Option>)
                  }
                </Select>
                <Select style={{flex: 1}} disabled={isLook} value={selectMaterialIndex}  className='replyContent' onChange={(val) => setSelectMaterialIndex(val) }>
                  {
                    material.map((el, i) =>  el.materialNo && <Option key={i} value={i}>{el.materialName}</Option>)
                  }
                </Select>
                <Button onClick={addMaterial}>添加</Button>
              </InputGroup>
              <div className='materialBox2'>
                {
                  addMaterials.map((el, i) => renderFansContent(el, i) )
                }
              </div>
            </Form.Item>
            <Form.Item label="点赞和评论的时间">
              <Row> 
                <Col span={1}>
                  <Form.Item style={{margin:0}}>
                      <Checkbox checked={isShowLink} disabled onChange={(e) => setIsShowLink(e.target.checked)}></Checkbox>
                  </Form.Item>
                </Col>
                {
                  isShowLink &&   
                    <Col span={12}>
                    <Form.Item style={{margin:0}}>
                      {getFieldDecorator('likeCommentDelay', {
                        initialValue: initialValues.likeCommentDelay,
                        rules: [
                          {
                            validator: (rule, value, callback) => {
                              if ( value == 0 || !integers(value)) {
                                callback(`请输入大于0整数`)
                              } else {
                                callback()
                              }
                            }
                          }
                        ],
                      })(<Input  addonAfter="分钟后点赞和评论" />)}
                    </Form.Item>
                  </Col>
                }
              </Row>
            </Form.Item>
            <Form.Item label="发送时间">
              {getFieldDecorator('sendType',  {
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
                initialValue: String(initialValues.sendType),
              })(
                <Radio.Group onChange={changeSendType} disabled={isLook}>
                  <Radio value="1">立即发送</Radio>
                  <Radio value="2">定时发送</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {
              sendType == 2 && 
              <Form.Item label="定时发送的时间">
                {getFieldDecorator('sendTime',  {
                  rules: [
                    {
                      required: true,
                      message: '请选择',
                      // type: 'object'
                    },
                    {
                      validator: (rule, value, callback) => {
                        value = moment(value)
                        const prevValue = moment(new Date())
                        if (value < prevValue || value === prevValue) {
                          callback(`必须大于当前时间`)
                        } else {
                          callback()
                        }
                      }
                    }
                  ],
                  initialValue: sendType == 2 ? moment(initialValues.sendTime, dateFormat) :  moment(new Date(), dateFormat) ,
                })(
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    disabled={isLook}
                  />
                )}
              </Form.Item>
            }
            <Form.Item label="删除朋友圈时间">
              <Row> 
                <Col span={1}>
                  <Form.Item style={{margin:0}}>
                      <Checkbox checked={isDelDelay} disabled onChange={(e) => setIsDelDelay(e.target.checked)}></Checkbox>
                  </Form.Item>
                </Col>
                {
                  isDelDelay &&   
                    <Col span={12}>
                    <Form.Item style={{margin:0}}>
                      {getFieldDecorator('delDelay', {
                        initialValue: initialValues.delDelay,
                        rules: [
                          {
                            validator: (rule, value, callback) => {
                              if ( value == 0 || !integers(value)) {
                                callback(`请输入大于0整数`)
                              } else {
                                callback()
                              }
                            }
                          }
                        ],
                      })(<Input addonAfter="小时后删除朋友圈" />)}
                    </Form.Item>
                  </Col>
                }
              </Row>
            </Form.Item>
          </div>
        }
        {
          type != 3 &&
          <Form.Item label={type == 1 ? '回复内容': '群发内容'}>
            <InputGroup compact className='ac' style={{display: 'flex', marginTop: '5px'}}>
              <Select defaultValue={1} onChange={(val) => getMaterial(val)} disabled={isLook}>
                {
                  MSG_TYPE_OPTIONS.map((el, i) =>  el.value && <Option key={el.value} value={el.value}>{el.label}</Option>)
                }
              </Select>
              <Select style={{flex: 1}} value={selectMaterialIndex} disabled={isLook} className='replyContent' onChange={(val) => setSelectMaterialIndex(val) }>
                {
                  material.map((el, i) =>  el.materialNo && <Option key={i} value={i}>{el.materialName}</Option>)
                }
              </Select>
              <Button onClick={addMaterial}>添加</Button>
            </InputGroup>
            <div className='materialBox'>
              {
                addMaterials.map((el, i) => renderContent(el, i) )
              }
            
            </div>
          </Form.Item>
        }
        <Form.Item label="归属主账号">
          {getFieldDecorator('mainSystemUserId', {
            rules: [
              {
                required: true,
                message: '请选择',
              },
            ],
            initialValue: initialValues.specialMainSystemUserId,
          })(<Select onChange={changeMainAccount} disabled={user.level != '1' || isLook}>
            {
              mainAccount.map((option, i) => (
                <Option disabled={option.status === 0} value={option.mainSystemUserId} key={i}> {option.mainUserName}（ {option.mainTelephone}）</Option>
              ))
            }
          </Select>)}
        </Form.Item>
        <Form.Item label="归属子账号">
          {getFieldDecorator('subSystemUserId', {
            rules: [
              {
                required: true,
                message: '请选择',
              },
            ],
            initialValue: initialValues.subSystemUserId,
          })(<Select disabled={user.level == '3' ||  isLook} onChange={(val) => getFacilitys(val)}>
          {
            sonAccount.map((option, i) => (
            <Option disabled={option.status === 0} value={option.subSystemUserId} key={i}> {option.subUserName }（{ option.subTelephone}）</Option>
            ))
          }
        </Select>)}
        </Form.Item>
        <Form.Item label="选择设备">
          <Radio.Group value={selectStore} disabled={isLook} onChange={(e) => setSelectStore(e.target.value) }>
            <Radio value="0">选择部分</Radio>
            <Radio value="1">全选</Radio>
          </Radio.Group>
        </Form.Item>
        {
          selectStore == '0' &&
          <Form.Item label="选择部分设备">
            {getFieldDecorator('storeNoList', {
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
                initialValue: initialValues.newStoreList,
              })(<Select
                  mode="multiple"
                  disabled={isLook}
                >
              {
                facilitys.map((option, i) => (
                  <Option disabled={option.status === 0} key={option.storeNo} value={option.storeNo}> {option.storeWxNickName }</Option>
                ))
              }
            </Select>)}
          </Form.Item>
        }
        {
          type == 2 &&
          <div>
            <Form.Item label="群发选项">
              {getFieldDecorator('sendTargetType', {
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
                initialValue: initialValues.sendTargetType.map(el => String(el)),
              })(
                <Checkbox.Group style={{ width: '100%' }} disabled={isLook}>
                  <Row>
                    <Checkbox value="1">好友</Checkbox>
                    <Checkbox  value="2">群</Checkbox>
                  </Row>
                </Checkbox.Group>,
              )}
            </Form.Item>
            {
              renderType1()
            }
            {
              renderType2()
            }
            <Form.Item label="发送时间">
              {getFieldDecorator('sendType',  {
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
                initialValue: String(initialValues.sendType),
              })(
                <Radio.Group onChange={changeSendType} disabled={isLook}>
                  <Radio value="1">立即发送</Radio>
                  <Radio value="2">定时发送</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {
              sendType == 2 && 
              <Form.Item label="定时发送的时间">
                {getFieldDecorator('sendTime',  {
                  rules: [
                    {
                      required: true,
                      message: '请选择',
                      // type: 'object'
                    },
                    {
                      validator: (rule, value, callback) => {
                        value = moment(value)
                        const prevValue = moment(new Date())
                        if (value < prevValue || value === prevValue) {
                          callback(`必须大于当前时间`)
                        } else {
                          callback()
                        }
                      }
                    }
                  ],
                  initialValue: sendType == 2 ? moment(initialValues.sendTime, dateFormat) :  moment(new Date(), dateFormat) ,
                })(
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled={isLook}
                    showTime
                  />
                )}
              </Form.Item>
            }
          </div>
        }
        <Form.Item label="状态">
          {getFieldDecorator(typeData[type].label, {
            rules: [
              {
                required: true,
                message: '请输入',
              },
            ],
            initialValue: typeData[type].value
          })(<Select disabled={isLook}>
            {
              STATUS_OPTIONS2.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
          </Select>)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const UserForm = (props: IProps) => (
  <UserContexts.Consumer>
    {
      ({ user }) => <EditForm user={user} {...props} />
    }
  </UserContexts.Consumer>
)

export default Form.create()(UserForm)

