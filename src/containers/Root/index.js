import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { hot } from 'react-hot-loader'

import AuthRouter from '../AuthRouter'
import AppRouter from '../AppRouter'

import { optimisticLogin } from './actions'

class Root extends React.Component {
  componentWillMount() {
    this.props.optimisticLogin()
  }
  render() {
    return (<div>
      <Switch>
        <Route path="/login" component={AuthRouter} />
        <Route path="/forgotten" component={AuthRouter} />
        <Route path="/reset" component={AuthRouter} />
        <Route component={AppRouter} />
      </Switch>
    </div>)
  }
}

Root.propTypes = {
  optimisticLogin: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  optimisticLogin: () => dispatch(optimisticLogin()),
})

export default hot(module)(withRouter(connect(
  null,
  mapDispatchToProps,
)(Root)))
