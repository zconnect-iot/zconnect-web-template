import React from 'react'
import BEMHelper from 'react-bem-helper'

import { Icon } from 'zc-web/components'

const classes = BEMHelper('NotificationsList')

const notification = i => (
  <li {...classes('notification')}>
    <Icon name="WARNING" />
    <span {...classes('text')}>Faucet {i} has been at risk for</span>
    <span {...classes('text', null, 'text-danger')}>96hrs</span>
  </li>
)

const groups = ['This week', 'Last week'].map(name => (
  <div key={name} {...classes('group')}>
    <div {...classes('heading')}>{name}</div>
    <ul {...classes('list')}>
      {notification(0)}
      {notification(1)}
      {notification(2)}
      {notification(3)}
    </ul>
  </div>
))

export default function NotificationsList() {
  return <div {...classes()}>{groups}</div>
}
