import React from 'react'
import BEMHelper from 'react-bem-helper'

import { Card } from 'zc-web/views'
import { Icon } from 'zc-web/components'

import './List.scss'

const classes = BEMHelper('Notifications')

const Notification = i => (
  <li {...classes('item')}>
    <Icon {...classes('icon')} name="WARNING" />
    <span {...classes('text')}>Faucet {i} has been at risk for</span>
    <span {...classes('text', null, 'text-danger')}>96hrs</span>
  </li>
)

const groups = ['This week', 'Last week'].map(name => (
  <Card {...classes('group')} title={name} key={name}>
    <ul {...classes('list')}>
      {Notification(0)}
      {Notification(1)}
      {Notification(2)}
      {Notification(3)}
    </ul>
  </Card>
))

export default function Notifications() {
  return <div {...classes()}>{groups}</div>
}
