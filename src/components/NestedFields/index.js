import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.scss'


const NestedFields = ({ children, label }) => (
  <div className={styles.NestedFields}>
    <label className={styles.FieldLabel}>{label}</label>
    <div className={styles.ChildFields}>
      {children}
    </div>
  </div>
)

NestedFields.propTypes = {

}

NestedFields.defaultProps = {

}
export default NestedFields
