import React from 'react'

import Card from 'components/Card'

const FilterLayout = ({ Table, Pagination, Filter, title, className }) => (
  <div className={className}>
    <div className="griddle__filterBar">
      {title && <h2>{title}</h2>}
      <Filter />
    </div>
    <Card>
      <Table />
    </Card>
    <Pagination />
  </div>
)

export default FilterLayout
