import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'

import { TabLink, TabLinkList, TabContent, Tabs } from 'zc-web/views'
import { Content, Icon } from 'zc-web/components'
import { Tooltip, StatCard } from 'zc-web/widgets'

import AtRiskBuildings from './AtRiskBuildings'
import AllBuildings from './AllBuildings'

export default function BuildingsContent(props, context) {
  return (
    <Content
      title="Buildings"
      actionItems={[
        { title: 'Add building', icon: 'ADD', route: '/buildings/add' },
        { title: 'Print report', icon: 'PRINT', action: () => {} },
      ]}
    >
      <div style={{ marginBottom: '20px' }}>
        This is a tooltip -&gt;
        <Tooltip>
          This is the tooltip message, with an Icon..
          <Icon name="SHOPPING_CART" />
        </Tooltip>
      </div>
      <Row>
        <Col xs={6} sm style={{ marginBottom: '16px' }}>
          <StatCard figure={162} description="Alarms this month" delta={10} reverseColor />
        </Col>

        <Col xs={6} sm style={{ marginBottom: '16px' }}>
          <StatCard figure={401} description="Avg. last 6 months" delta={5} deltaUnits="%" reverseColor />
        </Col>

        <Col xs={6} sm style={{ marginBottom: '16px' }}>
          <StatCard figure={240} description="Avg. last 12 months" delta={-20} deltaUnits="%" reverseColor />
        </Col>

        <Col xs={6} sm style={{ marginBottom: '16px' }}>
          <StatCard figure={1024} description="Annual avg." delta={-50} deltaUnits="%" reverseColor />
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Tabs
            handleSelect={context.navigate}
            selectedTab={`${context.location.pathname}${context.location.hash}`}
          >
            <TabLinkList>
              <TabLink to="/buildings">At risk</TabLink>
              <TabLink to="/buildings#all">All buildings</TabLink>
            </TabLinkList>

            <TabContent for="/buildings">
              <AtRiskBuildings />
            </TabContent>

            <TabContent for="/buildings#all">
              <AllBuildings />
            </TabContent>
          </Tabs>
        </Col>
      </Row>
    </Content>
  )
}

BuildingsContent.contextTypes = {
  navigate: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}
