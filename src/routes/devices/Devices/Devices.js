import React from 'react'
import PropTypes from 'prop-types'
import { ColumnDefinition, RowDefinition } from 'griddle-react'
import { mapProps, withProps } from 'recompose'
import { noop } from 'lodash'

import { Content, Link, ProgressChart } from 'zc-web/components'
import { AsyncListWithState } from 'zc-web/containers'


const LinkColumn = mapProps(({ value }) => ({
  children: value,
  route: `/devices/${value}`,
}))(Link)

const TimeOpenColumn = withProps({
  maximum: 900,
  units: ' seconds',
})(ProgressChart)

export default class Devices extends React.Component {
  getAsyncListRef = ref => (this.list = ref)
  refresh = () => (this.list ? this.list.props.fetchResults() : noop())
  render() {
    const { currentPage, pageSize } = this.props
    return (
      <Content
        title="Devices"
        actionItems={[
          { title: '', icon: 'REFRESH', action: this.refresh },
        ]}
      >
        <AsyncListWithState
          endpoint="getDevices"
          storeKey="devices"
          hideFilter
          currentPage={currentPage}
          pageSize={pageSize}
          getRef={this.getAsyncListRef}
        >
          <RowDefinition>
            <ColumnDefinition
              id="id"
              title="ID"
              customComponent={LinkColumn}
            />
            <ColumnDefinition
              id="name"
              title="Name"
            />
            <ColumnDefinition
              id="product.name"
              title="Product"
            />
            <ColumnDefinition
              id="sensors_current.device_open_count.value"
              title="Opened"
            />
            <ColumnDefinition
              id="sensors_current.panic.value"
              title="Emergency closed"
            />
            <ColumnDefinition
              id="sensors_current.device_open_time.value"
              title="Time Open"
              customComponent={TimeOpenColumn}
            />
          </RowDefinition>
        </AsyncListWithState>
      </Content>
    )
  }
}

Devices.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
}
