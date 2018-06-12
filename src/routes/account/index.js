import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest, apiReset } from 'zc-core/api/actions'
import { selectUserId } from 'zc-core/auth/selectors'

import { selectApiState, selectOrganisationId } from 'selectors'

import {
  selectNotificationTypes,
  selectNotificationCategories,
  selectNotificationSeverities,
} from 'routes/user/selectors'

import Account from './Account'


const mapStateToProps = (state) => {
  const userId = selectUserId(state)
  return {
    api: selectApiState('user')(state),
    categories: selectNotificationCategories(state, { userId }),
    severities: selectNotificationSeverities(state, { userId }),
    types: selectNotificationTypes(state, { userId }),
    organisationId: selectOrganisationId(state),
    userId,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(apiRequest(
    'getUser',
    { userId: selectUserId },
  )),
  resetApi: () => dispatch(apiReset(null, null, 'user')),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Account))
