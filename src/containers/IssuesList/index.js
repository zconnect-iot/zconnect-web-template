import { connect } from 'react-redux'

import { apiRequest, pollApiRequest, apiReset } from 'zc-core/api/actions'
import { toJS } from 'zc-core/hocs'

import AppSettings from 'config/AppSettings'

import { selectIssues, selectApiState } from './selectors'

import IssuesList from './components/IssuesList'


const mapStateToProps = (state, props) => ({
  issues: selectIssues(state, props),
  api: selectApiState(state),
})

const mapDispatchToProps = (dispatch, props) => {
  const params = {}
  if (props.product) params.product = props.product
  else if (props.device) params.device = props.device
  if (props.count) params.count = props.count
  return ({
    fetchIssues: () => dispatch(apiRequest('getIssues', params)),
    pollIssues: () => dispatch(pollApiRequest('getIssues', params, undefined, AppSettings.pollingInterval)),
    stopPollIssues: () => dispatch(apiReset(null, null, 'issues')),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(IssuesList))
