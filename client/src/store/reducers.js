import { combineReducers } from 'redux'
import user from 'modules/user'
import { reducer as form } from 'redux-form'

export const makeRootReducer = () => {
  return combineReducers({
    user,
    form
  })
}


export default makeRootReducer
