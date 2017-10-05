import React from 'react'

import { Card } from 'zc-web/views'
import { Content } from 'zc-web/components'

import AddBuildingForm from './AddBuildingForm'


export default function AddBuilding() {
  return (
    <Content
      title="Add building"
      actionItems={[
        { title: 'Save', icon: 'DONE', route: '/' },
      ]}
    >
      <Card panel title="Add building">
        <AddBuildingForm />
      </Card>
    </Content>
  )
}
