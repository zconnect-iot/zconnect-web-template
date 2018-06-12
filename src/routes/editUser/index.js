import { connect } from 'react-redux'
import { getFormValues, isDirty, isValid } from 'redux-form/immutable'
import { diff } from 'deep-object-diff'
import { pickBy } from 'lodash'

import { toJS } from 'zc-core/hocs'
import { apiRequest, apiReset } from 'zc-core/api/actions'
import { emptyMap } from 'zc-core/utils'

import EditUser from './EditUser'

import {
  selectApiState,
  selectInitialValues,
} from './selectors'


const mapStateToProps = (state, props) => {
  const { userId } = props.match.params
  const vals = getFormValues('editUser')(state) || emptyMap
  return {
    api: selectApiState(state),
    userId,
    initialValues: selectInitialValues(state, { userId }),
    currentValues: vals,
    dirty: isDirty('editUser')(state),
    valid: isValid('editUser')(state),
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  submitForm: userFields => dispatch(apiRequest(
    'editUser',
    { userId: props.match.params.userId },
    userFields,
  )),
  fetchUser: () => dispatch(apiRequest(
    'getUser',
    { userId: props.match.params.userId },
  )),
  resetApi: () => dispatch(apiReset(null, null, 'users')),
})


const mergeProps = (state, dispatch) => ({
  ...state,
  ...dispatch,
  submitForm: () => {
    const currentVals = state.currentValues.toJS()
    const isSubmittedField = (val, key) => ['first_name', 'last_name', 'username', 'email', 'phone_number', 'password'].indexOf(key) > -1
    const initialUserValues = pickBy(state.initialValues, isSubmittedField)
    const currentUserValues = pickBy(currentVals, isSubmittedField)
    const changedUserFields = diff(initialUserValues, {
      ...currentUserValues,
      username: currentUserValues.email,
    })
    dispatch.submitForm(changedUserFields)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(EditUser))
