import * as React from 'react'
import { Select, Tag } from 'antd'
interface IOption {
  label: any,
  value: any,
  [propName: string]: any,
}
interface IProps {
  value?: IOption[] | IOption,
  onChange?: (data: IOption[] | IOption) => void,
  options: IOption[],
  /**
   * 是否多选
   */
  multiple?: boolean,
  loading?: boolean,
  showTag?: boolean,
}
interface IState {
  value: IOption[] | IOption,
}
export default class SelectMore extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      if (typeof nextProps.value === 'object') {
        console.log(nextProps.value)
        return nextProps.value
      }
      console.log(111)
      return nextProps.multiple ? [] : { label: null, value: null }
    }
    return null
  }
  constructor(props) {
    super(props)
    const { multiple } = props
    this.state = {
      value: multiple ? [] : { label: null, value: null },
    }
  }
  onPopupScroll = (e) => {
    const { loading } = this.props
    if (loading) return
    const { target } = e
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      console.log('滑动到底了')
    }
  }
  onSelect = (val) => {
    console.log(`选中值 => ${val}`)
    const { multiple, onChange } = this.props
    // 查询重复
    const matcheds = this.state.value.filter(ele => ele.value === val)
    if (matcheds.length > 0) return
    const items = this.props.options.filter(ele => ele.value === val)
    const value = multiple ? this.state.value.concat(items) : items[0]
    this.setState({ value })
    onChange(value)
  }
  onClose = (val) => {
    // 只有多选才会生效
    const { onChange } = this.props
    const items = this.state.value.filter(ele => ele.value !== val)
    this.setState({
      value: items,
    })
    onChange(items)
  }
  render() {
    const { options, value, showTag, multiple } = this.props
    return (
      <div>
        <Select placeholder="请选择"
          onPopupScroll={this.onPopupScroll}
          onSelect={this.onSelect}
        >
          {
            options.map(({label, value, ...rest}) => (
              <Select.Option value={value} key={value} {...rest}>{label}</Select.Option>
            ))
          }
        </Select>
        {
          showTag && !multiple && value && value.value && (
            <Tag color="blue" >{value.label}</Tag>
          )
        }
        {
          multiple && (
            <div>
              {
                value && value.map(ele => (
                  <Tag closable color="blue" key={ele.value} onClose={() => this.onClose(ele.value)} >{ele.label}</Tag>
                ))
              }
            </div>
          )
        }
      </div>
    )
  }
}