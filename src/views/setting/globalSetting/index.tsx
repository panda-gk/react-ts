import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, message, Row, Col, Form } from "antd"
import { FormComponentProps } from 'antd/lib/form'
import Api from '../../../api'
import * as styles from './index.scss'
import { regs } from '../../../utils/validator'


const Set = (props:FormComponentProps) => {

  const { getFieldValue, validateFields, getFieldDecorator } = props.form

  const [disabled, setDisabled] = useState(false)
  const [config, setConfig] = useState({
    autoAddUserTimeLower: null,
    autoAddUserTimeUpper: null,
    autoAddUserTotalUpper: null,
    autoAddUserChannel: null
  })

  const renderType1 = () => {
    // 24/14/14
    // 24/6/10
    return (
      <Row gutter={8}>
        <Col span={6} >
          <Form.Item label="请求时间间隔"
            labelAlign="left"
            className='autoAddUserTimeLower'
            labelCol={{span: 6}}
          >
            {
              getFieldDecorator(`autoAddUserTimeLower`, {
                rules: [
                  {
                    pattern: regs.integers, message: '请输入整数'
                  },
                ],
                initialValue: config.autoAddUserTimeLower
              })(
                <Input  style={{width: '100%'}} addonAfter="秒" />
              )
            }
          </Form.Item>
        </Col>
        <Col span={1} className='col1'>
            <Form.Item style={{ textAlign: 'center' }} >~</Form.Item>
          </Col>
        <Col span={2}>
          <Form.Item wrapperCol={{ span: 24 }}>
          {
            getFieldDecorator(`autoAddUserTimeUpper`, {
              rules: [
                { required: true, message: '此项必填' },
                {
                  pattern: regs.integers, message: '请输入整数'
                },
                {
                  validator: (rule, value, callback) => {
                    value = Number(value)
                    const prevValue = Number(getFieldValue(`autoAddUserTimeLower`) || 0)
                    if (value < prevValue || value === prevValue) {
                      callback(`必须大于${prevValue}`)
                    } else {
                      callback()
                    }
                  }
                }
              ],
              initialValue: config.autoAddUserTimeUpper
            })(
              <Input style={{ width: '100%' }} addonAfter="秒" />
            )
          }
          </Form.Item>
        </Col>
      </Row>
    )
  }

  const renderType2 = () => {
    return (
      <>
        <Form.Item label="每设备自动通过好友请求上限"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 5 }}
        >
          {
            getFieldDecorator(`autoAddUserTotalUpper`, {
              rules: [
                {
                  pattern: regs.integers, message: '请输入整数'
                },
              ],
              initialValue:config.autoAddUserTotalUpper
            })(
              <Input addonAfter="个/天" />
            )
          }
        </Form.Item>
      </>
    )
  }

  const renderType3 = () => {
    return (
      <>
        <Form.Item label="加好友渠道"
          labelCol={{ span: 4 }}
          className='autoAddUserChannel'
          wrapperCol={{ span: 8 }}
        >
          {
            getFieldDecorator(`autoAddUserChannel`, {
              initialValue: config.autoAddUserChannel
            })( <Input placeholder="多个渠道请用逗号分隔" />)
          }
           <span style={{width: '400px', marginLeft:'8px'}}>多个渠道请用逗号分隔</span>
        </Form.Item>
      </>
    )
  }

  const normalize = (value: string) => {
    if (value.indexOf('，') > -1) {
      return value.replace(/，/gi, ',')
    }
    return value
  }

  const getConfig = async () => {
    const res = await Api.id43353()
    // 1:自动通过好友请求时间间隔	 2:自动通过好友请求上限 3:加好友渠道
    const obj1 = res.find(el => el.configType == 1)
    const obj2 = res.find(el => el.configType == 2) || {
      configValue: null
    }
    const obj3 = res.find(el => el.configType == 3) || {
      configValue: null
    }
    setConfig({
      autoAddUserTimeLower: obj1 && obj1.autoAddUserTimeLower || '',
      autoAddUserTimeUpper: obj1 && obj1.autoAddUserTimeUpper || '',
      autoAddUserTotalUpper: obj2.configValue,
      autoAddUserChannel:  obj3.configValue
    })
  }

  useEffect(() => {
    getConfig()
  }, [])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const autoAddUserChannel = normalize(values.autoAddUserChannel).split(';') || []
        const flag = autoAddUserChannel.some(el => el == '未知')
        if(flag) {
          message.error('不可以配置未知')
          return
        }
        const config = [
          {
          "configType": 1,
          "configKey": "autoAddUserTime",
          "configValue": {
            "autoAddUserTimeLower": values.autoAddUserTimeLower,
            "autoAddUserTimeUpper": values.autoAddUserTimeUpper
            }
          },
          {
          "configType": 2,
          "configKey": "autoAddUserTotalUpper",
          "configValue": values.autoAddUserTotalUpper
          }, 
          {
          "configType": 3,
          "configKey": "autoAddUserChannel",
          "configValue": normalize(values.autoAddUserChannel)
          }
        ] 
        setDisabled(true)
        Api.id43347(config).then(res => {
           setDisabled(false)
          message.success('操作成功')
        }).catch(err => {
          setDisabled(false)
        })

      }
    });
  };

  return(
      <Form layout="horizontal" className={styles.set} {...formItemLayout} labelAlign="left"  onSubmit={handleSubmit}>
        {
          renderType1()
        }
        {
          renderType2()
        }
        {
          renderType3()
        }
        <Form.Item wrapperCol={{
          sm: { span: 8, offset: 4 }
        }}>
          <Button  type="primary" htmlType="submit"  disabled={disabled}>保存</Button>
        </Form.Item>
      </Form>
  )
}
export default  Form.create<FormComponentProps>()(Set)