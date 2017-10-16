import React from 'react'

import { Card } from 'zc-web/views'
import { Icon } from 'zc-web/components'

import style from './List.scss'

const Notification = i => (
  <li className={style.Notifications__item}>
    <Icon className={style.Notifications__icon} name="WARNING" />
    <span className={style.Notifications__text}>Faucet {i} has been at risk for</span>
    <span className={style.Notifications__text}>96hrs</span>
  </li>
)

const groups = ['This week', 'Last week'].map(name => (
  <Card title={name} key={name}>
    <ul className={style.Notifications__list}>
      {Notification(0)}
      {Notification(1)}
      {Notification(2)}
      {Notification(3)}
    </ul>
  </Card>
))

export default function Notifications() {
  return <div className={style.Notifications}>{groups}</div>
}
