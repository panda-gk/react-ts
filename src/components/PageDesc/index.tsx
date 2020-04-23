import * as React from 'react'
import { Icon } from 'antd'

const Header = (desc?: string) => (
  <div style={{marginBottom: '20px', color: '#c0c0c0'}}>
    <Icon type="info-circle" />
    <span style={{marginLeft: '10px'}}>{desc || ''}</span>
  </div>
)

export default Header
