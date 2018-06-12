import { createSelector } from 'reselect'
import { capitalize } from 'lodash'

import { selectErrorJSON } from 'zc-core/api/selectors'

const storeKey = 'users'

const selectErrorResponse = state => selectErrorJSON(state, { storeKey })

// Return a list of error strings for each field in response
export const selectErrors = createSelector(
  selectErrorResponse,
  response => response
    .map((errors, field) => `${capitalize(field)}: ${errors.join ? errors.join(' ') : errors}`)
    .toArray(),
)

// Return a single string with all errors each field on new line
export const selectErrorMessage = createSelector(
  selectErrors,
  errors => (errors.length ? errors.join('\n') : 'Something went wrong'),
)
