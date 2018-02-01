import React from 'react'

import Card from 'components/Card'

import ViewAll from './ViewAll'


const RecentLayout = ({ Table, className, title, viewAll }) => (
  <div className={className}>
    <h2 className="griddle__title">{title}</h2>
    <Card>
      <Table />
      <ViewAll route={viewAll} />
    </Card>
  </div>
)

export default RecentLayout
