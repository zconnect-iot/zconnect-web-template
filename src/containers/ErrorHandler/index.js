import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sentry from 'raven-js'

import { logout } from 'zc-core/auth/actions'
import { Modal } from 'zc-web/components'
import { SimpleLink, Codeblock } from 'zc-web/components'


class ErrorHandler extends React.Component {
  componentDidMount() {
    Sentry.captureException(this.props.error, { extra: this.props.info })
  }
  showReportDialog = () => Sentry.lastEventId() && Sentry.showReportDialog()
  render() {
    const { retry, logoutUser, error } = this.props
    return (
      <Modal title="Something went wrong" onClose={retry}>
        <h4>
          The app encountered an error. Click <SimpleLink action={retry}>here</SimpleLink> to try again.
        </h4>
        <br />
        <h4>If that doesn{"'"}t work try reloading your browser or <SimpleLink action={logoutUser}>log out</SimpleLink> and try again.</h4>
        <br />
        <h4>A report will be sent to support. You can help by providing more info <SimpleLink action={this.showReportDialog}>here</SimpleLink></h4>
        <br />
        { error &&
          <div>
            <h4>Error details:</h4>
            <Codeblock>{error.name} - {error.message}</Codeblock>
          </div>
        }
      </Modal>
    )
  }
}

ErrorHandler.propTypes = {
  retry: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  error: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  info: PropTypes.shape().isRequired,
}

const mapDispatchToProps = (dispatch, props) => ({
  logoutUser: () => {
    dispatch(logout())
    props.retry()
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(ErrorHandler)
