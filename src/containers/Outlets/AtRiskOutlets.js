import React from 'react'
import PropTypes from 'prop-types'
import { ColumnDefinition } from 'griddle-react'
import { Map as ImmutableMap } from 'immutable'

import { Link, ProgressChart, ProgressBar } from 'zc-web/widgets'
import List, { BasicLayout } from 'zc-web/views/List'

const fakeData = [
  { location: 'Outlet 0', temps: { hot: 30, cold: 30 }, atRiskForHours: 96, link: '#' },
  { location: 'Outlet 1', temps: { hot: 22.5, cold: 22.5 }, atRiskForHours: 96, link: '#' },
  { location: 'Outlet 2', temps: { hot: 22.5, cold: 22.5 }, atRiskForHours: 48, link: '#' },
  { location: 'Outlet 3', temps: { hot: 15, cold: 7.5 }, atRiskForHours: 48, link: '#' },
  { location: 'Outlet 4', temps: { hot: 7.5, cold: 15 }, atRiskForHours: 48, link: '#' },
  { location: 'Outlet 5', temps: { hot: 7.5, cold: 15 }, atRiskForHours: 24, link: '#' },
  { location: 'Outlet 6', temps: { hot: 15, cold: 7.5 }, atRiskForHours: 12, link: '#' },
]

const chartMaxDays = 30
const barText = value => `${value} days (${(100 * value) / chartMaxDays}%)`
const ChartBar = props => (
  <ProgressBar
    maximum={chartMaxDays}
    text={barText(props.value)}
    {...props}
  />
)
ChartBar.propTypes = {
  value: PropTypes.number.isRequired,
}

const ChartCell = ({ value }) => (
  <ProgressChart>
    {/* Can use brand colours, e.g. 'info', 'danger'; and 'dark', etc. */}
    <ChartBar
      textColor="#f8f8f8"
      foregroundColor="primary"
      backgroundColor="darker"
      value={value.get('hot')}
    />
    <ChartBar foregroundColor="danger" value={value.get('cold')} />
  </ProgressChart>
)
ChartCell.propTypes = {
  value: PropTypes.instanceOf(ImmutableMap).isRequired,
}

const columns = [
  'location',
  (<ColumnDefinition
    id="temps"
    key="temps"
    title="Hot/cold"
    customComponent={ChartCell}
  />),
  'atRiskForHours',
  (<ColumnDefinition
    id="link"
    key="link"
    title="Link"
    customComponent={Link}
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
