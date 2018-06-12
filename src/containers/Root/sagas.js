import { call, put, takeLatest } from 'redux-saga/effects'
import Sentry from 'raven-js'

import { decodeJWT } from 'zc-core/auth/utils'
import { loginSuccess } from 'zc-core/auth/actions'

import jwtStore from '../../jwtStore'

import { OPTIMISTIC_LOGIN } from './constants'

function* optimisticLoginSaga() {
  try {
    const token = yield call(jwtStore.get)
    if (!token) throw new Error('No jwt token stored')
    const jwtData = decodeJWT(token.password)
    const { user_id, email } = jwtData
    yield put(loginSuccess(user_id, email, jwtData))
  }
  catch (e) {
    Sentry.captureMessage(e)
  }
}

export default function* authWatcher() {
  yield takeLatest(OPTIMISTIC_LOGIN, optimisticLoginSaga)
}
