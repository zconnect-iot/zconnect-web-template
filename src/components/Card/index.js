import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.scss'

export default function Card(props) {
  return (
    <div className={styles.Card}>
      { props.children }
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Card.defaultProps = {
  children: null,
}