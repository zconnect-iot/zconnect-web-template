import React from 'react'

import { Content } from 'zc-web/components'

import PersonalDetails from '../PersonalDetails'


export default function Account() {
  return (
    <Content
      title='Account'
      actionItems={[
      ]}
    >
      <PersonalDetails />
    </Content>
  )
}
