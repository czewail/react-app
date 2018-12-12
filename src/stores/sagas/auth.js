import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { request, requestWithToken } from '@/constants/request'
import { types } from '../reducers/auth'
import api from '@/constants/api'

function* login() {
  yield takeEvery(types.REQUEST_TOKEN, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, api.token, payload)

      yield put({
        type: types.RECEIVE_TOKEN,
        payload: response.data || null
      })
      yield call(flushPersistor)
      resolve && resolve(response.data)
      yield put(replace('/'))
    } catch (error) {
      reject && reject(error)
    }
  })
}

function* refresh() {
  yield takeEvery(types.REQUEST_REFRESHED_TOKEN, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(request.post, api.refreshToken, payload)
      yield put({
        type: types.RECEIVE_REFRESHED_TOKEN,
        payload: response.data || null
      })
      yield call(flushPersistor)
      resolve && resolve(response.data)
      // yield put(replace('/'))
    } catch (error) {
      reject && reject(error)
    }
  })
}

function* logout() {
  yield takeEvery(types.CLEAR_TOKEN, function* ({ payload, resolve, reject }) {
    try {
      yield call(purgePersistor)
      resolve && resolve()
    } catch (error) {
      reject && reject(error)
    }
  })
}

export default function* authFLow() {
  yield all([
    fork(login),
    fork(logout),
    fork(refresh),
  ])
}