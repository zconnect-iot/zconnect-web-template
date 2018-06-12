import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.scss'


const FormSection = ({ children, title }) => (<div className={styles.FormSection}>
  <h5>{title}</h5>
  {children}
</div>)

FormSection.propTypes = {

}

FormSection.defaultProps = {

}
export default FormSection
