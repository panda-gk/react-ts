import React, {useState}  from 'react';
import { Input, Select, Modal, message } from 'antd'
import JsonForm, { IFormItem } from '@components/JsonForm'
// import SelectMore from '@components/SelectMore'
import UserContexts from '../../../contexts/user'
import API from '../../../api'
import { STATUS_OPTIONS2, FANS_REQUEST_PTIONS} from '../../../constants'

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
    subSystemUserId: '', // 子账号id
    mainSystemUserId: '', // 主账号id
    storeWxId: '', // 微信id
    status: '',
    autoAddUserSwitch: '',
  }
  const [initialValues, setInitialValues] = useState<Partial<any>>(defaultValues)
  // 查询子账号
  const [sonAccount, setsonAccount]  = useState([])
  // const { list, getList, pagination } = usePagenationList(API.id41751)
  // // 查询主账号
  const [mainAccount, setMainAccount]  = useState([])
  // const { list, getList, pagination } = usePagenationList(API.id41760)
  let btnDisabled = false
  let formRef: WrappedFormUtils = null
  React.useEffect(() => {
    // 表单初始化
    if (index > -1) { // 编辑数据回显
      // 根据list 和编辑下标index 基本都可以获取到item数据,不建议使用主键id
      const item = list[index]
      setInitialValues(item)
    }
    getMainAccount(user.systemUserId)
  }, [list, index])
  
  const getMainAccount = async (systemUserId) => {
    const params = {
      level: user.level,
      systemUserId
    }
    const res = await API.id41760(params)
    setMainAccount(res)
    if (index <= -1) { // 编辑数据回显
      // 新增
      // user.level != '1'
      // 主账号
      if (user.level == 2) {
        getSonAccount(user.systemUserId)
      } else if (user.level == 3) {
        getSonAccount(user.parentId)
      }
    } else {
      // 编辑
      getSonAccount(list[index].mainSystemUserId)
    }
    // 管理员
    // 2主账号
    // 3 子账号
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
    const {setFieldsValue } = formRef
    setFieldsValue({
      subSystemUserId: ''
    })

    getSonAccount(value)
  }

  // 检测权限
  let id  =  initialValues.mainSystemUserId
  if (user.level == 2) {
    id = user.systemUserId
  } else if (user.level == 3) {
    id = user.parentId
  }
  const formItems: IFormItem[] = [
    {
      name: 'storeWxId',
      label: '微信号',
      initialValue: initialValues.storeWxId,
      component: <Input placeholder="请输入微信id" />,
      rules: [
        {
          required: true,
          message: '请输入微信号',
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
    {
      label: '主账号',
      name: 'mainSystemUserId',
      initialValue: id,
      component: (<Select onChange={changeMainAccount} disabled={user.level != '1'}>
        {
           mainAccount.map((option, i) => (
            <Option  disabled={option.status === 0} value={option.mainSystemUserId} key={i}> {option.mainUserName}（{option.mainTelephone}）</Option>
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
      label: '子账号',
      name: 'subSystemUserId',
      initialValue: user.level == 3 ? user.systemUserId : initialValues.subSystemUserId,
      component: (<Select  disabled={user.level == '3'} >
        {
          sonAccount.map((option, i) => (
          <Option  disabled={option.status === 0} value={option.subSystemUserId} key={i}> {option.subUserName }（{option.subTelephone}）</Option>
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
      label: '通过好友请求',
      name: 'autoAddUserSwitch',
      initialValue: String(initialValues.autoAddUserSwitch),
      component: (<Select>
        {
          FANS_REQUEST_PTIONS.map((option, i) => (
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
        id: index > -1 ? list[index].id : '',
        systemUserId: getFieldsValue().subSystemUserId,
        ...getFieldsValue()
      }
      btnDisabled = true
      API.id41589(params).then(res => {
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
export default (props: IProps) => (
  <UserContexts.Consumer>
    {
      ({ user }) => <EditForm user={user} {...props} />
    }
  </UserContexts.Consumer>
)