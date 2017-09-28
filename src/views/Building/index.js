import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

export const classes = new BEMHelper('Building')

const Building = props => (
  <div {...classes()}>
    <div {...classes('main')}>
      <div {...classes('thumbnail')}>
        <img src={props.thumbnail} alt={props.name} />
      </div>
    </div>

    <div {...classes('footer')}>
      <div {...classes('notice')}>
        <div {...classes('figure')}>{props.outlets}</div>
        <span {...classes('description')}>Outlets</span>
      </div>

      <div {...classes('notice')}>
        <div {...classes('figure', 'danger')}>{props.atRisk}</div>
        <span {...classes('description', 'danger')}>At risk</span>
      </div>
    </div>
  </div>
)

Building.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
}

export default Building
