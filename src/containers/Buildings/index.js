import React from 'react'
import { Route, Switch } from 'react-router-dom'

import BuildingsContent from './Buildings'
import AddBuildingContent from './AddBuilding'


export default function Buildings() {
  return (
    <Switch>
      <Route path="/buildings" exact component={BuildingsContent} />
      <Route path="/buildings/add" exact component={AddBuildingContent} />
    </Switch>
  )
}
