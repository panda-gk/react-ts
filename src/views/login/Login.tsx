import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// import IProps from './interFace'
import API from '../../api'
import * as styles from './index.scss'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import cache from '../../contexts/cache'

class Login extends React.Component<RouteComponentProps & FormComponentProps> {
  btnDisabled:boolean = false

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.btnDisabled) return
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.btnDisabled = true
        API.id41454(values).then((res) => {
          this.btnDisabled = false
          cache.set('token', res.token)
          message.success('登录成功')
          this.props.history.push('/dataStatement')
        }).catch(err => {
          this.btnDisabled = false
        })
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form

    return (
        <div className={styles.login}>
          <p className={styles.control}>电豹</p>
          <p className={styles.loginTip}>账号密码登录</p>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入账号' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入账号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {/* <div className='df ac jsb'>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>自动登录</Checkbox>)}
              </div> */}
              <div className='tac w100'>
                <Button type="primary" htmlType="submit" className="login-form-button w100">
                  登录
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
    )
  }
}
export default Form.create<FormComponentProps>()(withRouter(Login) )