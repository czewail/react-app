import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd'
import { Link, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { push } from 'react-router-redux'
import { types } from '../../stores/reducers/auth'
import styles from './index.less'
import menus from '@/constants/menus'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@connect(({ auth }) => ({ auth }))
export default class MainLayout extends Component {
  constructor(props) {
    super(props)
    const { auth } = props
    this.state = {
      collapsed: false,
    }
  }

  @autobind()
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  @autobind()
  handleLogout() {
    this.props.dispatch({
      type: types.CLEAR_TOKEN
    })
  }

  @autobind()
  handleModifyPassWorld() {
    this.props.dispatch(push('/account/reset-password'))
  }

  render() {
    const { routes, location, auth, permissions } = this.props
    const _permissions = permissions && permissions.map(p => p.key) || []
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          theme="dark"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo} >
            {
              !this.state.collapsed ?
                <img style={{ width: '86%' }} src={'http://dummyimage.com/200x50'} alt="" /> :
                null
            }
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={['1']}
            defaultSelectedKeys={[`${location.pathname}`]}
          >
            {
              menus.filter(n => !n.permission || ~_permissions.indexOf(n.permission)).map(menu => {
                return (
                  menu.children ?
                    <SubMenu
                      key={menu.path}
                      title={
                        <span>
                          {menu.icon && <Icon type={menu.icon} />}
                          <span>{menu.title}</span>
                        </span>
                      }
                    >
                      {
                        menu.children && menu.children.filter(n => !n.permission || ~_permissions.indexOf(n.permission)).map(child => {
                          return (
                            <Menu.Item key={child.path}>
                              <Link to={child.path}>
                                {child.title}
                              </Link>
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu> :
                    <Menu.Item key={menu.path}>
                      <Link to={menu.path}>
                        {
                          menu.icon && <Icon type={menu.icon} />
                        }
                        <span>
                          {menu.title}
                        </span>
                      </Link>
                    </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.username}>
                <Dropdown overlay={(
                  <Menu>
                    <Menu.Item>
                      <a onClick={this.handleModifyPassWorld}>修改密码</a>
                      <a onClick={this.handleLogout}>退出登录</a>
                    </Menu.Item>
                  </Menu>
                )}>
                  <a>
                    {'用户名'} <Icon type="down" />
                  </a>
                </Dropdown>
              </div>
            </Header>
          </Header>
          <Content className={styles.content}></Content>
        </Layout>
      </Layout>
    )
  }
}