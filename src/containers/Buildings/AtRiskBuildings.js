import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import { TabContent } from 'zc-web/views'

import { Building } from '../../views'

const thumbnails = [
  '../../assets/images/building0.png',
  '../../assets/images/building1.png',
  '../../assets/images/building2.png',
]
const atRiskBuildings = [
  { outlets: 34, atRisk: 5, thumbnail: thumbnails[0] },
  { outlets: 24, atRisk: 16, thumbnail: thumbnails[1] },
  { outlets: 24, atRisk: 4, thumbnail: thumbnails[2] },
  { outlets: 34, atRisk: 5, thumbnail: thumbnails[0] },
]
atRiskBuildings.push(...atRiskBuildings)

export default function AtRiskBuildings() {
  return (
    <Row style={{ paddingBottom: 10 }}>
      {atRiskBuildings.map((building, key) => (
        <Col xs={3} key={key}>
          <Building
            name="Building name"
            thumbnail={building.thumbnail}
            outlets={building.outlets}
            atRisk={building.atRisk}
          />
        </Col>
      ))}
    </Row>
  )
}
