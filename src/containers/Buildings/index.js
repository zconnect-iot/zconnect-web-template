import React from 'react'

import { Content, Icon } from 'zc-web/components'
import { Tooltip } from 'zc-web/widgets'


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
      <p>
        This is a tooltip -&gt;
        <Tooltip>
          This is the tooltip message, with an Icon..
          <Icon name="SHOPPING_CART" />
        </Tooltip>
      </p>
      <Demo />
    </Content>
  )
}
