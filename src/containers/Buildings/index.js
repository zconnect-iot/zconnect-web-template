import React from 'react'

import { Content } from 'zc-web/components'

import { Buildings as Demo } from '../demo'


export default function Buildings() {
  return (
    <Content
      title="Buildings"
      actionItems={[
        { title: 'Add building', icon: 'ADD', action: () => {} },
        { title: 'Print report', icon: 'PRINT', action: () => {} },
      ]}
    >
      <Demo />
    </Content>
  )
}
