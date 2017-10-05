import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

import { TabLink, TabLinkList, TabContent, Tabs } from 'zc-web/views'
import { Content } from 'zc-web/components'

import AtRiskOutlets from './AtRiskOutlets'
import NeedingData from './NeedingData'

const atRisk = 'atRisk'
const needsData = 'needsData'

export default function OutletsContent() {
  return (
    <Content title="Outlets" actionItems={[]}>
      <Row>
        <Col xs>
          <Tabs>
            <TabLinkList>
              <TabLink to={atRisk}><span>At risk</span></TabLink>
              <TabLink to={needsData}><span>Needs data collection</span></TabLink>
            </TabLinkList>

            <TabContent for={atRisk}>
              <AtRiskOutlets />
            </TabContent>

            <TabContent for={needsData}>
              <NeedingData />
            </TabContent>
          </Tabs>
        </Col>
      </Row>
    </Content>
  )
}
