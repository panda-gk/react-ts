import React, {useState, useEffect}  from 'react';
import { Input, Select, Modal, message } from 'antd'
import JsonForm, { IFormItem } from '@components/JsonForm'

import API from '../../../api'
import { SEX_DATA_OPTIONS, FANS_SOURCE_OPTIONS} from '../../../constants'
const { Option } = Select
const { TextArea } = Input

import { WrappedFormUtils } from 'antd/lib/form/Form'
interface IProps {
  info: any,
  weChat:any,
  visible: boolean,
  onClose: () => void,
  onOk: (any) => void,
}
 const EditForm = (props: IProps) => {
  let btnDisabled = false 
  const {  onClose, visible, onOk, info, weChat } =  props
  const [fansInfo, setFansInfo] = useState({
    nickName: '',
    headImg: '',
    sex: 0,
    area: '',
    phone: '',
    makeFriendsTime: '',
    addFriendsChannel: '',
    lastChatTime: '',
    desc: '',
    userNo: ''
  })
  const [fansChannel, setFansChannel] = useState([])

  useEffect(() => {
    setFansInfo(info)
    getFansChannel()
  }, [info])

  const telRule = (rule, value, callback) => {
    if (value && !/^1\d{10}$/.test(value)) {
      callback('请输入正确手机号');
    } else {
      callback();
    }
  }

  const getFansChannel = async () => {
    const res=  await API.id43665()
    const arr = res.map(el => ({value: el, label: el}))
    setFansChannel(arr)
  }

  let formRef: WrappedFormUtils = null

  const formItems = [
      {
        label: '性别',
        name: 'sex',
        initialValue: String(fansInfo.sex),
        component: (
          <Select style={{width: '150px'}}>
            {
              SEX_DATA_OPTIONS.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
          </Select>
        ),
      },
      {
        label: '手机号',
        name: 'phone',
        initialValue: fansInfo.phone,
        component: <Input placeholder="请输入" />,
        rules: [
          {
            validator: telRule,
          },
        ]
      },
      {
        label: '加好友渠道',
        name: 'addFriendsChannel',
        initialValue: String(fansInfo.addFriendsChannel),
        component: (
          <Select style={{width: '150px'}}>
            {
              fansChannel.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
          </Select>
        ),
      },
      {
        label: '备注',
        name: 'desc',
        component: <TextArea placeholder="请输入" rows={4} />,
        initialValue: fansInfo.desc,
      },
  ]

  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    },
  }

  const submit = () => {
    
    const { validateFields, getFieldsValue } = formRef
    validateFields(err => {
      if (err) return
      if (btnDisabled) return
      btnDisabled = true
      const params = {
        userNo: info.userNo,
        storeNo: weChat.storeNo,
        ...getFieldsValue()
      }

      API.id41634(params).then(res => {
        message.success('操作成功')
        btnDisabled = false
        onOk(getFieldsValue())
      }).catch(err => {
        btnDisabled = false
      })
    })
  }
  return(
    <Modal
      title='编辑'
      visible={visible}
      onOk={submit}
      onCancel={onClose}
      destroyOnClose
    >
      <JsonForm
        formItems={formItems}
        {...formItemLayout}
        formRef={e => (!formRef && (formRef = e))}
      />
    </Modal>
  )
}
export default EditForm