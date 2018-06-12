import React from 'react'

import { Card } from 'zc-web/views'
import { Content } from 'zc-web/components'

import AddDeviceForm from './AddDeviceForm'


export default function AddDevice() {
  return (
    <Content
      title="Add device"
      actionItems={[
        { title: 'Save', icon: 'DONE', route: '/' },
      ]}
    >
      <Card panel title="Add device">
        <AddDeviceForm />
      </Card>
    </Content>
  )
}
