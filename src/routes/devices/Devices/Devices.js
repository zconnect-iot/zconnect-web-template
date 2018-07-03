import React from 'react'
import PropTypes from 'prop-types'
import { ColumnDefinition, RowDefinition } from 'griddle-react'
import { mapProps } from 'recompose'
import { noop } from 'lodash'

import { Content, Link, ProgressChart } from 'zc-web/components'
import { AsyncListWithState } from 'zc-web/containers'

const getColourForTemp = (temp) => {
  if (temp < 6) return 'primary'
  if (temp < 20) return 'success'
  return 'danger'
}

const LinkColumn = mapProps(({ value }) => ({
  children: value,
  route: `/devices/${value}`,
}))(Link)

const TemperatureColumn = mapProps(({ value, ...props }) => ({
  ...props,
  maximum: 100,
  units: '°C',
  foregroundColor: getColourForTemp(props.value),
  value: value.toFixed ? value.toFixed(2) : value,
}))(ProgressChart)

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
              id="sensors_current.process_hot_coolant_temp.value"
              title="Hot Coolant"
              customComponent={TemperatureColumn}
            />
            <ColumnDefinition
              id="sensors_current.process_cold_coolant_temp.value"
              title="Cold coolant"
              customComponent={TemperatureColumn}
            />
            <ColumnDefinition
              id="sensors_current.process_hot_box_temp.value"
              title="Box"
              customComponent={TemperatureColumn}
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
