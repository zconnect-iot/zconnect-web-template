import { createSelector } from 'reselect'

import { selectErrorJSON, selectAPIState } from 'zc-core/api/selectors'

import {
  selectUserFname,
  selectUserLname,
  selectUserEmail,
  selectUserPhoneNumber,
} from 'routes/user/selectors'


export const selectInitialValues = (state, props) => ({
  first_name: selectUserFname(state, props),
  last_name: selectUserLname(state, props),
  email: selectUserEmail(state, props),
  phone_number: selectUserPhoneNumber(state, props),
  username: selectUserEmail(state, props),
  password: '',
  password2: '',
})

export const selectApiState = state => selectAPIState(state, { storeKey: 'users' })

export const selectUserError = state => selectErrorJSON(state, { storeKey: 'users' })

const getErrorsFromObject = json => json
  .valueSeq()
  .map(value => (value.join ? value.join(' ') : value))

export const selectUserErrorMessage = createSelector(
  selectUserError,
  (error) => {
    const errors = getErrorsFromObject(error)
    return errors.size ? errors.join('\n') : 'Edit user request failed'
  },
)
