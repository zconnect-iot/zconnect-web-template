import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { instanceOfXDate } from 'zc-core/utils/propTypes'
import { Icon } from 'zc-web/components'

import { timeSince } from 'utils'

import './style.scss'

export default function IssueRow({ resolved, message, created_at, navigate }) {
  // TODO: Work out why created_at is not XDate here as it is in issuecounts
  // response
  return (
    <div className={classnames('IssuesList__IssueRow', { resolved })} onClick={navigate} role="button" tabIndex={0}>
      <div className="IssueRow__middle">
        <h4>
          {resolved && <span>Resolved: </span>}
          {message}
        </h4>
        <p>{timeSince(created_at)}</p>
      </div>
      <div className="IssueRow__cta">View issue<Icon name="CHEVRON_RIGHT" size={22} /></div>
    </div>
  )
}

IssueRow.propTypes = {
  message: PropTypes.string.isRequired,
  created_at: instanceOfXDate.isRequired,
  resolved: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
}
