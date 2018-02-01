import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'zc-web/components'

import styles from './style.scss'

function IntersperseChevrons(props) {
  const components = props.components
  const listItems = components.map(component =>
    (<li key={component.key}>
      {component}
      <Icon size={20} name="CHEVRON_RIGHT" />
    </li>),
  )
  return (
    <ul className={styles.intersperseChevronsList}>{listItems}</ul>
  )
}

IntersperseChevrons.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
}

export default IntersperseChevrons
