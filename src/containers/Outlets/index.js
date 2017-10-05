import React from 'react'
import { Route, Switch } from 'react-router-dom'

import OutletsContent from './OutletsContent'

export default function Outlets() {
  return (
    <Switch>
      <Route path="/outlets" exact component={OutletsContent} />
    </Switch>
  )
}
