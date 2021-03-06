/*
  Global/reusable selectors go here. To be global they should depend entirely on
  state i.e. no props
*/

import { createSelector } from 'reselect'

import { mergeApiStates, emptyMap } from 'zc-core/utils'
import { selectAPIState } from 'zc-core/api/selectors'
import { selectJWT } from 'zc-core/auth/selectors'

import Config from '../config/AppSettings'

/* Roles */

export const selectIsAdmin = createSelector(
  selectJWT,
  jwt => jwt.get('is_superuser'),
)

// Determine the users role or orgLevel oneOf admin, distributor, company, site, user
export const selectRole = createSelector(
  selectIsAdmin,
  isAdmin => (isAdmin ? 'admin' : 'user'),
)

// Take first and only org in list. Used by /account and passed to NotificationSettings
export const selectOrganisationId = createSelector(
  selectJWT,
  jwt => jwt.get('orgs').get(0, emptyMap).get('id', ''),
)

// Concats the list of routes for the role with the defaults as described in Config
export const selectRoutesForRole = createSelector(
  selectRole,
  role => Config.roles[role].routes.concat(Config.roles.default.routes),
)

export const selectNavItemsForRole = createSelector(
  selectRoutesForRole,
  routes => routes
    .map(route => ({
      ...Config.routes[route], route: `/${route}`,
    })),
)


/* Generics */

export const selectApiState = key => state => selectAPIState(state, { storeKey: key })

export const selectApiResponse = key => state => selectAPIState(state, { storeKey: key })

export const selectLastSetId = key => state => state.getIn(['api', key, 'response', 'lastSetId'], '')

export const selectApiStates = keys => state => mergeApiStates(
  keys.map(key => selectAPIState(state, { storeKey: key })),
)
