import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

import { Content, Icon } from 'zc-web/components'
import { Tooltip, StatCard } from 'zc-web/widgets'


export default function BuildingsContent() {
  return (
    <Content
      title="Buildings"
      actionItems={[
        { title: 'Add building', icon: 'ADD', route: '/buildings/add' },
        { title: 'Print report', icon: 'PRINT', action: () => {} },
      ]}
    >
      <div>
        This is a tooltip -&gt;
        <Tooltip>
          This is the tooltip message, with an Icon..
          <Icon name="SHOPPING_CART" />
        </Tooltip>
      </div>
      <Row>
        <Col xs>
          <StatCard figure={162} description="Alarms this month" delta={10} reverseColor />
        </Col>

        <Col xs>
          <StatCard figure={401} description="Avg. last 6 months" delta={5} deltaUnits="%" reverseColor />
        </Col>

        <Col xs>
          <StatCard figure={240} description="Avg. last 12 months" delta={-20} deltaUnits="%" reverseColor />
        </Col>

        <Col xs>
          <StatCard figure={1024} description="Annual avg." delta={-50} deltaUnits="%" reverseColor />
        </Col>
      </Row>
    </Content>
  )
}