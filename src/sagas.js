import { apiSagas, authSagas } from 'zc-core'
import rootWatcher from './containers/Root/sagas'
import userWatcher from './containers/User/sagas'

export default [
  // Core
  apiSagas.watcher,
  authSagas.watcher,

  // App
  rootWatcher,
  userWatcher,
]
