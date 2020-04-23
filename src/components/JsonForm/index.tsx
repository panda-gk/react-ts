import * as React from 'react'
import { Form, Button } from 'antd'
import { FormItemProps, FormProps, FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form'
interface JsonConfig {
  /**
   * ui控件
   */
  component: any;
  /**
   * form 字段
   */
  name?: string;
  /**
   * 表单状态 默认 edit 优先级高于form status
   */
  status?: 'edit' | 'preview',
  /**
   * 字段值展示组件 例如图片地址需要使用img标签展示,
   * 传入整个表单的值，便于组合
   * 当 preview 时生效
   */
  previewComponent?: (values: any) => any,
}
export type IFormItem = JsonConfig & GetFieldDecoratorOptions & FormItemProps
interface IProps extends FormProps {
  /**
   * 表单fields对应项配置
   */
  formItems: IFormItem[],
  /**
   * 用户返回 props.form
   */
  formRef?: (form: WrappedFormUtils) => any,
  /**
   * 表单按钮
   */
  footer?: boolean | any,
  /**
   * footer 按钮提交
   */
  onOk?: () => void,
  /**
   * footer 按钮取消
   */
  onCancel?: () => void,
  /**
   * 表单状态 默认 edit
   */
  status?: 'edit' | 'preview',
}
export class JsonFormComponent extends React.Component<IProps> {
  render() {
    const {
      form, formItems, formRef, footer: Footer, onOk, onCancel, status,
      ...rest
    } = this.props
    if (typeof formRef === 'function') {
      formRef(form)
    }
    const formStatus = status || 'edit' // 表单全局状态，默认edit
    return (
      <Form {...rest} >
        {
          formItems.map((formItem, i) => {
            const {
              name, label, component: Component, status, previewComponent,
              rules, getValueFromEvent, initialValue, normalize, preserve, trigger, validateFirst, validateTrigger, valuePropName,
              ...itemProps
            } = formItem
            let FormItemComponent = null
            const formItemStatus = status || formStatus
            const getFieldDecoratorOpts: GetFieldDecoratorOptions = {
              rules: rules || [],
              trigger: trigger || 'onChange',
              validateFirst: validateFirst || false,
              validateTrigger: validateTrigger || 'onChange',
              valuePropName: valuePropName || 'value'
            }
            getValueFromEvent && (getFieldDecoratorOpts.getValueFromEvent = getValueFromEvent)
            initialValue && (getFieldDecoratorOpts.initialValue = initialValue)
            normalize && (getFieldDecoratorOpts.normalize = normalize)
            preserve && (getFieldDecoratorOpts.preserve = preserve)
            if (name) {
              // 表单控件
              FormItemComponent = (
                <Form.Item label={label} key={i + name} {...itemProps}>
                  {
                    formItemStatus === 'edit' && (form.getFieldDecorator(name, getFieldDecoratorOpts)(Component))
                  }
                  {
                    formItemStatus === 'preview' && (form.getFieldDecorator(name, getFieldDecoratorOpts)(<div>{
                      (previewComponent && previewComponent(form.getFieldsValue()))
                      || form.getFieldValue(name)
                    }</div>))
                  }
                </Form.Item>
              )
            } else if (!name && label) {
              // 表单控件 没有字段对应
              FormItemComponent = (
                <Form.Item label={label} key={i} {...itemProps}>
                  {
                    Component
                  }
                </Form.Item>
              )
            } else if (!name && !label) {
              // ui控件 没有字段对应
              FormItemComponent = (
                <span key={i}>
                  {
                    Component
                  }
                </span>
              )
            }
            return FormItemComponent
          })
        }
        {Footer && (<Form.Item label=" " colon={false}>
          {
            Footer === true && (
              <div style={{
                // textAlign: 'right',
              }}>
                <Button onClick={onCancel} style={{ marginRight: '20px' }} >取消</Button>
                <Button type="primary" onClick={onOk} style={{ marginRight: '20px' }}>提交</Button>
              </div>
            )
          }
          {
            typeof Footer !== 'boolean' && <Footer />
          }
        </Form.Item>)}
      </Form>
    )
  }
}
const JsonForm = Form.create<IProps>()(JsonFormComponent)
export default JsonForm