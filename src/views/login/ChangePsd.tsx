import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import IProps from './interFace'
import API from '../../api'
import * as styles from './index.scss'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
class ChangePsd extends React.Component<IProps & RouteComponentProps > {
  btnDisabled:boolean = false

  handleSubmit = e => {
    e.preventDefault();
    if (this.btnDisabled) return
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.btnDisabled = true
        API.id41454(values).then((res) => {
          this.btnDisabled = false
          this.props.userStore.updateToken(res.token)
          message.success('登录成功')
          // this.props.history.push('/dataStatement')
        }).catch(err => {
          this.btnDisabled = false
        })
      }
    });
  };
  // 获取验证码
  getCode() {

  }
  render(){
    const { getFieldDecorator } = this.props.form

    return(
      <div className={styles.login}>
        <p className={styles.control}>电豹</p>
        <p className={styles.loginTip}>找回密码</p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入手机号' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入手机号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <div className='df'>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="请输入验证码"
                />,
              )}
              <Button className='ml10' onClick={this.getCode.bind(this)}>获取验证码</Button>
            </div>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入新密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入新密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <div className='df ac jsb'>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>自动登录</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </div>
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
export default Form.create()(withRouter(ChangePsd) )