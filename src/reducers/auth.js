// import { combineReducers } from 'redux'

// MARK: TYPES

export const types = {
  REQUEST_TOKEN: Symbol('request_token'),
  RECEIVE_TOKEN: Symbol('receive_token'),
  REQUEST_REFRESHED_TOKEN: Symbol('request_refresh_token'),
  RECEIVE_REFRESHED_TOKEN: Symbol('receive_refresh_token'),
  CLEAR_TOKEN: Symbol('clear_token'),
}

// MARK: ACTIONS

export const actions = {
  login: (username, password) => {
    return { type: types.REQUEST_TOKEN, payload: { username, password } }
  },
  logout: () => {
    return { type: types.CLEAR_TOKEN }
  },
}

// MARK: REDUCERS

const authReducer = (state = {
  isFetching: true,
  didInvalidate: false,
  lastFetchedTime: null,
  entity: null
}, action) => {
  switch (action.type) {
    case types.REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case types.RECEIVE_TOKEN:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        lastFetchedTime: Math.round(Date.now() / 1000),
        entity: action.payload || null,
      }
    case types.REQUEST_REFRESHED_TOKEN:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case types.RECEIVE_REFRESHED_TOKEN:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        lastFetchedTime: Math.round(Date.now() / 1000),
        entity: action.payload || null,
      }
    default:
      return state
  }
}

// const rootReducer = combineReducers({
//   token,
// })

export default authReducer