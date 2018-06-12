import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import { selectRoutesForRole } from 'selectors'

import Devices from './devices'
import Users from './users'
import Account from './account'
import NotFound from './notFound'


function Routes({ routes }) {
  return (
    <Switch>
      { routes.includes('devices') && <Route path="/devices" component={Devices} />}
      { routes.includes('users') && <Route path="/users" component={Users} />}
      { routes.includes('account') && <Route path="/account" component={Account} />}
      <Route path="/" exact><Redirect to="/devices" /></Route>
      <Route component={NotFound} />
    </Switch>
  )
}

Routes.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
}

const mapStateToProps = state => ({
  routes: selectRoutesForRole(state),
})

export default withRouter(connect(
  mapStateToProps,
)(Routes))
