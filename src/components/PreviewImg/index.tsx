import * as React from 'react'
import { Upload, Icon, message, Modal } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { FormItemProps } from 'antd/lib/form'

import request from '@utils/request'

import config from './../../config'

// import * as styles from './index.scss'

interface IProps extends FormItemProps {
  // value onChange 都是必传
  value?: string[],
  onChange?: (value: string[]) => void,
  /** 数量 [最少 1， 最多 1] */
  quantity?: [number, number],
  /** 尺寸 最多 10m */
  maxSize?: number,
  disabled?: boolean,
}

interface IState {
  value: UploadFile[],
  previewVisible: boolean,
  previewImage: string,
}

export default class PreviewImg extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      value: [],
      previewVisible: false,
      previewImage: null,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      if (typeof nextProps.value === 'object') {
        return {
          value: nextProps.value.map((ele, i) => ({
            uid: String(i),
            name: ele,
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
          name: nextProps.value,
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
    console.log(23546, e)
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
    if (!('onChange' in this.props)) {
      const fileListNew: UploadFile[] = propsToUrls.map((ele, i) => ({
        uid: String(i),
        name: ele,
        status: 'done',
        url: ele,
        size: 12,
        type: ''
      }))
      this.setState({ value: fileListNew })
    }
    this.triggerChange(propsToUrls)
  }

  triggerChange = (imgs) => {
    console.log(222, imgs)
    const onChange = this.props.onChange
    if (onChange) {
      onChange(imgs)
    }
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false,
    })
  }

  handlePreview = (e: UploadFile) => {
    const { url } = e
    this.setState({
      previewVisible: true,
      previewImage: url,
    })
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

    const { value, previewVisible, previewImage } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    )

    const quantity = this.props.quantity || [0, 1]

    return(
      <>
        {/* {
          value.map(ele => (
            <span key={ele} className={styles['img-item']}>
              <img src={ele} className={styles.img}/>
            </span>
          ))
        } */}
        <Upload
          name="file"
          listType="picture-card"
          accept="image/*,.gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
          fileList={value}
          customRequest={e => this.customRequest(e)}
          onPreview={ e => this.handlePreview(e)}
          onRemove={e => this.onRemove(e)}
        >
          { value.length > quantity[1] - 1 ? null : uploadButton }
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%', height: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }

}
