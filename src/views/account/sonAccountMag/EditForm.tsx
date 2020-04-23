import React, {useState}  from 'react';
import { Input, Select, Modal, message } from 'antd'
import JsonForm, { IFormItem } from '@components/JsonForm'
// import SelectMore from '@components/SelectMore'
import UserContexts from '../../../contexts/user'
import API from '../../../api'
import { STATUS_OPTIONS2} from '../../../constants'
const { Option } = Select
import { WrappedFormUtils } from 'antd/lib/form/Form'
interface IProps {
  user: any,
  list: any[],
  index: number,
  visible: boolean,
  onClose: () => void,
  onOk: () => void,
}
 const EditForm = (props: IProps) => {
  const { list, index, onClose, visible, onOk, user } =  props
  const defaultValues = {
    userName: '', // 子账号id
    telephone: '', // 主账号id
    bizNo: '', // 微信id
    status: '',
    password: ''
  }
  const [initialValues, setInitialValues] = useState<Partial<any>>(defaultValues)
  const [bizes, setBizes] = useState([])
  const [mainAccount, setMainAccount]  = useState([])
  let btnDsiabled = false
  let formRef: WrappedFormUtils = null
  React.useEffect(() => {
    // 表单初始化
    if (index > -1) { // 编辑数据回显
      // 根据list 和编辑下标index 基本都可以获取到item数据,不建议使用主键id
      const item = list[index]
      setInitialValues(item)
    }
      // getMainAccount(user.systemUserId)
      getMainAccount(user.systemUserId)

  }, [list, index])
  
  const getBizes = async (relegationUserId) => {
    const params = {
      page: 1,
      rows: 500,
      relegationUserId
    }
   const res = await API.id41553(params)
   setBizes(res.records)
  }

  const getMainAccount = async (systemUserId) => {
    const res = await API.id41760({})
    setMainAccount(res)
    if (index <= -1) { // 编辑数据回显
      // 新增
      // user.level != '1'
      // 主账号
      if (user.level == 2) {
        getBizes(user.systemUserId)
      }
    } else {
      // 编辑
      getBizes(list[index].mainSystemUserId)
    }
  }
  const changeMainAccount = (value) => {
    const {setFieldsValue } = formRef
    setFieldsValue({
      bizNo: ''
    })

    getBizes(value)
  }
  const telRule = (rule, value, callback) => {
    if (value && !/^1\d{10}$/.test(value)) {
      callback('请输入正确手机号');
    } else {
      callback();
    }
  }
  
  const formItems: IFormItem[] = [
    {
      label: '归属主账户',
      name: 'mainSystemUserId',
      initialValue: user.level != '1' ?  user.systemUserId : initialValues.mainSystemUserId ,
      component: (<Select disabled={user.level != '1'} onChange={changeMainAccount}>
        {
          mainAccount.map((option, i) => (
          <Option disabled={option.status === 0} value={option.mainSystemUserId} key={i}> {option.mainUserName }（{option.mainTelephone}）</Option>
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
    {
      label: '子账号昵称',
      name: 'userName',
      initialValue: initialValues.userName,
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入昵称',
        }
      ]
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
      label: '分组',
      name: 'bizNo',
      initialValue: initialValues.bizNo,
      component: (<Select  >
        {
          bizes.map((option, i) => (
          <Option disabled={option.status === 0} value={option.bizNo} key={i}> {option.bizName }</Option>
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
    {
      label: '状态',
      name: 'status',
      initialValue: String(initialValues.status),
      component: (<Select>
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
      if (btnDsiabled) return
      const params = {
        systemUserId: index > -1 ? list[index].systemUserId : '',
        parentId:getFieldsValue().mainSystemUserId,
        ...getFieldsValue()
      }
      btnDsiabled = true
      API.id41535(params).then(res => {
        message.success('操作成功')
        btnDsiabled = false
        onOk()
      }).catch(err => {
        btnDsiabled = false
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
export default (props: IProps) => (
  <UserContexts.Consumer>
    {
      ({ user }) => <EditForm user={user} {...props} />
    }
  </UserContexts.Consumer>
)