import React from 'react'

import { Content, Spinner } from 'zc-web/components'

export default function ContentSpinner({ title }) {
  return (
    <Content title={title}>
      <Spinner />
    </Content>
  )
}
