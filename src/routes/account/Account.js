import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import classnames from 'classnames'

import { Content, Link } from 'zc-web/components'
import { Card } from 'zc-web/views'
import { NotificationSettings } from 'zc-web/containers'

import Details from './Details'
import styles from './style.scss'


export default class Account extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  componentWillUnmount() {
    this.props.resetApi()
  }
  onChange = () => {
    this.forceUpdate()
  }
  getDetailsRef = ref => (this.details = ref)
  getNotificationsRef = ref => (this.notifications = ref)
  render() {
    const { categories, severities, types, organisationId, userId } = this.props
    const notificationsChanged = this.notifications && this.notifications.props.isDirty
    const detailsChanged = this.details && this.details.props.dirty && this.details.props.valid
    const actions = [{
      title: 'Save',
      icon: 'CHECK',
      color: !notificationsChanged && !detailsChanged ? 'grey' : 'success',
      disabled: !notificationsChanged && !detailsChanged,
      action: () => {
        if (notificationsChanged) this.notifications.submitForm()
        if (detailsChanged) this.details.submitForm()
      },
    }]
    return (
      <Content title="Account Settings" className={styles.Account} actionItems={actions}>
        <Row>
          <Col xs={12} sm={6} className={styles.Details}>
            <Details
              getRef={this.getDetailsRef}
              onChange={this.onChange}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Card className={classnames(styles.Notifications, styles.padBody)} panel title="Notifications">
              {organisationId ? <NotificationSettings
                onChange={this.onChange}
                getRef={this.getNotificationsRef}
                organisationId={organisationId}
                categories={categories}
                severities={severities}
                types={types}
                hideSave
              /> : <span>
                You need to be assigned to an organisation to change your notification settings.
                Admin users can do this <Link route={`/users/${userId}/edit`}>here</Link>.
                You will need to log out and back in again for the change to take effect.
              </span>}
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

Account.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  severities: PropTypes.arrayOf(PropTypes.array).isRequired,
  types: PropTypes.arrayOf(PropTypes.array).isRequired,
  fetchUser: PropTypes.func.isRequired,
  resetApi: PropTypes.func.isRequired,
  organisationId: PropTypes.string,
  userId: PropTypes.string.isRequired,
}

Account.defaultProps = {
  organisationId: '',
}
