
export const types = {
  REQUEST_PERMISSIONS: Symbol('request_permission'),
  RECEIVE_PERMISSIONS: Symbol('receive_permission'),
}

const permission = (state = {
  isFetching: true,
  didInvalidate: false,
  lastFetchedTime: null,
  data: []
}, action) => {
  switch (action.type) {
    case types.REQUEST_PERMISSIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case types.RECEIVE_PERMISSIONS:
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

export default permission