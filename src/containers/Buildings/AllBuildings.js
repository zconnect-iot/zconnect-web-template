import React from 'react'

import { List } from 'zc-web/views'

const randInt = (gte, lt) => Math.floor((Math.random() * (lt - gte)) + gte)
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

const columns = ['id', 'name', 'outlets', 'atRisk']

export default function AllBuildings() {
  return <List data={data} columns={columns} />
}
