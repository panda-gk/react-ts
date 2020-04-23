import React, {useState}  from 'react';
import { Input, Select, Modal,Upload, message, Button, Icon  } from 'antd'
import JsonForm, { IFormItem } from '@components/JsonForm'
import API from '../../../api'
const { Option } = Select;
import { WrappedFormUtils } from 'antd/lib/form/Form'
import {STATUS_OPTIONS2, UPDARE_TYPE_OPTIONS} from '../../../constants'
import config from '../../../config'
interface IProps {
  list: any[],
  index: number,
  visible: boolean,
  onClose: () => void,
  onOk: () => void,
}

 const EditForm = (props: IProps) => {
  const [url , setUrl] = useState('')
  const { list, index, onClose, visible, onOk } =  props
  const defaultValues = {
    version: '', // 版本号
    updateDesc: '', // 更新日志
    updateType: '', // 更新方式
    deviceType: '', // 手机型号
    url: '',
    status: '' // 状态
  }
  const [initialValues, setInitialValues] = useState<Partial<any>>(defaultValues)
  const [upload, setUpload] = useState({
    url: "",
    packageSize: 0,
  })

  let btnDisabled = false

  let formRef: WrappedFormUtils = null
  React.useEffect(() => {
    // 表单初始化
    if (index > -1) { // 编辑数据回显
      // 根据list 和编辑下标index 基本都可以获取到item数据,不建议使用主键id
      const item = list[index]
      setUrl(item.url)
      setInitialValues(item)
    } 
  }, [list, index])
  
  const uploadProps = {
    name: 'file',
    method:'post',
    data: {
      mediaType: 5
    },
    action: `${config.API_BASE_URL}/api/fileUpload/upload`,
    showUploadList: false,
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        setUpload({
          url: info.file.response.data.fullPath,
          packageSize: info.file.response.data.packageSize
        })
      }
      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
       
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  }
  const formItems: IFormItem[] = [
    {
      name: 'version',
      label: '版本号',
      initialValue: initialValues.version,
      component: <Input placeholder="请输入版本号" />,
      rules: [
        {
          required: true,
          message: '请输入版本号',
        }
      ],
    },
    {
      name: 'url',
      label: '上传插件包',
      initialValue: initialValues.url,
      component: (
        <Upload {...uploadProps}>
          <div>
            <p>{ upload.url ? upload.url : url}</p>
            <Button style={{margin: '10px 0'}}> <Icon type="upload" /> 上传文件 </Button>
            <p>支持扩展名：.apk</p>
          </div>
        </Upload>),
      rules: [
        {
          required: true,
          message: '请上传插件',
        }
      ],
    },
    {
      name: 'updateDesc',
      label: '更新日志',
      initialValue: initialValues.updateDesc,
      component: <Input.TextArea  placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入更新日志',
        }
      ],
    },
    {
      name: 'deviceType',
      label: '手机型号',
      initialValue: initialValues.deviceType,
      component: <Input placeholder="请输入" />,
      rules: [
        {
          required: true,
          message: '请输入手机型号',
        }
      ],
    },
    {
      label: '更新方式',
      name: 'updateType',
      initialValue: String(initialValues.updateType),
      component: (<Select>
        {
          UPDARE_TYPE_OPTIONS.map((option, i) => (
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
        version: getFieldsValue().version, // 版本号
        updateDesc: getFieldsValue().updateDesc, // 更新日志
        updateType: getFieldsValue().updateType, // 更新方式
        deviceType:  getFieldsValue().deviceType, // 手机型号
        status:  getFieldsValue().status, // 状态
        packageSize: upload.packageSize || list[index].packageSize,
        url: upload.url || list[index].url
      }
      btnDisabled = true
      API.id41508(params).then(res => {
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
        title={ index == 0 ? '编辑' : '新增'}
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