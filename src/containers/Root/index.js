import React from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { withErrorBoundary } from 'zc-web/hocs'
import Raven from 'raven-js'

import ErrorHandler from 'containers/ErrorHandler'

import AuthRouter from '../AuthRouter'
import AppRouter from '../AppRouter'

import { optimisticLogin } from './actions'

class Root extends React.Component {
  componentWillMount() {
    this.props.optimisticLogin()
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={AuthRouter} />
        <Route path="/signup" component={AuthRouter} />
        <Route path="/forgotten" component={AuthRouter} />
        <Route component={AppRouter} />
      </Switch>
    )
  }
}

Root.propTypes = {
  optimisticLogin: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  optimisticLogin: () => dispatch(optimisticLogin()),
})

export default withRouter(compose(
  hot(module),
  withErrorBoundary({
    FallbackComponent: ErrorHandler,
    errorCallback: (error, info) => Raven.captureException(error, { extra: { info } }),
  }),
  connect(
    null,
    mapDispatchToProps,
  ),
)(Root))
