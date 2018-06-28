import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'
import { Row, Col } from 'react-flexbox-grid'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'
import { Content } from 'zc-web/components'

import { ContentSpinner } from 'components'

import Details from './Details'
import Notifications from './Notifications'
import styles from './style.scss'


class EditUser extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
    }
  }
  componentDidMount() {
    this.props.fetchUser()
  }

  componentWillReceiveProps(props) {
    if (props.dirty && (!this.props.dirty && this.state.submitted)) this.setState({ submitted: false })
  }

  componentWillUnmount() {
    this.props.resetApi()
  }

  onChange = () => {
    this.forceUpdate()
  }

  getNotificationsRef = ref => (this.notifications = ref)

  render() {
    const {
      api, userId, initialValues, dirty, valid,
    } = this.props
    const userLoaded = initialValues && initialValues.get('email')
    const notificationsChanged = this.notifications && this.notifications.props.isDirty
    const detailsChanged = dirty && valid
    const actions = [{
      title: 'Save',
      icon: 'CHECK',
      color: !notificationsChanged && !detailsChanged ? 'grey' : 'success',
      disabled: api.pending || (!notificationsChanged && !detailsChanged),
      action: () => {
        this.setState({ submitted: true })
        if (notificationsChanged) this.notifications.submitForm()
        if (detailsChanged) this.props.submitForm()
      },
    }]

    if (userLoaded) return (
      <Content title="Edit User" className={styles.EditUser} actionItems={actions}>
        <Row>
          <Col xs={12} sm={6}>
            <Details submitted={this.state.submitted} />
          </Col>
          <Col xs={12} sm={6}>
            <Notifications
              onChange={this.onChange}
              userId={userId}
              getRef={this.getNotificationsRef}
            />
          </Col>
        </Row>
      </Content>
    )
    if (api.error) return <h4 className="text-danger">Error loading user details</h4>
    return <ContentSpinner />
  }
}

EditUser.propTypes = {
  api: zcApiShapeJS.isRequired,
  fetchUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  resetApi: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    last_name: PropTypes.string,
    first_name: PropTypes.string,
  }).isRequired,
  submitForm: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'editUser',
  enableReinitialize: true,
})(EditUser)
