import createReducer from 'lib/createReducer'
import store from 'store'
import API from 'services/api'

const REQUEST = 'USER_LOGIN/REQUEST';
const RECEIVE = 'USER_LOGIN/RECEIVE';
const REJECT = 'USER_LOGIN/REJECT';
const VERIFY = 'USER_LOGIN/ACCESS_TOKEN';
const INVALID = 'USER_LOGIN/INVALID_ACCESS_TOKEN';
const LOGOUT = 'USER_LOGOUT';

export const login = (data) => async dispatch => {
  dispatch({ type: REQUEST })
  try {
    const token = await API().post('/accounts/login', data)
    store.set('accessToken', token)
    const user = await API().get(`/accounts/${token.userId}`)
    dispatch({ type: RECEIVE, user })
  } catch(e) {
    dispatch({ type: REJECT })
  }
}

export const verifyToken = () => async dispatch => {
  dispatch({ type: VERIFY })
  try {
    const token = store.get('accessToken')
    if (!token) return dispatch({ type: INVALID })
    const user = await API().get(`/accounts/${token.userId}`)
    dispatch({ type: RECEIVE, user })
  } catch(e) {
    store.remove('accessToken')
  }
}

export const logout = () => async dispatch => {
  await API().post('/accounts/logout')
  store.remove('accessToken')
  dispatch({ type: LOGOUT })
}


export default createReducer({ isFetching: true }, {
  [REQUEST]: (state, action) => ({ ...state, isFetching: true, isError: false }),
  [RECEIVE]: (state, action) => ({ ...state, ...action.user, isFetching: false }),
  [REJECT]: (state, action) => ({ ...state, isFetching: false, loginError: true }),
  [INVALID]: (state, action) => ({ ...state, isFetching: false, tokenError: true }),
  [LOGOUT]: (state, action) => ({ isFetching: false })
})
