import { configureZC } from 'zc-core'
import Sentry from 'raven-js'

import AppSettings from './config/AppSettings'
import endpoints from './config/endpoints'
import jwtStore from './jwtStore'


configureZC({
  Sentry,
  jwtStore,
  endpoints,
  baseURL: AppSettings.baseURL,
  loginTimeout: AppSettings.loginTimeout,
})
