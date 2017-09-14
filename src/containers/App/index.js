import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Page from 'zc-web/components/Page'
import buildingSVG from 'zc-web/icons/White/Building.svg'
import faucetSVG from 'zc-web/icons/White/faucet.svg'
import personSVG from 'zc-web/icons/White/person.svg'

import Buildings from '../Buildings'

export default function App() {
  return (
    <Page
      navItems={[
        { title: 'Buildings', icon: buildingSVG, route: '/buildings' },
        { title: 'Outlets', icon: faucetSVG, route: '/outlets' },
        { title: 'Account', icon: personSVG, route: '/account' },
      ]}
    >
      <Switch>
        <Route path="/buildings" component={Buildings} />
      </Switch>
    </Page>
  )
}
