import React from 'react'
import { ColumnDefinition } from 'griddle-react'

import { Link } from 'zc-web/widgets'
import List, { BasicLayout } from 'zc-web/views/List'

const fakeData = [
  [30, 30, 96],
  [22.5, 22.5, 96],
  [22.5, 22.5, 48],
  [15, 7.5, 48],
  [7.5, 15, 48],
  [7.5, 15, 24],
  [15, 7.5, 12],
].map(([hot, cold, hours], i) => ({
  location: `Outlet ${i + 1}`,
  hotCold: [hot, cold],
  atRiskFor: `${hours}hr`,
  link: '#',
}))

const HotColdBarChart = () => <span>Bar chart</span>

const columns = [
  'location',
  (<ColumnDefinition
    id="hotCold"
    key="hotCold"
    title="Hot/cold"
    customComponent={HotColdBarChart}
  />),
  'atRiskFor',
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
