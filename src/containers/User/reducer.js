import { Map, fromJS } from 'immutable'

import { RECEIVE_USER, RESET_USER } from './constants'

const initialState = Map()

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return fromJS(action.payload)
    case RESET_USER:
      return initialState
    default:
      return state
  }
}
