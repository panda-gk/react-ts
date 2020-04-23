import React, { useState, useEffect } from 'react'
import { Button, Input, Icon, Form, Select, Card, message, Row, Col } from "antd"
import { FormProps } from 'antd/lib/form'

import Api from '../../../api'
import appConfig from "../../../config"
import { GLOBAL_SETTING_CONFIG_TYPE } from "../../../constants"
import { regs } from '../../../utils/validator'
import { IItem } from './interfaces'

interface IProps extends FormProps {
  index: number;
  list: IItem[];
  onClose: (isUpdateList: boolean) => void;
}

const formatData = () => {
  const toFe = (data) => {
    const { configType, configValue } = data
    const feData = {
      ...data,
    }

    switch(Number(configType)) {
      case 1 :
        Object.assign(feData, {
          autoAddUserTimeUpper: configValue.autoAddUserTimeUpper,
          autoAddUserTimeLower: configValue.autoAddUserTimeLower
        })
        break
      case 2 :
        Object.assign(feData, {
          autoAddUserTotalUpper: configValue,
        })
        break
      case 3 :
        Object.assign(feData, {
          autoAddUserChannel: configValue,
        })
        break
      default:
        Object.assign(feData, {
          autoAddUserTimeUpper: configValue.autoAddUserTimeUpper,
          autoAddUserTimeLower: configValue.autoAddUserTimeLower
        })
    }
    return feData
  }

  const toBe = (data) => {
    const {
      configType,
      autoAddUserTimeUpper,
      autoAddUserTimeLower,
      autoAddUserTotalUpper,
      autoAddUserChannel,
      ...rest
    } = data
    const beData = {
      ...(rest || {})
    }
    switch(Number(configType)) {
      case 1:
        Object.assign(beData, {
          configKey: 'autoAddUserTime',
          configValue: {
            autoAddUserTimeUpper,
            autoAddUserTimeLower,
          }
        })
        break;
      case 2:
        Object.assign(beData, {
          configKey: 'autoAddUserTotalUpper',
          configValue: autoAddUserTotalUpper,
        })
        break
      case 3:
        Object.assign(beData, {
          configKey: 'autoAddUserChannel',
          configValue: autoAddUserChannel,
        })
    }
    return beData
  }

  return {
    toFe, toBe,
  }
}

const { toBe, toFe } = formatData()

// let keyId = 0

class EditForm extends React.Component<IProps> {
  keyId = 0
  initialValueConfigs = [
    {
      configType: 1,
      autoAddUserTimeUpper: null,
      autoAddUserTimeLower: null,
      // autoAddUserTotalUpper: null,
      // autoAddUserChannel: null,
    }
  ]

  submit = () => {
    const { getFieldsValue, validateFields } = this.props.form
    validateFields((error) => {
      if (!error) {
        const { keys, configs: configs1 } = getFieldsValue()
        if (keys.length === 0) return message.warn(`请至少添加一个配置`)
        const configs = configs1.filter(ele => ele).map(config => toBe(config))
        Api.id43347(configs).then(() => {
          message.success('提交成功')
          this.props.onClose(true)
        })
      }
    })

  }

  addItem = () => {
    const { getFieldValue, setFieldsValue } = this.props.form
    const keys = getFieldValue('keys') as number[]
    const nextKeys = keys.concat(++this.keyId)
    setFieldsValue({
      keys: nextKeys
    })
  }

  delItem = (i) => {
    const { getFieldValue, setFieldsValue } = this.props.form
    const keys = getFieldValue('keys') as number[]
    keys.splice(i, 1)
    console.log(keys)
    setFieldsValue({
      keys: keys
    })
  }

  componentDidMount() {
    const { index, list, form } = this.props
    const configs = (() => {
      if (index === -1) {
        return this.initialValueConfigs
      } else {
        return [
          appConfig.APP_ENV === 'mock' ? {
            configType: 1,
            autoAddUserTimeUpper: index,
            autoAddUserTimeLower: this.keyId,
          } : toFe(list[index])
        ]
      }
    })()

    console.log(configs)
    form.setFieldsValue({
      keys: [this.keyId],
      configs,
    })
  }

