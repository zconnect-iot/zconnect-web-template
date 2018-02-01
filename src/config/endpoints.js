import { Map } from 'immutable'

export default {
  getUser: {
    url: 'api/v1/users/${userId}',
    method: 'GET',
    token: true,
    cache: 0,
  },
  getIssues: {
    url: 'api/v1/issues',
    method: 'GET',
    token: true,
    cache: 0,
    storeKey: 'issues',
    storeMethod: (last = Map(), next, params) => {
      if (params.product) return last.setIn(['product', params.product], next)
      if (params.device) return last.setIn(['device', params.device], next)
      return last.set('all', next)
    },
  },
}
