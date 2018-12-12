// import { combineReducers } from 'redux'

export const types = {
  REQUEST_TOKEN: Symbol('request_token'),
  RECEIVE_TOKEN: Symbol('receive_token'),
  REQUEST_REFRESHED_TOKEN: Symbol('request_refresh_token'),
  RECEIVE_REFRESHED_TOKEN: Symbol('receive_refresh_token'),
  CLEAR_TOKEN: Symbol('clear_token'),
}

const auth = (state = {
  isFetching: true,
  didInvalidate: false,
  lastFetchedTime: null,
  data: null
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
        data: action.payload || null,
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
        data: action.payload || null,
      }
    default:
      return state
  }
}

// const rootReducer = combineReducers({
//   token,
// })

export default auth