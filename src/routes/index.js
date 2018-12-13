import React from 'react'
import Loadable from 'react-loadable'
import accountRoutes from './account'

export default [
  {
    path: '/account',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "account" */ '@/layouts/account'),
      loading: () => (<div />)
    }),
    routes: accountRoutes
  },
  {
    path: '/',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "main" */ '@/layouts/main'),
      loading: () => (<div />)
    }),
  },
]