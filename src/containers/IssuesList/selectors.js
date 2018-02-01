import { createSelector } from 'reselect'
import { List } from 'immutable'

import { selectResponse, selectAPIState } from 'zc-core/api/selectors'

// Return this instead of new List() each time to prevent unnecessary updates
const emptyList = List()

const issuesRequestProps = { storeKey: 'issues' }

const selectGetIssuesResponse = state => selectResponse(state, issuesRequestProps)

const selectPathFromProps = (_, props) => {
  if (props.product) return ['product', props.product, 'issues']
  if (props.device) return ['device', props.device, 'issues']
  return ['all', 'issues']
}

export const selectIssues = createSelector(
  selectGetIssuesResponse,
  selectPathFromProps,
  (response, path) => (response ? response.getIn(path, emptyList) : emptyList),
)

export const selectApiState = state => selectAPIState(state, issuesRequestProps)
