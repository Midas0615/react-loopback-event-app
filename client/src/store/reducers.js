import { combineReducers } from 'redux'
import user from 'modules/user'
import invite from 'modules/invite'

import { reducer as form } from 'redux-form'

export const makeRootReducer = () => {
  return combineReducers({
    user,
    form,
    invite
  })
}


export default makeRootReducer
