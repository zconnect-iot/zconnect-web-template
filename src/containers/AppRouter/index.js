import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { selectUserLoggedIn } from 'zc-core/auth/selectors'

import App from '../App'


function AppRouter({ authenticated, location }) {
  if (!authenticated) return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  )
  return <App />
}

AppRouter.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  authenticated: selectUserLoggedIn(state),
})


export default withRouter(connect(
  mapStateToProps,
)(toJS(AppRouter)))
