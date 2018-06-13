import React from 'react'
import { mapProps } from 'recompose'
import { ColumnDefinition } from 'griddle-react'

import { Link } from 'zc-web/components'
import { List } from 'zc-web/components'

import { OnlineStatus } from 'components'

import style from './style.scss'


const DeviceID = mapProps(
  props => ({
    ...props,
    route: `/devices/${props.value}`,
    children: 'Graphs',
  }),
)(Link)

const ActiveStatus = mapProps(
  props => ({
    ...props,
    online: props.value,
  }),
)(OnlineStatus)

// TODO: Use custom column components where needed
const columns = [
  {
    key: 'active',
    id: 'active',
    title: 'Active',
    customComponent: ActiveStatus,
  },
  {
    key: 'deviceId',
    id: 'device.id',
    title: 'Device',
    customComponent: DeviceID,
  },
]


const columnDefinitions = columns.map(col => (
  <ColumnDefinition
    key={col.key}
    id={col.id}
    title={col.title}
    customComponent={col.customComponent}
  />
))


export default function DevicesList(props) {
  return (
    <div className={style.DevicesList}>
      <List
        data={props.devices}
        columns={columnDefinitions}
      />
    </div>
  )
}
