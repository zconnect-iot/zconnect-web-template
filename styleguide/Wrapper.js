import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { Translator } from 'zc-core/locale/components'

import store from './store'

/*
  Wrapper serves the same function as Page in terms of providing context
  to nested components but doesn't actually render anything

  It also provides the mock store to connected components
*/
export default class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.subscribers = {}
    this.subId = 0
  }
  getChildContext() {
    return {
      page: {
        navigate: this.navigate,
        subscribe: this.addSubscriber,
        unsubscribe: this.removeSubscriber,
        location: '/',
      },
    }
  }
  navigate = route => console.log(`Navigate to ${route}`);
  addSubscriber = (s) => {
    this.subscribers[this.subId += 1] = s
    return this.subId
  }
  removeSubscriber = s => delete this.subscribers[s]
  render() {
    return (
      <Provider store={store}>
        <Translator>
          {this.props.children}
        </Translator>
      </Provider>
    )
  }
}

Wrapper.childContextTypes = {
  page: PropTypes.shape({
    navigate: PropTypes.func,
    subscribe: PropTypes.func,
    location: PropTypes.string,
  }),
}
