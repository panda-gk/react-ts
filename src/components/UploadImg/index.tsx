import * as React from 'react'
import { Upload, Icon, Modal } from 'antd'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { UploadFile } from 'antd/lib/upload/interface'
import config from './../../config'

const defaultProps = {
  disabled: true,
  fileList: [] as string[],
  max: 1,
}

@observer
export default class UploadImg extends React.Component<typeof defaultProps> {

  static defaultProps = defaultProps

  @observable previewVisible: boolean = false
  @observable previewImage: string = ''

  componentDidMount() {
    console.log(22222, this.props)
  }

  handleChange = ({ file, fileList }) => {
    console.log(file, 889988)
    console.log(fileList)
    console.log('删除图片')
  }

  @action
  handlePreview = (file) => {
    this.previewImage = file.url
    this.previewVisible = true
  }

  @action
  handleCancel = () => {
    this.previewVisible = false
  }

  render() {
    const UploadBtn = (
      <div>
        <Icon type="plus" />
        <div className="btn-text">上传</div>
      </div>
    )
    const { disabled, fileList, max } = this.props

    const uploadFiles: UploadFile[] = fileList.map((file, i) => ({
      uid: String(i),
      name: String(i),
      status: 'done',
      type: '',
      size: 100000,
      url: file,
    }))


    return(
      <div className="clearfix">
        <Upload
          disabled={disabled}
          listType="picture-card"
          fileList={uploadFiles}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          { (fileList.length - 1  > max) || disabled ? null : UploadBtn}
        </Upload>

        <Modal
          visible={ this.previewVisible }
          footer={null}
          onCancel={this.handleCancel}
        >
          <img style={{width: '100%'}} src={this.previewImage}/>
        </Modal>
      </div>
    )
  }

}