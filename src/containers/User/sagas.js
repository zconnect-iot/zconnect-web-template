import { put, select } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import { apiSagas } from 'zc-core'
import { LOGIN_SUCCESS, LOGOUT } from 'zc-core/auth/constants'

import { receiveUser, resetUser } from './actions'


// Hooks the LOGIN_SUCCESS action which is dispatched at the end of the loginSaga
function* loggedInSaga() {
  // Passing an action without a type over rides the default saga behaviour and
  // causes it to return the payload and throw any errors
  try {
    const payload = yield* apiSagas.apiRequest({
      meta: {
        endpoint: 'getUser',
      },
    })
    yield put(receiveUser(payload))
  }
  catch (e) {
    // Error state hangs off zc-core api state so this just swallows any errors
  }
}

function* loggedOutSaga() {
  yield put(resetUser())
}

export default function* userWatcher() {
  yield [
    takeLatest(LOGIN_SUCCESS, loggedInSaga),
    takeLatest(LOGOUT, loggedOutSaga),
  ]
}
