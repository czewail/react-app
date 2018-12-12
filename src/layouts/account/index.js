/**
 * @author Chan Zewail
 * ###### Thu Jan 25 19:28:40 CST 2018
 */
import React, { Component } from 'react'
import RouteWithSubRoutes from '@/constants/RouteWithSubRoutes'
import styles from './index.less'
// import bgImage from '@/assets/bg.png'

export default class AccountLayout extends Component {
  render() {
    const { routes } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {
            routes && routes.map((route, index) => (<RouteWithSubRoutes {...route} key={index} />))
          }
        </div>
      </div>
    )
  }
}
