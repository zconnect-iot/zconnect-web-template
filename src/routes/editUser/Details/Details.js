import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'
import { Spinner } from 'zc-web/components'
import { Card } from 'zc-web/components'

import { UserForm } from 'components'


import styles from '../style.scss'


export default function Details(props) {
  const { api, errorMessage } = props
  return (
    <Card
      className={classnames(styles.Details, styles.padBody)}
      panel
      title="Details"
    >
      <UserForm />
      {api.error &&
        <h4 className="text-danger margin-top">{errorMessage}</h4>
      }
      {api.pending && <Spinner />}
      {api.success &&
        <h4 className="text-success margin-top">User details updated</h4>
      }
    </Card>
  )
}

Details.propTypes = {
  api: zcApiShapeJS.isRequired,
  editApi: zcApiShapeJS.isRequired,
  errorMessage: PropTypes.string.isRequired,
}
