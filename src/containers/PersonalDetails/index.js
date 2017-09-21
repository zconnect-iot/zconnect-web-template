import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'
import classNames from 'classnames'

import {
  TextField,
  EmailField,
  PasswordField,
  CheckboxField,
  SelectField,
  DateField,
} from 'zc-web/widgets/forms/index'

const personalDetails = props => (
  <form
    onSubmit={props.handleSubmit}
    className={classNames('personal-details')}
  >
    <TextField name="firstName" label="First name" />
    <EmailField
      name="email"
      label="Email address"
      placeholder="johnsmith@email.com"
    />
    <PasswordField name="password" label="Password" placeholder="******" />
    <CheckboxField name="keepUpdated" label="Keep me up-to-date" />
    <SelectField name="userType" label="User type">
      <option value="onsite">On-site</option>
      <option value="offsite">Off-site</option>
    </SelectField>
    <DateField name="date" label="Date" />
  </form>
)

personalDetails.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'personalDetails',
})(personalDetails)
