/**
 * @author Chan Zewail
 * ###### Thu Jan 25 19:28:40 CST 2018
 */
import React, { Component } from 'react'
import RouteWithSubRoutes from '@/constants/RouteWithSubRoutes'
import styles from './index.less'

export default class AccountLayout extends Component {
  render() {
    const { routes } = this.props
    return (
      <div className="container">
        {
          routes && routes.map((route, index) => (<RouteWithSubRoutes {...route} key={index} />))
        }
      </div>
    )
  }
}
