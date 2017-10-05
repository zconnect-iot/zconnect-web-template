import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Card } from 'zc-web/views'
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
ExampleContents.propTypes = {
  dark: PropTypes.bool,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
}
ExampleContents.defaultProps = {
  dark: false,
}

/** Minimal Card usage example. */
export const MinimalBuilding = props => (
  <Card className={classNames(props.className, style.Building)}>
    <ExampleContents {...props} />
  </Card>
)
MinimalBuilding.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
  className: PropTypes.string,
}
MinimalBuilding.defaultProps = {
  className: '',
}

/** Simple Card example with an image and a title. */
export const NormalBuilding = props => (
  <Card
    className={classNames(props.className, style.Building)}
    image={{ src: props.thumbnail, alt: props.name }}
    subtitle="Building name"
  >
    <ExampleContents {...props} dark />
  </Card>
)
NormalBuilding.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
  className: PropTypes.string,
}
NormalBuilding.defaultProps = {
  className: '',
}

/** Full Card example. */
export const FullBuilding = props => (
  <Card
    title="Building title"
    icon="WARNING"
    subtitle="Building name"
    image={{ src: props.thumbnail, alt: props.name }}
    className={classNames(props.className, style.Building)}
  >
    <ExampleContents {...props} dark />
  </Card>
)
FullBuilding.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  outlets: PropTypes.number.isRequired,
  atRisk: PropTypes.number.isRequired,
  className: PropTypes.string,
}
FullBuilding.defaultProps = {
  className: '',
}
