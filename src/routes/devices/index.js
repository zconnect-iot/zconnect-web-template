import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Device from 'routes/device'
import EditDevice from 'routes/editDevice'

import Devices from './Devices'

export default function Routes() {
  return (
    <Switch>
      <Route path="/devices" exact component={Devices} />
      <Route path="/devices/:deviceId/settings" exact component={Device} />
      <Route path="/devices/:deviceId/edit" exact component={EditDevice} />
      <Route path="/devices/:deviceId" component={Device} />
    </Switch>
  )
}
