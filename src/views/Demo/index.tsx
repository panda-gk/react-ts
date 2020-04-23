import * as React from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import PreviewImg from '@components/PreviewImg'
import UserContext from "./userContext"
// import { Omit } from 'yargs'

// type HOC<InjectProps> = <Props extends InjectProps>(Component: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof InjectProps>>

interface IFormDemoProps extends FormComponentProps {
  onSubmitToFather: (data: object) => void
}

const FormDemo = Form.create<IFormDemoProps>()((props: IFormDemoProps) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 18 },
    },
  }

  const submit = (e) => {
    console.log(props.form.getFieldsValue())
    const data = props.form.getFieldsValue()
    props.onSubmitToFather(data)
  }

  const { getFieldDecorator } = props.form

  return (
    <Form {...formItemLayout}>
      <Form.Item label="名称：">
          {
            getFieldDecorator('name')(
              <Input />
            )
          }
      </Form.Item>

      <Form.Item label="图片">
        {
          getFieldDecorator('imgs')(
            <PreviewImg />
          )
        }
      </Form.Item>
      <Form.Item>
        <Button onClick={submit}>提交</Button>
      </Form.Item>
    </Form>
  )
})

class Demo extends React.Component<FormComponentProps, {}> {

  onSubmit = (data: object) => {
    console.log(data)
  }

  render() {

    return(
      <div>
        <p>demo页面 打包模式不会被编译</p>
        <FormDemo onSubmitToFather={this.onSubmit}/>
        <UserContext />
      </div>
    )
  }

}

export default Demo
