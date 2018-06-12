import { Map, List } from 'immutable'

import subscriptionEndpoints from 'zc-web/containers/NotificationSettings/endpoints'
import activitiesEndpoints from 'zc-web/containers/ActivityStream/endpoints'
import timeSeriesEndpoints from 'zc-web/containers/TimeSeriesGraph/endpoints'

import { storeMethod } from 'zc-web/containers/AsyncList/utils'

export default {
  ...subscriptionEndpoints,
  ...activitiesEndpoints,
  ...timeSeriesEndpoints,
  getDevices: {
    url: 'api/v3/devices/',
    method: 'GET',
    token: true,
    storeKey: 'devices',
    storeMethod,
  },
  getDevice: {
    url: 'api/v3/devices/${deviceId}/',
    method: 'GET',
    token: true,
    storeKey: 'devices',
    storeMethod: (last = Map(), next, params) => last.set(params.deviceId, next),
  },
  editDevice: {
    url: 'api/v3/devices/${deviceId}/',
    method: 'PATCH',
    token: true,
    storeKey: 'devices',
    storeMethod: (last = Map(), next, params) => last
      .set(params.deviceId, next)
      .set('lastSetId', next.get('id')),
  },
  getUsers: {
    url: 'api/v3/users/',
    method: 'GET',
    token: true,
    storeKey: 'users',
    storeMethod,
  },
  getUser: {
    url: 'api/v3/users/${userId}/',
    method: 'GET',
    token: true,
    storeKey: 'users',
    storeMethod: (last = Map(), next, params) => last.set(params.userId, next),
  },
  postUser: {
    url: 'api/v3/users/',
    method: 'POST',
    token: true,
    storeKey: 'users',
    storeMethod: (last = Map(), next) => last
      .set(next.get('id'), next)
      .set('lastSetId', next.get('id')),
  },
  editUser: {
    url: 'api/v3/users/${userId}/',
    method: 'PATCH',
    token: true,
    storeKey: 'users',
    storeMethod: (last = Map(), next, params) => last.set(params.userId, next),
  },
  postOrganisationMember: {
    url: 'api/v3/organizations/${orgId}/membership/',
    method: 'POST',
    token: true,
    storeKey: 'organisations',
  },
  deleteOrganisationMember: {
    url: 'api/v3/organizations/${orgId}/user/${userId}',
    method: 'DELETE',
    token: true,
    storeKey: 'organisations',
  },
  getCodes: {
    url: 'api/v3/users/${userId}/device_codes/',
    method: 'GET',
    token: true,
    storeKey: 'codes',
    storeMethod: (last = Map(), next, params) => last.set(params.userId, next.get('results')),
  },
  resetCodes: {
    url: 'api/v3/users/${userId}/device_codes/?replace=true',
    method: 'POST',
    token: true,
    storeKey: 'codes',
    storeMethod: (last = Map(), next, params) => last.set(
      params.userId,
      List([next]),
    ),
  },
}
