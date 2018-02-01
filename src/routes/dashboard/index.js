import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import DocumentTitle from 'react-document-title'
import { withErrorBoundary } from 'zc-web/hocs'
import Raven from 'raven-js'

import { Content } from 'zc-web/components'

import IssuesList from 'containers/IssuesList'
import ErrorHandler from 'containers/ErrorHandler'
import underlineSVG from 'assets/underline.svg'

import styles from './style.scss'

function Dashboard() {
  return (
    <Content className={styles.Dashboard}>
      <DocumentTitle title="Overlock - Dashboard" />
      <h1 className={styles.title}>Dashboard</h1>
      <img className={styles.underline} src={underlineSVG} alt="underline" />
      <Row>
        <Col xs={12} lg={6} className={styles.issuesList}>
          <IssuesList throwOnApiError count={5} title="Recent issues" />
        </Col>
      </Row>
    </Content>
  )
}

export default withErrorBoundary({
  FallbackComponent: ErrorHandler,
  errorCallback: (error, info) => Raven.captureException(error, { extra: { info } }),
})(Dashboard)
