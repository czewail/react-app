import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styles from './index.less'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { actions } from '@/reducers/auth'

const FormItem = Form.Item

@connect(() => ({}), { ...actions })
@Form.create()
export default class Login extends Component {
  @autobind()
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.logo}>
            <img src={'http://dummyimage.com/300x75'} alt="" />
          </div>
          <div className={styles.main}>
            <h1 className={styles.title}>登陆</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', border: 0 }} />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                <a className={styles.forgot} href="">忘记密码？</a>
                <Button htmlType="submit" size="large" type="primary" block>登陆</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
