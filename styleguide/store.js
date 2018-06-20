import configureStore from 'redux-mock-store'
import { fromJS, Map } from 'immutable'

import tsData from './tsdata.json'

// Store with minimal data for rendering connected components in stylguide
const mockState = fromJS({
  auth: {
    userId: 'USER_ID',
  },
  api: {
    tsData: {
      state: {
        success: true,
      },
      response: {
        DEVICE_ID: Map([ // Required so that resolution key is not cast to string
          [3600, fromJS(tsData)],
        ]),
      },
    },
  },
  form: {
    subscriptions: {

    },
  },
  locale: {
    code: 'en',
  },
})

export default configureStore()(mockState)
