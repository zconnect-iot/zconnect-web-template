import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'

import { StatCard } from 'zc-web/widgets'

import styles from './style.scss'


export default function StatCards({ panicTriggers, softCloseTriggers, opened }) {
  return (
    <Row className={styles.StatCards}>
      <Col xs={4} sm>
        <StatCard figure={panicTriggers.toFixed(0)} description="Panic Triggers" />
      </Col>
      <Col xs={4} sm>
        <StatCard figure={softCloseTriggers.toFixed(0)} description="Soft Close Triggers" />
      </Col>
      <Col xs={4} sm>
        <StatCard figure={opened.toFixed(0)} description="Open/Close Cycles" />
      </Col>
    </Row>
  )
}

StatCards.propTypes = {
  panicTriggers: PropTypes.number.isRequired,
  softCloseTriggers: PropTypes.number.isRequired,
  opened: PropTypes.number.isRequired,
}
