import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

import Breadcrumbs from './Breadcrumbs'
import styles from './style.scss'


function NavBar() {
  return (
    <Row className={styles.NavBar}>
      <Col lgOffset={1} lg={10}>
        <Breadcrumbs />
      </Col>
    </Row>
  )
}

export default NavBar
