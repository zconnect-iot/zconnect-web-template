import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'

import { Page } from 'zc-web/components'

import Routes from '../../routes'

import UserToggle from '../User'
import NavBar from '../NavBar'

const NoNavBar = () => null

function App({ navigate, location }) {
  return (
    <Page
      activeRoute={location.pathname}
      location={location}
      navigate={navigate}
      NavBar={location.pathname === '/' ? NoNavBar : NavBar}
      headerRightContent={
        <UserToggle />
      }
    >
      <Routes />
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
