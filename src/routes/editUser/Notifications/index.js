import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'

import {
  selectNotificationTypes,
  selectNotificationCategories,
  selectNotificationSeverities,
  selectOrganisationId,
} from 'routes/user/selectors'

import Notifications from './Notifications'


const mapStateToProps = (state, { userId, getRef, onChange }) => ({
  userId,
  getRef,
  onChange,
  categories: selectNotificationCategories(state, { userId }),
  severities: selectNotificationSeverities(state, { userId }),
  types: selectNotificationTypes(state, { userId }),
  organisationId: selectOrganisationId(state, { userId }),
})

export default connect(
  mapStateToProps,
)(toJS(Notifications))
