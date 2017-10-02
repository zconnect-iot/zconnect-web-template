import React from 'react'
import { RowDefinition, ColumnDefinition } from 'griddle-react'

import { TabContent } from 'zc-web/views'
import { List } from 'zc-web/views'

const randInt = (gte, lt) => (Math.random() * (lt - gte) + gte) | 0
const randElem = (arr) => arr[randInt(0, arr.length)]
const data = [
  'Big Building',
  'Medium Building',
  'Small Building',
  'Big Place',
  'Medium Place',
  'Small Place',
  'Big House',
  'Medium House',
  'Small House',
].map((name, id) => {
  const outlets = randInt(10, 100)
  return {
    id,
    name,
    outlets,
    atRisk: randInt(1, outlets),
  }
})

export default function AllBuildings() {
  return (
    <List data={data}>
      <RowDefinition>
        <ColumnDefinition id="id" title="ID" />
        <ColumnDefinition id="name" title="Name" />
        <ColumnDefinition id="outlets" title="Outlets" />
        <ColumnDefinition id="atRisk" title="At risk" />
      </RowDefinition>
    </List>
  )
}
