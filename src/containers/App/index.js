import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Page, DrawerToggle } from 'zc-web/components'

import Buildings from '../Buildings'
import Outlets from '../Outlets'
import Account from '../Account'
import Notifications from '../Notifications'


function App({ navigate, location }) {
  return (
    <Page
      activeRoute={location.pathname}
      location={location}
      navigate={navigate}
      navItems={[
        { title: 'Buildings', icon: 'BUILDING', route: '/buildings' },
        { title: 'Outlets', icon: 'FAUCET', route: '/outlets' },
        { title: 'Account', icon: 'PERSON', route: '/account' },
      ]}
      headerRightContent={
        <DrawerToggle iconName="ALERT">
          <Notifications />
        </DrawerToggle>
      }
    >
      <Switch>
        <Route path="/buildings" component={Buildings} />
        <Route path="/outlets" component={Outlets} />
        <Route path="/account" component={Account} />
        <Redirect from="/" exact to="/buildings" />
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
