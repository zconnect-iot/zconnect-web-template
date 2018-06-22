import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapProps } from 'recompose'
import qs from 'query-string'

import { selectUserLoggedIn } from 'zc-core/auth/selectors'
import { Forgotten, Login, PasswordConfirm, Register } from 'zc-web/containers/auth'

import styles from './style.scss'


const LoginWithProps = mapProps(
  ({ history, location }) => ({
    onForgotten: email => history.push(email ? `/forgotten?email=${email}` : '/forgotten'),
    email: qs.parse(location.search).email,
  }),
)(Login)

const PasswordConfirmWithProps = mapProps(
  ({ location, history }) => {
    const { uid, token } = qs.parse(location.search)
    return {
      onSuccess: () => history.push('/login'),
      uid,
      token,
    }
  },
)(PasswordConfirm)

const ForgottenWithProps = mapProps(
  ({ location }) => {
    const { email } = qs.parse(location.search)
    return {
      email,
    }
  },
)(Forgotten)

function AuthRouter({ authenticated }) {
  if (authenticated) return (
    <Redirect to="/" />
  )
  return (
    <div className={styles.AuthRouter}>
      <Route path="/login" component={LoginWithProps} />
      <Route path="/forgotten" component={ForgottenWithProps} />
      <Route path="/reset" component={PasswordConfirmWithProps} />
    </div>
  )
}

AuthRouter.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  authenticated: selectUserLoggedIn(state),
})

export default withRouter(connect(
  mapStateToProps,
)(AuthRouter))
