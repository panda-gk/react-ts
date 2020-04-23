import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Main from './layout/Main'
import HeaderTop from '../../components/HeaderTop'
import { Layout } from 'antd';
import UserContexts from '../../contexts/user'
const { Header, Content } = Layout;



class Home extends React.Component<RouteComponentProps, {}> {
  render() {
    const flag = window.location.href.indexOf('chatMag') != -1
    return(
      <UserContexts.UserProvider>
        <Layout>
          
          <Header className='pof'><HeaderTop {...this.props}/></Header>
          <Layout> 
            <Content className={`${flag ? '' : 'pdlr20'} bgf`} style={{marginTop: '64px'}}> <Main /></Content>
          </Layout>
        </Layout>
      </UserContexts.UserProvider>
    )

  }
}

export default hot(module)(Home)
