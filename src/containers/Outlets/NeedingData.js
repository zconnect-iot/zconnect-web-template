import React from 'react'
import PropTypes from 'prop-types'
import { ColumnDefinition } from 'griddle-react'

import { GriddleViewLink } from 'zc-web/widgets'
import List, { BasicLayout } from 'zc-web/views/List'

const fakeData = [20, 40, 60, 80, 100, 100, 100, 100].map((batt, i) => ({
  location: `Outlet ${i + 1}`,
  needsDataWithin: 'Data for January',
  estBattLevel: batt,
  link: '#',
}))

const BatteryLevel = ({ value }) => {
  const months = Math.floor(value / 20)

  return (
    <span style={{ color: months <= 1 ? '#e14b4b' : 'inherit' }}>
      {value}% (charge within {months} month{months !== 1 && 's'})
    </span>
  )
}
BatteryLevel.propTypes = {
  value: PropTypes.number.isRequired,
}

const columns = [
  'location',
  'needsDataWithin',
  (<ColumnDefinition
    id="estBattLevel"
    key="estBattLevel"
    title="Estimated battery level"
    customComponent={BatteryLevel}
  />),
  (<ColumnDefinition
    id="link"
    key="link"
    title="Link"
    customComponent={GriddleViewLink}
  />),
]

const components = {
  Layout: BasicLayout,
}

export default () => (
  <List
    data={fakeData}
    columns={columns}
    components={components}
  />
)
