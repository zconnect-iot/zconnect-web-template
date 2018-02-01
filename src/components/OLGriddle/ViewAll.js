import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'zc-web/widgets'


export default function ViewAll({ route }) {
  return (
    <Link className="griddle__viewAll" route={route}>View all</Link>
  )
}

ViewAll.propTypes = {
  route: PropTypes.string.isRequired,
}
