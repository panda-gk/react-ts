import * as React from 'react'
import { Upload, Icon, message, Button } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { FormItemProps } from 'antd/lib/form'

import request from '@utils/request'

import config from '../../config'

// import * as styles from './index.scss'

interface IProps extends FormItemProps {
  value?: string[],
  onChange?: (value: string[]) => void,
  /** 数量 [最少 1， 最多 1] */
  quantity?: [number, number],
  disabled?: boolean,
}

interface IState {
  value: UploadFile[],
}

export default class UploadFiles extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      value: [],
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      if (typeof nextProps.value === 'object') {
        return {
          value: nextProps.value.map((ele, i) => ({
            uid: String(i),
            name: `附件${i+1}`,
            status: 'done',
            url: ele,
            size: 12,
            type: ''
          }))
        }
      }
      return {
        value: [{
          uid: String(1),
          name: '附件1',
          status: 'done',
          url: nextProps.value,
          size: 12,
          type: ''
        }]
      }
    }
    return null
  }

  customRequest = (e) => {
    const UploadConfig = {
      url: `${config.API_BASE_URL}/api/merchant/common/uploadFile`,
      token: window.localStorage.getItem('ZB_BUSINESS_token'),
    }
    const formData = new FormData()
    formData.append('file', e.file, e.file.name)
    formData.append('fileType', '1')
    const requestConfig = {
      url: UploadConfig.url,
      method: 'POST',
      headers: {
        'X-TOKEN': UploadConfig.token,
        // 'y-zhibo-api': 'y-zhibo-api',
      },
      data: formData,
    }
    request(requestConfig).then((res: any) => {
      this.onUploadChange(res.url)
    }).catch(() => {
      message.error('上传出错!')
    })
  }

  onUploadChange = (url: string) => {

    const propsToUrls = this.state.value.map(ele => ele.url)
    propsToUrls.push(url)
    // const propsToUrls = [url]
    if (!('onChange' in this.props)) {
      const fileListNew: UploadFile[] = propsToUrls.map((ele, i) => ({
        uid: String(i),
        name: `附件${i+1}`,
        status: 'done',
        url: ele,
        size: 12,
        type: ''
      }))
      this.setState({ value: fileListNew })
    }
    this.triggerChange(propsToUrls)
  }

  triggerChange = (files) => {
    console.log(222, files)
    const onChange = this.props.onChange
    if (onChange) {
      onChange(files)
    }
  }

  onRemove = (e: UploadFile) => {
    if (this.props.disabled) {
      return
    }
    const { uid } = e
    const value = this.state.value.filter(ele => ele.uid !== uid)
    this.setState({
      value
    })
    this.triggerChange(value.map(ele => ele.url))
  }

  render() {
    const { value } = this.state
    const uploadButton = (
      <div>
        <Button>
          <Icon type="upload" /> 上传附件
        </Button>
      </div>
    )

    // const quantity = this.props.quantity || [0, 1]
    // const disabled = this.props.disabled || false

    return(
      <>
        <Upload
          name="file"
          // disabled={value.length > (quantity[1] - 1) || disabled}
          fileList={value}
          customRequest={e => this.customRequest(e)}
          onRemove={e => this.onRemove(e)}
        >
          { uploadButton }
        </Upload>
      </>
    )
  }

}
