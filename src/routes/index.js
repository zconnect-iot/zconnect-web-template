import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Dashboard from './dashboard'
import Issues from './issues'
import Issue from './issue'


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/issues" exact component={Issues} />
      <Route path="/issues/:issueId" component={Issue} />
      <Redirect to="/" /> {/* TODO: Add fallback 'Page not found' component */}
    </Switch>
  )
}
