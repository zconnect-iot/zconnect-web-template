import React from 'react'
import PropTypes from 'prop-types'

import { Content } from 'zc-web/components'


export default function NotFound(props) {
  return (
    <Content
      title="Oops - Are you lost?"
      actionItems={[
        { title: 'Yes', icon: 'THUMB_UP', action: () => console.log('hello') },
        { title: 'No', icon: 'THUMB_DOWN', action: () => console.log('hello') },
      ]}
    >
      The requested page ({props.location.pathname}) is not available.
      This may be because you entered the URL incorrectly or you are not authorised to view it.
      You can try re-logging in to re-initialise you're access level
    </Content>
  )
}
