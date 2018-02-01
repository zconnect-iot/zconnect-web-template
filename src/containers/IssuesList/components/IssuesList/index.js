import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { plugins } from 'griddle-react'
import { withRouter } from 'react-router-dom'
import XDate from 'xdate'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'
import { Spinner } from 'zc-web/components'

import OLGriddle from 'components/OLGriddle'

import IssueRow from './IssueRow'

import './style.scss'

const Row = withRouter(connect(
  (state, props) => {
    const rowData = plugins.LocalPlugin.selectors.rowDataSelector(state, props)
    return {
      message: rowData.trigger_event.message,
      created_at: XDate(rowData.created_at[0]),
      resolved: !!rowData.resolved_at,
      navigate: () => props.history.push(`/issues/${rowData._id}`),
    }
  },
)(IssueRow))

export default class IssuesList extends React.Component {
  componentDidMount() {
    this.props.pollIssues()
  }
  componentWillUnmount() {
    this.props.stopPollIssues()
  }
  render() {
    const { throwOnApiError, api, issues, count, title, viewAllRoute } = this.props
    if (throwOnApiError && api.error) throw new Error('Issues failed to fetch')
    if (!issues) return <Spinner />
    if (!issues.length) return (<p>No issues to show</p>)
    return (<OLGriddle
      data={issues}
      className="IssuesList"
      title={title}
      viewAllRoute={viewAllRoute}
      count={count}
      components={{
        Row,
      }}
    />)
  }
}

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    message: PropTypes.string,
    created_at: PropTypes.object.isRequired,
  })).isRequired,
  api: zcApiShapeJS.isRequired,
  throwOnApiError: PropTypes.bool,
  pollIssues: PropTypes.func.isRequired,
  stopPollIssues: PropTypes.func.isRequired,
  count: PropTypes.number,
  title: PropTypes.string,
  viewAllRoute: PropTypes.string,
}

IssuesList.defaultProps = {
  throwOnApiError: false,
  count: 0,
  title: '',
  viewAllRoute: '/issues',
}
