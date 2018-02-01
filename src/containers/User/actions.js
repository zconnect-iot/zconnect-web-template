import { RECEIVE_USER, RESET_USER } from './constants'

export const receiveUser = payload => ({
  type: RECEIVE_USER,
  payload,
})

export const resetUser = () => ({
  type: RESET_USER,
})
