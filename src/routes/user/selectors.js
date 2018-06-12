import { createSelector } from 'reselect'

import { selectAPIState } from 'zc-core/api/selectors'
import { emptyMap } from 'zc-core/utils'


const selectUserIdFromProps = (_, { userId }) => userId

export const selectApiState = state => selectAPIState(state, { storeKey: 'users' })

const selectUserApiDomain = state => state.getIn(['api', 'users'], emptyMap)

const selectError = createSelector(
  selectUserApiDomain,
  user => user.get('error', emptyMap),
)

const selectErrors = createSelector(
  selectError,
  error => error
    .getIn(['response', 'json'], emptyMap)
    .valueSeq()
    .map(value => (value.join ? value.join(' ') : value))
    .join('\n'),
)

export const selectErrorMessage = createSelector(
  selectErrors,
  errors => errors || 'An unknown API error occurred, please retry and contact support if problem persists',
)

const selectUsers = createSelector(
  selectUserApiDomain,
  user => user.get('response', emptyMap),
)

export const selectUser = createSelector(
  selectUserIdFromProps,
  selectUsers,
  (id, users) => users.get(id, emptyMap),
)

export const selectUserFname = createSelector(
  selectUser,
  user => user.get('first_name', ''),
)

export const selectUserLname = createSelector(
  selectUser,
  user => user.get('last_name', ''),
)

export const selectUserName = createSelector(
  selectUserFname,
  selectUserLname,
  (first_name, last_name) => `${first_name} ${last_name}`,
)

export const selectUserEmail = createSelector(
  selectUser,
  user => user.get('email', ''),
)

export const selectUserPhoneNumber = createSelector(
  selectUser,
  user => user.get('phone_number', ''),
)

// TODO: Get from server
export const selectOrganisationId = () => 1

// Notification config
// TODO: Remove defaults when data returned on User
export const selectNotificationCategories = createSelector(
  selectUser,
  user => user.get('notificationCategories', ['business metrics', 'maintenance', 'system']),
)

export const selectNotificationTypes = createSelector(
  selectUser,
  user => user.get('notificationCategories', [['SMS', 'sms'], ['E-mail', 'email']]),
)

export const selectNotificationSeverities = createSelector(
  selectUser,
  user => user.get('notificationCategories', [['Important', 30], ['Some', 20], ['All', 0]]),
)
