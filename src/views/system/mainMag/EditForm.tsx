import React, {useState}  from 'react';
import { Input, Select, Modal, message } from 'antd'
import JsonForm, { IFormItem } from '@components/JsonForm'
// import SelectMore from '@components/SelectMore'
import API from '../../../api'
import {STATUS_OPTIONS2} from '../../../constants'
const { Option } = Select;
import { WrappedFormUtils } from 'antd/lib/form/Form'
interface IProps {
  list: any[],
  index: number,
  visible: boolean,
  onClose: () => void,
  onOk: () => void,
}

 const EditForm = (props: IProps) => {
  const { list, index, onClose, visible, onOk } =  props
  const defaultValues = {
    userName: '', // 主账号昵称
    password: '', // 密码
    telephone: '', // 手机号码
    status: '',
    desc: ''
  }
  const [initialValues, setInitialValues] = useState<Partial<any>>(defaultValues)
  // 查询子账号
  let btnDisabled = false
  let formRef: WrappedFormUtils = null
  React.useEffect(() => {
    // 表单初始化
    if (index > -1) { // 编辑数据回显
      // 根据list 和编辑下标index 基本都可以获取到item数据,不建议使用主键id
      const item = list[index]
      setInitialValues(item)
    }
  }, [list, index])

  const telRule = (rule, value, callback) => {
    if (value && !/^1\d{10}$/.test(value)) {
      callback('请输入正确手机号');
    } else {
      callback();
    }
  }
  
  const formItems: IFormItem[] = [
    {
      name: 'userName',
      label: '主账号昵称',
      initialValue: initialValues.userName,
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入账号昵称',
        }
      ],
    },
    {
      label: '密码',
      name: 'password',
      initialValue: '',
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入密码',
        }
      ]
    },
    {
      label: '手机号码',
      name: 'telephone',
      initialValue: initialValues.telephone,
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入手机号码',
        },
        {
          validator: telRule,
        },
      ]
    },
    {
      label: '备注',
      name: 'desc',
      initialValue: initialValues.desc,
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入备注',
        }
      ]
    },
    {
      label: '登录状态',
      name: 'status',
      initialValue: String(initialValues.status),
      component: (<Select placeholder="请输入">
        {
          STATUS_OPTIONS2.map((option, i) => (
            <Option value={option.value} key={i}>{option.label}</Option>
          ))
        }
      </Select>),
      rules: [
        {
          required: true,
          message: '请选择',
        }
      ],
    },
  ]

  const submit = () => {
    const { validateFields, getFieldsValue } = formRef
    validateFields(err => {
      if (err) return
      if (btnDisabled) return
      const params = {
        systemUserId: index > -1 ? list[index].systemUserId : '',
        ...getFieldsValue()
      }
      btnDisabled = true
      API.id41481(params).then(res => {
        btnDisabled = false
        message.success('操作成功')
        onOk()
      }).catch(err => {
        btnDisabled = false
      })
    })
  }
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    },
  }
  return(
      <Modal
        title={ index > -1 ? '编辑' : '新增'}
        visible={visible}
        onOk={submit}
        onCancel={() => onClose()}
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
export default EditForm;