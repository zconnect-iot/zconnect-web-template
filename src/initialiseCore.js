import { configureZC } from 'zc-core'
import { selectUserId } from 'zc-core/auth/selectors'
import Raven from 'raven-js'


import AppSettings from './config/AppSettings'
import endpoints from './config/endpoints'
import jwtStore from './jwtStore'


configureZC({
  Sentry: Raven,
  jwtStore,
  endpoints,
  baseURL: AppSettings.baseURL,
  defaultTimeout: AppSettings.defaultTimeout,
  defaultParams: {
    userId: selectUserId,
  },
})
