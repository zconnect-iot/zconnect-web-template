import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import DocumentTitle from 'react-document-title'

import { selectUserLoggedIn } from 'zc-core/auth/selectors'
import { Register, Forgotten, Login } from 'zc-web/containers/auth'

import styles from './style.scss'


function AuthRouter({ authenticated, location }) {
  const pathname = location.state ? location.state.from.pathname : '/'

  if (authenticated) return (
    <Redirect to={pathname} />
  )
  return (
    <Grid fluid className={styles.AuthRouter}>
      <DocumentTitle title="Overlock" />
      <Row>
        <Col xs sm={6} className={styles.main}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/forgotten" component={Forgotten} />
          </Switch>
        </Col>
      </Row>
    </Grid>
  )
}

AuthRouter.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
  }).isRequired,
}

const mapStateToProps = state => ({
  authenticated: selectUserLoggedIn(state),
})

export default withRouter(connect(
  mapStateToProps,
)(AuthRouter))
