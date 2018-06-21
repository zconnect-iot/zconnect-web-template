import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import { createLogger } from 'redux-logger'

import mockState from './mockState'

const logger = createLogger({
  stateTransformer: state => state.toJS()
})

export default createStore(
  combineReducers({
    form,
    auth: state => state,
    locale: state => state,
    api: state => state,
  }),
  mockState,
  applyMiddleware(logger)
)
