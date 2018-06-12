import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { selectAPIState } from 'zc-core/api/selectors'

import Details from './Details'

import {
  selectUserErrorMessage,
} from '../selectors'


const mapStateToProps = state => ({
  api: selectAPIState(state, { storeKey: 'users' }),
  errorMessage: selectUserErrorMessage(state),
})

export default connect(
  mapStateToProps,
)(toJS(Details))