  render() {

    const { index, form } = this.props

    const { getFieldDecorator, getFieldValue } = form

    const renderType1 = (i) => {
      // 24/14/14
      // 24/6/10
      return (
        <Row>
          <Col span={14}>
            <Form.Item label="请求时间间隔"
              labelAlign="left"
              labelCol={{span: 10}}
            >
              {
                getFieldDecorator(`configs[${i}].autoAddUserTimeLower`, {
                  rules: [
                    { required: true, message: '此项必填' },
                    {
                      pattern: regs.integers, message: '请输入整数'
                    },
                  ]
                })(
                  <Input style={{ width: '100%' }} addonAfter="秒" />
                )
              }
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item style={{ textAlign: 'center' }} >~</Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item wrapperCol={{ span: 24 }}>
            {
              getFieldDecorator(`configs[${i}].autoAddUserTimeUpper`, {
                rules: [
                  { required: true, message: '此项必填' },
                  {
                    pattern: regs.integers, message: '请输入整数'
                  },
                  {
                    validator: (rule, value, callback) => {
                      value = Number(value)
                      const prevValue = Number(getFieldValue(`configs[${i}].autoAddUserTimeLower`) || 0)
                      if (value < prevValue || value === prevValue) {
                        callback(`必须大于${prevValue}`)
                      } else {
                        callback()
                      }
                    }
                  }
                ]
              })(
                <Input style={{ width: '100%' }} addonAfter="秒" />
              )
            }
            </Form.Item>
          </Col>
        </Row>
      )
    }
  
    const renderType2 = (i) => {
      return (
        <>
          <Form.Item label="每设备自动通过好友请求上限"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 10 }}
          >
            {
              getFieldDecorator(`configs[${i}].autoAddUserTotalUpper`, {
                rules: [
                  { required: true, message: '此项必填' },
                  {
                    pattern: regs.integers, message: '请输入整数'
                  },
                ]
              })(
                <Input addonAfter="个/日" />
              )
            }
          </Form.Item>
        </>
      )
    }
  
    const renderType3 = (i) => {
      return (
        <>
          <Form.Item label="加好友渠道">
            {
              getFieldDecorator(`configs[${i}].autoAddUserChannel`, {
                rules: [
                  { required: true, message: '此项必填' },
                  // TODO:
                ],
                normalize: (value: string) => {
                  if (value.indexOf('；') > -1) {
                    return value.replace('；', ';')
                  }
                  return value
                }
              })(
                <Input placeholder="多个渠道请用英文分号分隔" />
              )
            }
          </Form.Item>
        </>
      )
    }
  
    const renderTypes = (i) => {
      const types = {
        renderType1,
        renderType2,
        renderType3,
      }
      const { configType } = getFieldValue('configs')[i]
      return types[`renderType${configType}`](i)
    }

    getFieldDecorator('keys', {
      initialValue: [0],
    })
  
    const keys = getFieldValue('keys')
  
    const formItems = keys.map((k, i) => (
      <Card key={k}
        title={
          index === -1 ? (<div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <span style={{ fontStyle: 'italic' }}>NO: {i + 1}</span>
            <Button type="danger" size="small" onClick={() => this.delItem(i)} >- 删除</Button>
          </div>) : null
        }
        style={{ marginBottom: '10px' }}
      >
        <Form.Item label="配置类型">
          {
            getFieldDecorator(`configs[${k}].configType`, {
              initialValue: 1,
              rules: [
                { required: true, message: '此项必填' },
              ]
            })(
              <Select>
                {
                  Object.keys(GLOBAL_SETTING_CONFIG_TYPE).map(key => (
                    <Select.Option key={key} value={Number(key)} style={{}} >{GLOBAL_SETTING_CONFIG_TYPE[key]}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        {
          renderTypes(k)
        }
      </Card>
    ))

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    return (
      <Form layout="horizontal" {...formItemLayout} labelAlign="left">
        {
          formItems
        }
        {
          index === -1 && (
            <Form.Item wrapperCol={{
              sm: { span: 14, offset: 6 }
            }}>
              <Button type="dashed" style={{ width: '100%' }} onClick={this.addItem}><Icon type="plus" /></Button>
            </Form.Item>
          )
        }
      </Form>
    )
  }
}

// const EditForm = ((props: IProps) => {

//   const { index, list, onClose } = props
//   const { getFieldDecorator, getFieldValue, setFieldsValue, validateFields } = props.form

//   const initialValueConfigs = [
//     {
//       configType: 1,
//       autoAddUserTimeUpper: null,
//       autoAddUserTimeLower: null,
//       // autoAddUserTotalUpper: null,
//       // autoAddUserChannel: null,
//     }
//   ]

//   const submit = () => {

//     const { getFieldsValue } = props.form
//     console.log(getFieldsValue())
//     const configs = getFieldsValue().configs.filter(ele => ele).map(config => toBe(config))
//     validateFields((error) => {
//       if (!error) {
//         Api.id43347(configs).then(() => {
//           message.success('提交成功')
//           onClose(true)
//         })
//       }
//     })

//   }

//   const addItem = () => {
//     const keys = getFieldValue('keys') as number[]
//     const nextKeys = keys.concat(++keyId)
//     setFieldsValue({
//       keys: nextKeys
//     })
//   }

//   const delItem = (i) => {
//     const keys = getFieldValue('keys') as number[]
//     keys.splice(i, 1)
//     console.log(keys)
//     setFieldsValue({
//       keys: keys
//     })
//   }

//   useEffect(() => {
//     console.log('useEffect')
//     setTimeout(() => {
//       setFieldsValue({
//         keys: [keyId],
//         configs: (() => {
//           if (index > -1) {
//             // TODO:
//             console.log(list[index])
//             return [
//               appConfig.APP_ENV === 'mock' ? {
//                 configKey: 1,
//                 autoAddUserTimeUpper: 5,
//                 autoAddUserTimeLower: 8,
//               } : [toFe(list[index])]
//             ]
//           } else {
//             return initialValueConfigs
//           }
//         })()
//       })
//     }, 10)

//     return () => {
//       console.log('return');
//       ++keyId
//       // setFieldsValue({
//       //   keys: [keyId],
//       // })
//     }
//   }, [index, list])


//   const formItemLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 14 },
//   }

//   const renderType1 = (i) => {
//     return (
//       <>
//         <Form.Item label="请求时间间隔">
//           {
//             getFieldDecorator(`configs[${i}].autoAddUserTimeLower`, {
//               rules: [
//                 { required: true, message: '此项必填' },
//                 {
//                   pattern: regs.integers, message: '请输入整数'
//                 },
//               ]
//             })(
//               <Input />
//             )
//           }
//         </Form.Item>
//         <Form.Item label="请求时间间隔">
//         {
//           getFieldDecorator(`configs[${i}].autoAddUserTimeUpper`, {
//             rules: [
//               { required: true, message: '此项必填' },
//               {
//                 pattern: regs.integers, message: '请输入整数'
//               },
//             ]
//           })(
//             <Input />
//           )
//         }
//         </Form.Item>
//       </>
//     )
//   }

//   const renderType2 = (i) => {
//     return (
//       <>
//         <Form.Item label="每设备自动通过好友请求上限">
//           {
//             getFieldDecorator(`configs[${i}].autoAddUserTotalUpper`, {
//               rules: [
//                 { required: true, message: '此项必填' },
//                 {
//                   pattern: regs.integers, message: '请输入整数'
//                 },
//               ]
//             })(
//               <Input />
//             )
//           }
//         </Form.Item>
//       </>
//     )
//   }

//   const renderType3 = (i) => {
//     return (
//       <>
//         <Form.Item label="加好友渠道">
//           {
//             getFieldDecorator(`configs[${i}].autoAddUserChannel`)(
//               <Input />
//             )
//           }
//         </Form.Item>
//       </>
//     )
//   }

//   const renderTypes = (i) => {
//     const types = {
//       renderType1,
//       renderType2,
//       renderType3,
//     }
//     const { configType } = getFieldValue('configs')[i]
//     return types[`renderType${configType}`](i)
//   }

//   getFieldDecorator('keys', {
//     initialValue: [0],
//   })

//   const keys = getFieldValue('keys')

//   const formItems = keys.map((k, i) => (
//     <Card key={k}
//       title={
//         index === -1 ? (<div style={{ display: 'flex', justifyContent: 'space-between' }} >
//           <span style={{ fontStyle: 'italic' }}>NO: {k}</span>
//           <Button type="danger" size="small" onClick={() => delItem(i)} >- 删除</Button>
//         </div>) : null
//       }
//       style={{ marginBottom: '10px' }}
//     >
//       <Form.Item label="配置类型">
//         {
//           getFieldDecorator(`configs[${k}].configType`, {
//             initialValue: 1,
//             rules: [
//               { required: true, message: '此项必填' },
//             ]
//           })(
//             <Select>
//               {
//                 Object.keys(GLOBAL_SETTING_CONFIG_TYPE).map(key => (
//                   <Select.Option key={key} value={Number(key)} style={{}} >{GLOBAL_SETTING_CONFIG_TYPE[key]}</Select.Option>
//                 ))
//               }
//             </Select>
//           )
//         }
//       </Form.Item>
//       {
//         renderTypes(k)
//       }
//     </Card>
//   ))

//   return (
//     <Form layout="horizontal" {...formItemLayout}>
//       {
//         formItems
//       }
//       {
//         index === -1 && (
//           <Form.Item wrapperCol={{
//             sm: { span: 14, offset: 6 }
//           }}>
//             <Button type="dashed" style={{ width: '100%' }} onClick={addItem}><Icon type="plus" /></Button>
//           </Form.Item>
//         )
//       }
//     </Form>
//   )
// })

export default Form.create<IProps>()(EditForm)