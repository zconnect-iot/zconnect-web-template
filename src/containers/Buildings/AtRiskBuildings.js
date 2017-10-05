import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

import { MinimalBuilding, FullBuilding, NormalBuilding } from '../../views'

const thumbnails = [
  '../../assets/images/building0.png',
  '../../assets/images/building1.png',
  '../../assets/images/building2.png',
]
const atRiskBuildings = [
  { id: 0, outlets: 34, atRisk: 5, thumbnail: thumbnails[0] },
  { id: 1, outlets: 24, atRisk: 16, thumbnail: thumbnails[1] },
  { id: 2, outlets: 24, atRisk: 4, thumbnail: thumbnails[2] },
  { id: 3, outlets: 34, atRisk: 5, thumbnail: thumbnails[0] },
  { id: 4, outlets: 34, atRisk: 5, thumbnail: thumbnails[0] },
  { id: 5, outlets: 24, atRisk: 16, thumbnail: thumbnails[1] },
  { id: 6, outlets: 24, atRisk: 4, thumbnail: thumbnails[2] },
  { id: 7, outlets: 34, atRisk: 5, thumbnail: thumbnails[0] },
]

export default function AtRiskBuildings() {
  return (
    <div>
      <Row>
        {atRiskBuildings.map(building => (
          <Col xs={3} key={building.id}>
            <MinimalBuilding
              name="Building name"
              thumbnail={building.thumbnail}
              outlets={building.outlets}
              atRisk={building.atRisk}
            />
          </Col>
        ))}
      </Row>

      <Row>
        {atRiskBuildings.map(building => (
          <Col xs={3} key={building.id}>
            <NormalBuilding
              name="Building name"
              thumbnail={building.thumbnail}
              outlets={building.outlets}
              atRisk={building.atRisk}
            />
          </Col>
        ))}
      </Row>

      <Row>
        {atRiskBuildings.map(building => (
          <Col xs={3} key={building.id}>
            <FullBuilding
              name="Building name"
              thumbnail={building.thumbnail}
              outlets={building.outlets}
              atRisk={building.atRisk}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
