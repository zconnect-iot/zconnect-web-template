import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Page from 'zc-web/components/Page'

import Buildings from '../Buildings'
import Account from '../Account'

export default function App() {
  return (
    <Page
      navItems={[
        { title: 'Buildings', icon: 'BUILDING', route: '/buildings' },
        { title: 'Outlets', icon: 'FAUCET', route: '/outlets' },
        { title: 'Account', icon: 'PERSON', route: '/account' },
      ]}
    >
      <Switch>
        <Route path="/buildings" component={Buildings} />
        <Route path='/account' component={Account} />
      </Switch>
    </Page>
  )
}
