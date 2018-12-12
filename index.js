import React from 'react'
import ReactDOM from 'react-dom'

// 主页面
import App from './src/App'
import ErrorBoundary from './src/ErrorBoundary'
import configureStore from '@/stores'

const stores = configureStore()

ReactDOM.render(
  <ErrorBoundary>
    <App stores={stores}/>
  </ErrorBoundary>
  , document.getElementById('app'))

