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
    subSystemUserId: '', // 子账号id
    mainSystemUserId: '', // 主账号id
    storeWxId: '', // 微信id
    status: ''
  }
  let btnDisabled = false

  const [initialValues, setInitialValues] = useState<Partial<any>>(defaultValues)
  // 查询子账号
  const [sonAccount, setsonAccount]  = useState([])
  // const { list, getList, pagination } = usePagenationList(API.id41751)
  // // 查询主账号
  const [mainAccount, setMainAccount]  = useState([])
  // const { list, getList, pagination } = usePagenationList(API.id41760)

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
    const {setFieldsValue } = formRef
    setFieldsValue({
      subSystemUserId: ''
    })

    getSonAccount(value)
  }
  const formItems: IFormItem[] = [
    {
      name: 'mainSystemUserId',
      label: '归属主账号',
      initialValue: user.level != '1' ? user.systemUserId : initialValues.mainSystemUserId,
      component: (<Select onChange={changeMainAccount} disabled={user.level != '1'}>
      {
         mainAccount.map((option, i) => (
          <Option disabled={option.status === 0} value={option.mainSystemUserId} key={i}> {option.mainUserName}（{option.mainTelephone}）</Option>
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
      label: '分组名称',
      name: 'bizName',
      initialValue: initialValues.bizName,
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入',
        }
      ],
    },
   
    {
      label: '组长子账号',
      name: 'subSystemUserId',
      initialValue: initialValues.subSystemUserId,
      component: (<Select  disabled={user.level == '3'} >
        {
          sonAccount.map((option, i) => (
          <Option disabled={option.status === 0} value={option.subSystemUserId} key={i}> {option.subUserName }（{ option.subTelephone}）</Option>
          ))
        }
      </Select>)
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
      if (btnDisabled) return
      const params = {
        id: index > -1 ? list[index].id : '',
        systemUserId: getFieldsValue().subSystemUserId,
        relegationUserId: getFieldsValue().mainSystemUserId,
        bizNo:index > -1 ? list[index].bizNo : '',
        ...getFieldsValue()
      }
      btnDisabled = true
      API.id41562(params).then(res => {
        message.success('操作成功')
        btnDisabled = false
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