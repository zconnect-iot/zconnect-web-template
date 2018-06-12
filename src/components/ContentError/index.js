import React from 'react'

import { Content } from 'zc-web/components'

export default function ContentError({ title, children }) {
  return (
    <Content title={title}>
      {children}
    </Content>
  )
}
