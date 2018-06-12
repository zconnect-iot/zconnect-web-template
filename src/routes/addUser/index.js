import { connect } from 'react-redux'
import { getFormValues, isDirty, isValid } from 'redux-form/immutable'

import { toJS } from 'zc-core/hocs'
import { apiRequest, apiReset } from 'zc-core/api/actions'
import { emptyMap } from 'zc-core/utils'

import {
  selectLastSetId,
} from 'selectors'

import { selectUserErrorMessage, selectApiState } from 'routes/editUser/selectors'

import AddUser from './components/AddUser'

const mapStateToProps = (state) => {
  const userVals = getFormValues('addUser')(state) || emptyMap
  return {
    api: selectApiState(state),
    userValues: userVals,
    dirty: isDirty('addUser')(state),
    valid: isValid('addUser')(state),
    lastSetId: selectLastSetId('users')(state),
    userErrorMessage: selectUserErrorMessage(state),
  }
}

const mapDispatchToProps = dispatch => ({
  submitForm: userFields => dispatch(apiRequest(
    'postUser',
    {},
    userFields,
  )),
  resetApi: () => dispatch(apiReset(null, null, 'users')),
})

const mergeProps = (state, dispatch) => ({
  ...state,
  ...dispatch,
  submitForm: () => {
    const { first_name, last_name, email, password } = state.userValues.toJS()
    const userFields = {
      first_name,
      last_name,
      email,
      password,
      username: email,
    }
    dispatch.submitForm(userFields)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(AddUser))
