import React from 'react'

import { Card } from 'zc-web/views'
import { Content } from 'zc-web/components'

import PersonalDetails from '../PersonalDetails'


export default function Account() {
  return (
    <Content
      title="Account"
      actionItems={[
      ]}
    >
      <Card panel title="Personal details">
        <PersonalDetails />
      </Card>
    </Content>
  )
}
