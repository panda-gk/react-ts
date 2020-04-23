import React, {Component}  from 'react';
import { Input, Select, Modal } from 'antd'
import JsonForm, { IFormItem } from '@components/JsonForm'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import API from '../../../api'
const { Option } = Select;
const options = [
  {
    value: 0,
    label: '禁用'
  },
  {
    value: 1,
    label: '正常'
  },
]

interface IProps {
  list: any[],
  index: number,
  visible: boolean,
  onClose: () => void,
  onOk: (any) => void,
}
class EditForm extends Component<IProps> {
  // const { list, index, onClose, visible, onOk } =  this.props
  state = {
    initialValues: {
      subSystemUserId: '', // 子账号id
      mainSystemUserId: '', // 主账号id
      storeWxId: '', // 微信id
      status: ''
    },
    index: null,
    sonAccount: [
      {
        value: '0',
        label: '子账号1'
      },
      {
        value: '2',
        label: '子账号2'
      },
    ],
    mainAccount: [
      {
        value: '0',
        label: '张任1'
      },
      {
        value: '1',
        label: '张任12'
      },
    ],
    formItems: [
      {
        name: 'storeNo',
        label: '微信号',
        initialValue: '',
        component: <Input placeholder="请输入微信id" />
      },
      {
        label: '登录状态',
        name: 'status',
        initialValue: '',
        component: (<Select>
          {
            options.map((option, i) => (
              <Option value={option.value} key={i}>{option.label}</Option>
            ))
          }
        </Select>)
      },
      {
        label: '主账号',
        name: 'mainSystemUserId',
        initialValue: '',
        component: (<Select>
          {
             this.state.mainAccount.map((option, i) => (
              <Option value={option.value} key={i}>{option.label}</Option>
            ))
          }
        </Select>)
      },
      {
        label: '子账号',
        name: 'subSystemUserId',
        initialValue:  '',
        component: (<Select >
          {
            this.state.sonAccount.map((option, i) => (
              <Option value={option.value} key={i}>{option.label}</Option>
            ))
          }
        </Select>)
      },
   ]
  }
  formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 14
    },
  }
  formRef: WrappedFormUtils = null

   componentWillReceiveProps(nextProps) {
     console.log(nextProps)
    if (nextProps.index > -1) {
      this.getItemInfo()
    }
  }
  getItemInfo () {
    const { list, index, onClose, visible, onOk } =  this.props
    const item = list[index]
    this.setState({
      initialValues: item
    }, () => {
      const formItems = [
        {
          name: 'storeNo',
          label: '微信号',
          initialValue: this.state.initialValues.storeWxId,
          component: <Input placeholder="请输入微信id" />
        },
        {
          label: '登录状态',
          name: 'status',
          initialValue: String(this.state.initialValues.status),
          component: (<Select>
            {
              options.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
          </Select>)
        },
        {
          label: '主账号',
          name: 'mainSystemUserId',
          initialValue: this.state.initialValues.mainSystemUserId,
          component: (<Select>
            {
               this.state.mainAccount.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
          </Select>)
        },
        {
          label: '子账号',
          name: 'subSystemUserId',
          initialValue:  this.state.initialValues.subSystemUserId,
          component: (<Select >
            {
              this.state.sonAccount.map((option, i) => (
                <Option value={option.value} key={i}>{option.label}</Option>
              ))
            }
          </Select>)
        },
      ]
      this.setState({
        formItems
      })
    })
  }
  changeMainAccount() {
    const list = [
      {
        value: '1',
        label: '子账号1'
      },
      {
        value: '2',
        label: '子账号2'
      },
      {
        value: '3',
        label: '子账号3'
      },
      {
        value: '4',
        label: '子账号4'
      },

    ]
    this.setState({
      sonAccount:list
    })
  }
  submit() {
    const { validateFields, getFieldsValue } = this.formRef
    validateFields(err => {
      if (err) return
      console.log(getFieldsValue)
    })
  }
  render() {
    const { index, onClose, visible } =  this.props
    return(
      <div>
        <Modal
          title={ index == 0 ? '编辑' : '新增'}
          visible={visible}
          onOk={this.submit.bind(this)}
          key={index}
          onCancel={onClose}
        >
          
          <JsonForm
            formItems={this.state.formItems}
            {...this.formItemLayout}
            formRef={e => (!this.formRef && (this.formRef = e))}
          />
        </Modal>
      </div>
    )
  }
}
export default EditForm