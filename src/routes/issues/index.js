import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import DocumentTitle from 'react-document-title'
import { withErrorBoundary } from 'zc-web/hocs'
import Raven from 'raven-js'

import { Content } from 'zc-web/components'

import IssuesList from 'containers/IssuesList'
import ErrorHandler from 'containers/ErrorHandler'


function Issues() {
  return (
    <Content>
      <DocumentTitle title="Overlock - Issues" />
      <Row>
        <Col xs>
          <IssuesList throwOnApiError title="All issues" />
        </Col>
      </Row>
    </Content>
  )
}

export default withErrorBoundary({
  FallbackComponent: ErrorHandler,
  errorCallback: (error, info) => Raven.captureException(error, { extra: { info } }),
})(Issues)
