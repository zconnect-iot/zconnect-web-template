import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon } from 'zc-web/components'
import { default as Card, classes } from 'zc-web/views/Card'
import { StatCard } from 'zc-web/widgets'

import style from './style.scss'

const Building = props => (
  <div className={style.Building}>
    <Card>
      <div {...classes('block', 'padded')}>
        <div className={style.IconWrapper}>
          <div className={style.WarningIcon}><Icon name="WARNING" /></div>
        </div>
        <img src={props.thumbnail} alt={props.name} />
      </div>

      <div {...classes('block', 'padded')}>
        <span className={style.BuildingName}>{props.name}</span>
      </div>

      <div {...classes('block', ['dark', 'border-top'])}>
        <StatCard inline invert figure={props.outlets} description="Outlets" />
        <StatCard inline invert figure={props.atRisk} description="At risk" dangerFigure={props.atRisk > 0} />
      </div>
    </Card>
  </div>
)

Building.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
}

export default Building
