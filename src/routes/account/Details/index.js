import { connect } from 'react-redux'
import { getFormValues, isDirty, isValid, change } from 'redux-form/immutable'
import { diff } from 'deep-object-diff'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectUserId } from 'zc-core/auth/selectors'
import { emptyMap } from 'zc-core/utils'

import { selectApiState } from 'selectors'

import { selectUserLname, selectUserFname, selectUserEmail, selectUserPhoneNumber } from 'routes/user/selectors'

import { selectErrorMessage } from './selectors'
import Details from './Details'

const mapStateToProps = (state) => {
  const props = { userId: selectUserId(state) }
  const vals = getFormValues('account')(state) || emptyMap
  return {
    api: selectApiState('users')(state),
    initialValues: {
      first_name: selectUserFname(state, props),
      last_name: selectUserLname(state, props),
      email: selectUserEmail(state, props),
      phone_number: selectUserPhoneNumber(state, props),
      password: '',
      password2: '',
    },
    currentValues: vals,
    dirty: isDirty('account')(state),
    valid: isValid('account')(state),
    errorMessage: selectErrorMessage(state),
  }
}

const mapDispatchToProps = dispatch => ({
  submitForm: values => dispatch(apiRequest(
    'editUser',
    { userId: selectUserId },
    values,
  )),
  resetPasswordFields: () => {
    dispatch(change('account', 'password', ''))
    dispatch(change('account', 'password2', ''))
  },
})


const mergeProps = (state, dispatch, props) => ({
  ...state,
  ...dispatch,
  ...props,
  submitForm: () => {
    dispatch.submitForm(diff(state.initialValues, state.currentValues.toJS()))
    // Reset password fields on submission or form will be dirty after successful PATCH
    // because in initialValues they are empty. Downside is if form submit fails you
    // have to retype password but other solutions get complicated fast
    dispatch.resetPasswordFields()
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(Details))
