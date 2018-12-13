import axios from 'axios'
// import { getStore } from '@/stores'
import { message } from 'antd'
import bindDispatchToPromise from 'bind-promise-to-dispatch'
import { types } from '@/reducers/auth'
import { replace } from 'react-router-redux'


// 默认实例参数
const defaultOptions = {
  baseURL: `${process.env.BASE_URL}`,
  timeout: 30000,
  validateStatus: function () {
    return true
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}
const request = axios.create(defaultOptions)
const requestWithToken = axios.create(defaultOptions)
request.interceptors.request.use(function (config) {
  return config
})

requestWithToken.interceptors.request.use(async function (config) {
  const promiseDispatch = bindDispatchToPromise(store.dispatch)
  const { auth } = store.getState()
  if (auth.data && auth.data.accessToken) {
    const timestamp = Math.round(new Date().getTime() / 1000)
    // // 判断token是否已过期 authStore.expiresIn
    // 添加5分钟的误差
    if (timestamp - auth.lastFetchedTime > auth.data.expiresIn - 300) { // 已过期
      if (timestamp - auth.lastFetchedTime < 2592000) { // refreshToken 未过期
        // 同步刷新Token
        const newAuthData = await promiseDispatch({
          type: REQUEST_REFRESHED_TOKEN,
          payload: {
            refreshToken: auth.data.refreshToken
          }
        })
        config.headers.Authorization = `${newAuthData.type} ${newAuthData.accessToken}`
      } else {
        promiseDispatch(replace('/account/login'))
      }
    } else { // token 未过期
      config.headers.Authorization = `${auth.data.type} ${auth.data.accessToken}`
    }
  } else {
    promiseDispatch(replace('/account/login'))
  }
  return config
})
// 通用响应拦截器
const responseInterceptor = async response => {
  const { status, data } = response
  if (status >= 200 && status < 300) {
    return Promise.resolve(data)
  } else {
    // console.log(data)
    message.destroy()
    message.error(data && data.message || '网络错误')
    return Promise.reject(response)
  }
}
// 拦截 respose 进行状态判断
request.interceptors.response.use(responseInterceptor)
requestWithToken.interceptors.response.use(responseInterceptor)

export {
  request,
  requestWithToken
}

export default request
