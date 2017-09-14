import React from 'react'

import { Content } from 'zc-web/components'
import addSVG from 'zc-web/icons/Dark Grey/add.svg'
import printSVG from 'zc-web/icons/Dark Grey/print.svg'

import { Buildings as Demo } from '../demo'


export default function Buildings () {
  return (
    <Content
      title="Buildings"
      actionItems={[
        { title: 'Add building', icon: addSVG, action: () => {} },
        { title: 'Print report', icon: printSVG, action: () => {} },
      ]}
    >
      <Demo />
    </Content>
  )
}
