import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Content, DateRangeModal } from 'zc-web/components'
import { ActivityStream, TimeSeriesGraphPanel } from 'zc-web/containers'
import { apiRequest } from 'zc-core/api/actions'
import { zcApiShapeJS } from 'zc-core/utils/propTypes'

import { selectIsAdmin } from 'selectors'
import { ContentSpinner, ContentError } from 'components'

import { selectDeviceName, selectErrorMessage, selectApiState } from './selectors'


class Device extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: null,
      end: null,
      modal: '',
    }
  }
  componentDidMount() {
    this.props.fetchDevice()
  }
  onChangeDates = ({ start, end }) => this.setState({ start, end })
  showDatesModal = () => this.setState({ modal: 'dates' })
  hideModal = () => this.setState({ modal: '' })
  render() {
    const { deviceId, isAdmin, title, api, errorMessage } = this.props
    const { start, end, modal } = this.state
    const actionItems = [
      { title: 'Select Dates', icon: 'EVENT', action: this.showDatesModal },
    ]
    if (isAdmin) actionItems.push(
      { title: 'Edit', icon: 'CREATE', route: `/devices/${deviceId}/edit` },
    )
    // TODO: Clarify modes that will be available in demo
    const modes = [
      {
        title: 'System Temperatures',
        keys: ['process_hot_coolant_temp', 'process_cold_coolant_temp', 'process_hot_box_temp'],
      },
      {
        title: 'Current',
        keys: ['current_in'],
      },
    ]

    if (api.error) return <ContentError>{errorMessage}</ContentError>
    if (title) return (
      <Content
        title={title}
        actionItems={actionItems}
      >
        <DateRangeModal
          visible={modal === 'dates'}
          start={start}
          end={end}
          onChangeDates={this.onChangeDates}
          closeModal={this.hideModal}
        />
        <TimeSeriesGraphPanel
          deviceId={deviceId}
          modes={modes}
          startTime={start}
          endTime={end}
        />
        <h3>Activity</h3>
        <br />
        <ActivityStream deviceId={deviceId} start={start} end={end} />
      </Content>
    )
    return <ContentSpinner />
  }
}

Device.propTypes = {
  fetchDevice: PropTypes.func.isRequired,
  deviceId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  api: zcApiShapeJS.isRequired,
}

const mapStateToProps = (state, props) => ({
  deviceId: props.match.params.deviceId,
  title: selectDeviceName(state, props),
  isAdmin: selectIsAdmin(state),
  errorMessage: selectErrorMessage(state),
  api: selectApiState(state).toJS(),
})

const mapDispatchToProps = (dispatch, props) => ({
  fetchDevice: () => dispatch(apiRequest('getDevice', { deviceId: props.match.params.deviceId })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Device)
