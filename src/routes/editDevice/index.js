import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Card } from 'zc-web/views'
import { Content, Spinner } from 'zc-web/components'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState } from 'zc-core/api/selectors'

import { selectDevice } from 'routes/device/selectors'
import EditDeviceForm from './EditDeviceForm'


class EditDevice extends React.Component {
  submitForm = (values) => {
    this.props.submitForm(values.toJS())
  }

  componentDidMount() {
    this.props.fetchDevice()
  }

  render() {
    const api = this.props.api.toJS()
    const pending = api.pending ||
      (api.error === false && api.success === false)
    let content = null
    if (pending) {
      content = <Spinner />
    }
    else if (api.success) {
      content = (
        <Card panel title="Device details">
          <EditDeviceForm
            onSubmit={this.submitForm}
            loading={pending}
            initialValues={this.props.device.toJS()}
          />
        </Card>
      )
    }
    else {
      content = <h4>Error loading device details</h4>
    }

    return (
      <Content title="Edit device">{content}</Content>
    )
  }
}

EditDevice.propTypes = {
  fetchDevice: PropTypes.func.isRequired,
  device: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => ({
  device: selectDevice(state, props),
  api: selectAPIState(state, { storeKey: 'devices' }),
})

const mapDispatchToProps = (dispatch, props) => ({
  submitForm: values => dispatch(apiRequest(
    'editDevice',
    { deviceId: props.match.params.deviceId },
    values,
  )),
  fetchDevice: () => dispatch(apiRequest(
    'getDevice',
    { deviceId: props.match.params.deviceId },
  )),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDevice)
