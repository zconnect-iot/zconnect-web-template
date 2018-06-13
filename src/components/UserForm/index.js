import React from 'react'
import PropTypes from 'prop-types'

import { TextField, PasswordField, EmailField } from 'zc-web/components/forms'

import { isEmail, required, minLength, passwordsMatch, isPhoneNumber } from 'utils'

const requiredValidators = [required]

export default function UserForm({ requirePassword }) {
  return (
    <form>
      <TextField
        name="first_name"
        label="First Name"
        validate={requiredValidators}
        autocomplete={false}
      />
      <TextField
        name="last_name"
        label="Last Name"
        validate={requiredValidators}
        autocomplete={false}
      />
      <EmailField
        name="email"
        label="Email"
        validate={[...requiredValidators, isEmail]}
        autocomplete={false}
      />
      <TextField
        name="phone_number"
        label="Phone number"
        validate={[isPhoneNumber]}
        autocomplete={false}
      />
      <PasswordField
        name="password"
        label="Password"
        autocomplete={false}
        validate={requirePassword ? [required, minLength] : [minLength]}
      />
      <PasswordField
        name="password2"
        label="Confirm password"
        autocomplete={false}
        validate={requirePassword ? [required, passwordsMatch] : [passwordsMatch]}
      />
    </form>
  )
}

UserForm.propTypes = {
  requirePassword: PropTypes.bool,
}

UserForm.defaultProps = {
  requirePassword: false,
}
