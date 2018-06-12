import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import "babel-polyfill"

import { Translator } from 'zc-core/locale/components'
import Root from './containers/Root'

import './initialiseCore'
import './style/app.scss'
import store, { history } from './store'


ReactDOM.render(
  <Provider store={store}>
    <Translator>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Translator>
  </Provider>,
  document.getElementById('root'),
)
