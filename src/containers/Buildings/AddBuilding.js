import React from 'react'

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
      <AddBuildingForm />
    </Content>
  )
}
