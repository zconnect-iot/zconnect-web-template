import { fromJS, Map } from 'immutable'

import data from '../devServer/db.json'
import tsData from './tsdata.json'

// Store with minimal data for rendering connected components in stylguide
const state = fromJS({
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
    subscriptions: {
      state: {
        success: true,
        pending: false,
        error: false,
      },
      response: {
        USER_ID: [],
      },
    },
    subscriptionsBatch: {
      state: {
        pending: false,
        success: false,
        error: false,
      },
    },
    activities: {
      state: {
        success: true,
      },
      response: {
        params: {
          deviceId: 'DEVICE_ID',
          start: null,
          end: null,
          page: 1,
        },
        results: data.activities,
      },
    },
    people: {
      state: {
        success: true,
        pending: false,
        error: false,
      },
      response: {
        1: {
          id: '1',
          name: 'Bob',
          colour: 'Blue',
        },
        2: {
          id: '2',
          name: 'Alice',
          colour: 'Azule',
        },
        3: {
          id: '3',
          name: 'Derek',
          colour: 'Dahlia',
        },
        4: {
          id: '4',
          name: 'Mia',
          colour: 'Magnolia',
        },
        lastResponse: {
          count: 4,
          next: null,
          previous: null,
          results: [
            {
              id: '1',
              name: 'Bob',
              colour: 'Blue',
            },
            {
              id: '2',
              name: 'Alice',
              colour: 'Azule',
            },
            {
              id: '3',
              name: 'Derek',
              colour: 'Dahlia',
            },
            {
              id: '4',
              name: 'Mia',
              colour: 'Magnolia',
            },
          ],
        },
      },
    },
  },
  locale: {
    code: 'en',
  },
})

export default state.setIn(['api', fromJS({ endpoint: 'login', params: {} })], fromJS({
  state: {
    pending: false,
    error: false,
    success: false,
  },
}))
