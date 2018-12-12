import React from 'react'
import Loadable from 'react-loadable'

export default [
  {
    path: '/account',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "account" */ '@/layouts/account'),
      loading: () => (<div />)
    }),
  },
  {
    path: '/',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "main" */ '@/layouts/main'),
      loading: () => (<div />)
    }),
  },
]