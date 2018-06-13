import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form/immutable'
import classnames from 'classnames'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'
import { Content, Spinner } from 'zc-web/components'
import { Card } from 'zc-web/components'

import { UserForm } from 'components'

import styles from 'routes/editUser/style.scss'


class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
    }
  }

  componentWillUnmount() {
    this.props.resetApi()
  }

  submitForm = () => {
    this.setState({ submitted: true })
    this.props.submitForm()
  }

  render() {
    const { api, lastSetId, dirty, valid, userErrorMessage } = this.props
    const submittable = dirty && valid
    const actions = [{
      title: 'Save',
      color: submittable ? 'success' : 'grey',
      action: this.submitForm,
      disabled: api.pending || !submittable,
      icon: api.pending ? 'REBOOT' : 'CHECK',
      className: api.pending ? 'spinIcon' : '',
    }]

    if (this.state.submitted && api.success) return <Redirect to={`/users/${lastSetId}`} />
    return (
      <Content title="Add User" className={styles.EditUser} actionItems={actions}>
        <Card
          className={classnames(styles.Details, styles.padBody)}
          panel
          title="Details"
        >
          <UserForm requirePassword />
          {api.error && <h4 className="text-danger">{userErrorMessage}</h4>}
          {api.pending && <Spinner />}
        </Card>
      </Content>
    )
  }
}

AddUser.propTypes = {
  api: zcApiShapeJS.isRequired,
  lastSetId: PropTypes.string.isRequired,
  resetApi: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  userErrorMessage: PropTypes.string.isRequired,
}

export default reduxForm({
  form: 'addUser',
  enableReinitialize: true,
})(AddUser)
