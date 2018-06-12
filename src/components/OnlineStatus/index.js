import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.scss'

export default function OnlineStatus({ online, className, showLabel }) {
  return (
    <div className={classnames(styles.OnlineStatus, { online }, className)}>
      {showLabel && online && 'online'}
      {showLabel && !online && 'offline'}
    </div>
  )
}

OnlineStatus.propTypes = {
  online: PropTypes.bool.isRequired,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
}

OnlineStatus.defaultProps = {
  className: '',
  showLabel: false,
}
