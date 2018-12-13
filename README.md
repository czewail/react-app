# React 开发基础框架
- 基于 webpack4 + babel 7
- 使用 less 开发样式
- 使用 ant-design 作为 UI 框架
- 整合 react + redux + react-router + redux-saga + redux-persist
- 使用 React 16.x 版本

## reducers

reducer 文件位于 `src/stores/reducers` 目录，reducer 文件创建后自动加载无需引入

例如，创建一个用户数据的 reducer， `src/stores/reducers/user.js`：

```js

import { combineReducers } from 'redux'

export const types = {
  REQUEST_LIST: Symbol('request_users'),
  RECEIVE_LIST: Symbol('receive_users'),
}
// 用户列表 reducer
const list = (state = {
  isFetching: true,
  didInvalidate: false,
  lastFetchedTime: null,
  data: {}
}, action) => {
  switch (action.type) {
    case types.REQUEST_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case types.RECEIVE_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        lastFetchedTime: Math.round(Date.now() / 1000),
        data: action.payload || [],
      }
    default:
      return state
  }
}

// 大多数情况我们取用列表

const rootReducer = combineReducers({
  list,
})

export default auth
```