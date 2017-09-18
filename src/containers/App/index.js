import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Page from 'zc-web/components/Page'

import Buildings from '../Buildings'
import Account from '../Account'


function App({ navigate, location }) {
  return (
    <Page
      activeRoute={location.pathname}
      navigate={navigate}
      navItems={[
        { title: 'Buildings', icon: 'BUILDING', route: '/buildings' },
        { title: 'Outlets', icon: 'FAUCET', route: '/outlets' },
        { title: 'Account', icon: 'PERSON', route: '/account' },
      ]}
    >
      <Redirect from="/" exact to="/buildings" />
      <Switch>
        <Route path="/buildings" component={Buildings} />
        <Route path="/account" component={Account} />
      </Switch>
    </Page>
  )
}

App.propTypes = {
  navigate: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const mapDispatchToProps = dispatch => ({
  navigate: route => dispatch(push(route)),
})

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(App))
