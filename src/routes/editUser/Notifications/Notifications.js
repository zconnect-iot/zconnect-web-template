import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { NotificationSettings } from 'zc-web/containers'
import { Card } from 'zc-web/views'

import styles from './style.scss'


export default function Notifications(props) {
  const { categories, severities, types, organisationId, userId, getRef, onChange } = props
  return (
    <Card
      className={classnames(styles.Notifications, styles.padBody)}
      panel
      title="Notifications"
    >
      {organisationId ? <NotificationSettings
        onChange={onChange}
        userId={userId}
        getRef={getRef}
        organisationId={organisationId}
        categories={categories}
        severities={severities}
        types={types}
        hideSave
      /> : <span>
        The user needs to be assigned to an organisation before setting
        notification settings. You can do this in the Organisation panel on this page
      </span>}
    </Card>
  )
}

Notifications.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  severities: PropTypes.arrayOf(PropTypes.array).isRequired,
  types: PropTypes.arrayOf(PropTypes.array).isRequired,
  getRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  organisationId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}
