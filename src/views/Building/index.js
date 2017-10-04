import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon } from 'zc-web/components'
import { default as Card, classes } from 'zc-web/views/Card'
import { StatCard } from 'zc-web/widgets'

import style from './style.scss'

const ExampleContents = props => (
  <div
    className={props.dark ? style.darkBackground : ''}
    style={{
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    <StatCard inline invert figure={props.outlets} description="Outlets" />
    <StatCard inline invert figure={props.atRisk} description="At risk" dangerFigure={props.atRisk > 0} />
  </div>
)

/** Minimal Card usage example. */
export const MinimalBuilding = props => (
  <div className={style.Building}>
    <Card>
      <ExampleContents {...props} />
    </Card>
  </div>
)

/** Simple Card example with an image and a title. */
export const NormalBuilding = props => (
  <div className={style.Building}>
    <Card
      image={{ src: props.thumbnail, alt: props.name }}
      subtitle="Building name"
    >
      <ExampleContents {...props} dark />
    </Card>
  </div>
)

/** Full Card example. */
export const FullBuilding = props => (
  <div className={style.Building}>
    <Card
      title="Building title"
      icon="WARNING"
      subtitle="Building name"
      image={{ src: props.thumbnail, alt: props.name }}
    >
      <ExampleContents {...props} dark />
    </Card>
  </div>
)

MinimalBuilding.propTypes = NormalBuilding.propTypes = FullBuilding.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
}
