import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { Spinner } from 'zc-web/components'
import { Card } from 'zc-web/views'
import { zcApiShapeJS } from 'zc-core/utils/propTypes'

import { UserForm } from 'components'

import styles from '../style.scss'

const DetailsForm = reduxForm({
  form: 'account',
  enableReinitialize: true,
})(UserForm)

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
    }
  }
  componentDidMount() {
    this.props.getRef(this)
  }
  componentWillReceiveProps(props) {
    // Trigger onChange callback when submittable state changes to update submit
    // button in parent
    const wasSubmittable = props.dirty && props.valid
    const isSubmittable = this.props.dirty && this.props.valid
    if (wasSubmittable !== isSubmittable) props.onChange()
    // Reset submitted state when form dirtied after successful submission
    if (this.state.submitted && props.dirty && this.props.dirty === false) this.setState({
      submitted: false,
    })
  }
  submitForm = () => {
    this.props.submitForm()
    this.setState({ submitted: true })
  }
  render() {
    const { initialValues, api, errorMessage } = this.props
    const { submitted } = this.state
    if (!submitted && api.error) return (<Card panel title="Details" className={styles.padBody}>
      <h4 className="text-danger">Failed to fetch your account details</h4>
    </Card>)
    if (initialValues.email) return (
      <Card panel title="Details">
        <DetailsForm initialValues={initialValues} />
        {api.pending && <Spinner />}
        {api.error && <h4 className="text-danger margin-top">{errorMessage}</h4>}
        {submitted && api.success && <h4 className="text-success margin-top">Account details updated</h4>}
      </Card>
    )
    return <Card panel title="Details" className={styles.padBody}><Spinner /></Card>
  }
}

Details.propTypes = {
  initialValues: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  dirty: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  api: zcApiShapeJS.isRequired,
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getRef: PropTypes.func,
  onChange: PropTypes.func,
}

Details.defaultProps = {
  getRef: noop,
  onChange: noop,
}
