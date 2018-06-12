import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { compose } from 'recompose'

import { Page } from 'zc-web/components'
import { withErrorBoundary } from 'zc-web/hocs'

import { ErrorHandler } from 'containers'
import { selectNavItemsForRole } from 'selectors'

import Routes from '../../routes'

import styles from './style.scss'


function App({ navigate, location, navItems }) {
  return (
    <Page
      activeRoute={location.pathname}
      location={location}
      navigate={navigate}
      navItems={navItems}
      className={styles.App}
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
  navItems: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
}

const mapStateToProps = state => ({
  navItems: selectNavItemsForRole(state),
})

const mapDispatchToProps = dispatch => ({
  navigate: route => dispatch(push(route)),
})

export default compose(
  withErrorBoundary({
    FallbackComponent: ErrorHandler,
  }),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(App)
